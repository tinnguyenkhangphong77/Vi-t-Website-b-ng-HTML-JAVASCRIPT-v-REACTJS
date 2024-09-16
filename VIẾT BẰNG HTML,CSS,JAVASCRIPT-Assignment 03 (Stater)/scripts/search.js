"use strict";

// Lấy username hiện tại
const KEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(KEY)) || [];

// Lấy pagesize để chỉ số lượng hiển thị bài viết tại 1 trang
const userSettings = JSON.parse(getFromStorage("settings_" + currentUser));
const pageSize = userSettings.pageSize;
// const pageSize = 10

// Thêm biến page chỉ số trang hiện tại
let page = 1;

console.log(pageSize);

// Nút ẩn / hiện
const prevButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");
const pageInfo = document.getElementById("page-num"); // Thêm để hiển thị thông tin trang

// Sự kiện click tìm kiếm
document.getElementById("btn-submit").addEventListener("click", function (e) {
  e.preventDefault();
  const query = document.getElementById("input-query").value.trim();
  if (!query) {
    alert("Vui lòng điền từ khóa");
    return;
  }

  searchNews(query);
});

// Hàm tìm kiếm bài viết với từ khóa
function searchNews(q) {
  page = 1; // Đặt lại trang về 1 khi tìm kiếm mới
  loadPage(page, q);
}

const loadPage = async function (page, keyword) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=11bc412c26dc483599f3557a5beb735a`
    );

    if (res.status === 429) {
      alert("Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau một lúc.");
      return;
    }

    const data = await res.json();

    console.log(data);
    if (data && data.articles) {
      // Xóa nội dung cũ của newsContainer trước khi hiển thị mới
      clearNewsContainer();

      // Lặp qua từng tin tức để render qua giao diện
      data.articles.forEach((data) => displayNews(data));

      // Hiển thị thông tin trang hiện tại
      pageInfo.textContent = page;

      // Xử lý ẩn/hiện nút "Previous" và "Next"
      togglePrevNext(data.totalResults);

      document.getElementById("nav-page-num").style.display = "block";
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu tin tức từ API:", error);
  }
};

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
const togglePrevNext = function (totalResults) {
  if (page === 1) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
  }

  // Tính toán tổng số trang dựa trên số lượng kết quả và pageSize
  const totalPages = Math.ceil(totalResults / pageSize);
  console.log("page", page);
  console.log("totalPages", totalPages);
  if (page === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "inline";
  }
};

// Hàm hiển thị thông báo lỗi
function displayErrorMessage(message) {
  const newsContainer = document.getElementById("news-container");
  clearNewsContainer();
  const newElErr = document.createElement("div");
  newElErr.classList.add(
    "d-flex",
    "align-item-center",
    "justify-content-center",
    "h2"
  );
  newElErr.textContent = message;
  document.getElementById("nav-page-num").style.display = "none";
  newsContainer.appendChild(newElErr);
}

// Sự kiện click chuột
prevButton.addEventListener("click", function () {
  if (page > 1) {
    const keyword = document.getElementById("input-query").value;
    page--;
    loadPage(page, keyword);
  }
});

nextButton.addEventListener("click", function () {
  const keyword = document.getElementById("input-query").value;
  page++;
  loadPage(page, keyword);
});
