"use strict";

class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.settings = {
      pageSize: 5,
      category: "General",
    };
  }

  // Cập nhật cài đặt

  udapteSettings(pageSize, category) {
    this.settings.pageSize = pageSize;
    this.settings.category = category;
    saveToStorage("settings_" + this.username, this.settings);
  }

  // Lấy cài đặt
  getSettings() {
    return this.settings;
  }

  async getNews(page) {
    const apiKey = "11bc412c26dc483599f3557a5beb735a";

    // Lấy cài đặt từ localStorage
    const userSettings = JSON.parse(
      getFromStorage("settings_" + this.username)
    );

    // Nếu không có cài đặt trong localStorage, sử dụng cài đặt mặc định
    const { pageSize, category } = userSettings || this.settings;
    console.log(this.username);
    // console.log(this.getSettings());
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data) return data;
      else {
        console.error("Không thể lấy dữ liệu tin tức từ API.");
        return [];
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy dữ liệu tin tức từ API:", error);
    }
  }
}

//  Xử lý chuyển từ JS Object sang Class Instance
// function parseUser(userData) {
//   const user = new User(
//     userData.firstName,
//     userData.lastName,
//     userData.username,
//     userData.password
//   )
//   return user
// }
