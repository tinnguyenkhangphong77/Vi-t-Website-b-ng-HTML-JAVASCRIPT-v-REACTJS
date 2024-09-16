"use strict";
// Khi mới truy cập vào màn hình, lấy dữ liệu mảng userArr từ localStorage.
const KEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(KEY)) || [];
// get firstName
const user = JSON.parse(getFromStorage("USER_ARRAY")) || [];
console.log("currentUser", currentUser);
const [getFirstName] = user.filter((user) => user.username == currentUser);

console.log("getFirstName", getFirstName);
if (currentUser.length > 0) {
  document.getElementById("login-modal").classList.add("d-none");
  // document.getElementById("main-content").classList.add("d-block");
  document.getElementById(
    "welcome-message"
  ).textContent = `Welcome ${getFirstName.firstName}`;
} else {
  // document.getElementById("login-modal").classList.add("d-block");
  document.getElementById("main-content").classList.add("d-none");
}
// Logout
document.getElementById("btn-logout").addEventListener("click", () => {
  // Xóa current user ra khỏi localStorage
  localStorage.removeItem("currentUser");
  // Chuyển trang đến màn hình login.
  window.location.href = "../pages/login.html";
});
