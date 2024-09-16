import "../../static/searchForm.scss";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchForm = (props) => {
const navigate = useNavigate();

// Kiểm tra null hoặc undefined của startDate và endDate trước khi truy cập thuộc tính
const startDate = props.date?.startDate;
const endDate = props.date?.endDate;

const handleButtonClick = () => {
navigate("/search");
window.scrollTo(0, 0);
};

// Xử lý dữ liệu ngày tháng đúng cách và kiểm tra null hoặc undefined
const startDateString = startDate
? `${startDate.getDate()}/${
startDate.getMonth() + 1
}/${startDate.getFullYear()}`
: "";

const endDateString = endDate
? ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}
: "";

return (
<>
<form className="header-form flex">
<span>
<i className="fa fa-bed"></i>
<input
type="text"
placeholder="Where are you going?"
className="form-input"
/>
</span>

<span className="date flex" onClick={props.handleDateClick}>
<i className="fa fa-calendar"></i>
<p className="date-picker">
{startDateString}&ensp;to&ensp;{endDateString}
</p>
</span>

<span>
<i className="fa fa-female"></i>
<input
type="text"
placeholder="1 adult - 0 children"
className="form-input"
/>
</span>

<button className="form-btn" onClick={handleButtonClick}>
Search
</button>
</form>
</>
);
};

export default SearchForm;