"use strict";
// Lấy thông tin người dùng hiện tại
const KEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(KEY)) || [];

// get username
const user = JSON.parse(getFromStorage("USER_ARRAY")) || [];
const [userCur] = user.filter((user) => user.username === currentUser);

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");

// Hàm hiển thị cài đặt trước đó
function showPreSettings() {
  const userSettings = JSON.parse(getFromStorage("settings_" + currentUser));
  if (userSettings) {
    inputPageSize.value = userSettings.pageSize;
    inputCategory.value = userSettings.category;
  }
}

// Sự kiện khi click nút "Save Settings"
document.getElementById("btn-submit").addEventListener("click", function (e) {
  e.preventDefault();
  const pageSize = parseInt(inputPageSize.value);
  const category = inputCategory.value;

  const user = new User(
    userCur.firstName,
    userCur.lastName,
    userCur.username,
    userCur.password
  );
  user.udapteSettings(pageSize, category);
  //   console.log(user, pageSize, category);
  alert("Cài đặt được lưu thành công!");

  // Chuyển trang đến màn hình news.
  window.location.href = "../pages/news.html";
});

// Hiển thị cài đặt trước đó khi vào trang
showPreSettings();
