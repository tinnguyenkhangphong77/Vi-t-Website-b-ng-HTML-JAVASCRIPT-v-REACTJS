"use strict";
// Khi mới truy cập vào màn hình, lấy dữ liệu mảng userArr từ localStorage.
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);
// 1. Xử lý sự kiện click vào nút Register
document.getElementById("btn-submit").addEventListener("click", (e) => {
  e.preventDefault();
  // Gọi hàm xử lý khi click vào nút Register
  handleRegister();
});
// 2. Xử lý đăng ký người dùng
function handleRegister() {
  // Lấy dữ liệu nhập vào từ form.
  const firstName = document.getElementById("input-firstname").value;
  const lastName = document.getElementById("input-lastname").value;
  const username = document.getElementById("input-username").value;
  const password = document.getElementById("input-password").value;
  const confirmPassword = document.getElementById(
    "input-password-confirm"
  ).value;
  // Kiểm tra tính hợp lệ của dữ liệu nhập vào
  if (validate(firstName, lastName, username, password, confirmPassword)) {
    // Nếu dữ liệu hợp lệ, bạn sẽ tạo một đối tượng User mới và thêm vào mảng userArr.}
    const newUser = new User(firstName, lastName, username, password);

    userArr.push(newUser);
    // Lưu mảng userArr vào LocalStorage.
    saveToStorage("USER_ARRAY", userArr);
    // Chuyển trang đến màn hình login.
    window.location.href = "../pages/login.html";
  }
}
// 3. Viết hàm validate
function validate(firstName, lastName, username, password, confirmPassword) {
  // Kiểm tra không có trường nào bị bỏ trống
  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    alert("Vui lòng điền đầy đủ thông tin");
    return false;
  }
  // Username không được trùng với Username của các người dùng trước đó.
  if (userArr.some((usn) => usn.username === username)) {
    alert("Username đã tồn tại, vui lòng chọn username khác");
    return false;
  }
  // Kiểm tra password và confirm password phải giống nhau
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp, vui lòng nhập lại");
    return false;
  }
  // Kiểm tra password phải có ít nhất 8 ký tự
  if (password.length < 8) {
    alert("Mật khẩu phải có ít nhất 8 ký tự");
    return false;
  }
  return true;
}
