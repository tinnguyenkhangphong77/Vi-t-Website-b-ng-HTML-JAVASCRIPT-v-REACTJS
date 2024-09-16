"use strict";

// Khi mới truy cập vào màn hình, lấy dữ liệu mảng userArr từ localStorage.
const KEY = "USER_ARRAY";
const currentUser = JSON.parse(getFromStorage(KEY)) || [];

// 1. Xử lý sự kiện click vào nút Login
document.getElementById("btn-submit").addEventListener("click", (e) => {
  e.preventDefault();

  // Gọi hàm xử lý khi click vào nút Login
  handleLogin();
});

// 2. Xử lý đăng nhập người dùng
function handleLogin() {
  const username = document.getElementById("input-username").value;
  const password = document.getElementById("input-password").value;
  // Validate
  if (validate(username, password)) {
    // Lưu thông tin người dùng xuống localStorage
    saveToStorage("currentUser", username);

    // Chuyển trang đến màn hình Home
    window.location.href = "../index.html";
  }
}

// 3. Viết hàm validate
function validate(username, password) {
  if (!username || !password) {
    alert("Vui lòng điền đầy đủ thông tin");
    return false;
  }

  let isValidUser = false;
  currentUser.forEach((user) => {
    if (user.username === username && user.password === password) {
      isValidUser = true;
    }
  });

  if (!isValidUser) {
    alert("Tên người dùng hoặc mật khẩu không đúng");
    return false;
  }

  return true;
}
