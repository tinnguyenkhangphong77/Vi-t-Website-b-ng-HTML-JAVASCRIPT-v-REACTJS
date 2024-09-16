import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/navbar.scss";
import NavBarListIcon from "./navBarListIcon";
import data from "../data/navBar.json";

const NavBar = () => {
  const [listIcon, setListIcon] = useState(data);
  const navigate = useNavigate();

  // Xử lý sự kiện click
  const handleClick = (e) => {
    // console.log(e.target.closest(".list-icon-item").textContent);
    setListIcon((prevListIcon) => {
      // Tạo một mảng mới để lưu trữ các thẻ với trạng thái đã được cập nhật
      const newListIcon = prevListIcon.map((item) => ({
        ...item,
        // Đặt trạng thái true cho thẻ được click, và false cho các thẻ khác
        active: item.type === e.target.closest(".list-icon-item").textContent,
      }));
      return newListIcon;
    });
  };

  return (
    <nav className="NavBar-container">
      <div className="flex navbar-header">
        <h1
          className="h1"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking Website
        </h1>
        <div className="flex navbar-btn flex-items">
          <button className="btn">Resigter</button>
          <button className="btn">Login</button>
        </div>
      </div>

      <div className="flex list-icon">
        {/ Render List Icon /}
        {listIcon.map((item) => {
          return (
            <NavBarListIcon
              key={item.type}
              isActive={item.active}
              iconName={item.icon}
              iconType={item.type}
              isClick={handleClick}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
