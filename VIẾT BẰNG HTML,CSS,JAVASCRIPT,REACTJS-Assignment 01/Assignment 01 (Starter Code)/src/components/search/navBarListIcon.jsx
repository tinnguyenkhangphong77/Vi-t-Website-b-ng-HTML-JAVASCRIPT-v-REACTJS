import "../static/navBarListIcon.scss";

const NavBarListIcon = (props) => {
  return (
    <span
      className={
        props.isActive ? "list-icon-item flex active" : "list-icon-item flex"
      }
      onClick={props.isClick}
    >
      <i className={"fa " + props.iconName}></i>
      <span className="navbar-item-type">{props.iconType}</span>
    </span>
  );
};

export default NavBarListIcon;
