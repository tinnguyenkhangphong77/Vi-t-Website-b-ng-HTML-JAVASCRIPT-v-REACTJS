"use strict";

// Lấy username hiện tại
const KEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(KEY)) || [];

// Lấy thông tin người dùng hiện tại
const userArray = JSON.parse(getFromStorage("USER_ARRAY")) || [];
const [currentUserData] = userArray.filter(
  (user) => user.username === currentUser
);

// Khởi tạo đối tượng User với thông tin người dùng hiện tại
const user = new User(...Object.values(currentUserData));
console.log(user);

// Lấy pagesize để tính tổng trang
const userSettings = JSON.parse(getFromStorage("settings_" + currentUser));
// Kiểm tra nếu userSettings không tồn tại hoặc pageSize không được thiết lập
const pageSize = userSettings ? userSettings.pageSize : 5; // Đặt giá trị mặc định cho pageSize là 10

// Thêm biến page chỉ số trang hiện tại
let page = 1;

// Nút ẩn / hiện
const prevButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");
const pageInfo = document.getElementById("page-num"); // Thêm để hiển thị thông tin trang

// Hàm để load dữ liệu cho trang hiện tại
async function loadPage(page) {
  try {
    if (!user) return;
    const data = await user.getNews(page); // Truyền page mới vào API getNews
    console.log(data);
    if (data && data.articles) {
      // Loại bỏ các bài viết có title là "[Removed]"
      console.log(data.articles);
      const articles = data.articles.filter(
        (artc) => artc.title !== "[Removed]"
      );

      // Xóa nội dung cũ của newsContainer trước khi hiển thị mới
      clearNewsContainer();

      // Lặp qua từng tin tức để render qua giao diện
      articles.forEach((article) => displayNews(article));

      // Hiển thị thông tin trang
      pageInfo.textContent = page;

      // Xử lý ẩn/hiện nút "Previous" và "Next"
      togglePrevNext(data.totalResults);
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải trang:", error);
  }
}

// Hàm để hiển thị dữ liệu bài viết
function displayNews({ title, description, url, urlToImage }) {
  const newsContainer = document.getElementById("news-container");
  const newEl = document.createElement("div");
  newEl.classList.add("card", "flex-row", "flex-wrap");

  newEl.innerHTML = `<div class="card mb-3" style="">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img src="${urlToImage}"
                            class="card-img"
                            alt="${title}">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <a href="${url}"
                              class="btn btn-primary">View</a>
                          </div>
                        </div>
                      </div>
                    </div>`;

  newsContainer.appendChild(newEl);
}

// Hàm để xóa nội dung cũ của newsContainer
function clearNewsContainer() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
}

// Hàm để ẩn/hiện nút "Previous" và "Next"
function togglePrevNext(totalResults) {
  if (page === 1) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
  }

  // Tính toán tổng số trang dựa trên số lượng kết quả và pageSize
  const totalPages = Math.ceil(totalResults / pageSize);
  if (page === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "inline";
  }
}

// Sự kiện click cho nút "Previous"
prevButton.addEventListener("click", function () {
  if (page > 1) {
    page--;
    loadPage(page);
  }
});

// Sự kiện click cho nút "Next"
nextButton.addEventListener("click", function () {
  page++;
  loadPage(page);
});

// // Load dữ liệu cho trang đầu tiên khi trang được tải lần đầu
loadPage(page);
