import "../../static/detailList.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailList = (props) => {
return (
<>
{/ Phần tổng thể của danh sách chi tiết /}
<div className="detail-list">
{/ Phần thông tin /}
<div className="flex-column info">
<h3 className="flex">
{props.data.name} <button>Reserve or Book now</button>
</h3>
<p className="address flex">
<FontAwesomeIcon icon={faLocationDot} />
{props.data.address}
</p>
<p className="distance">{props.data.distance}</p>
<p className="price">{props.data.price}</p>
</div>

{/ Phần hình ảnh /}
<div className="img-list grid">
{/ Duyệt qua danh sách hình ảnh và hiển thị /}
{props.data.photos.map((item) => {
return (
<img
key={item}
src={require(../../images/${item})}
alt={item}
/>
);
})}
</div>

{/ Phần thông tin về 9 night/}
<div className="nine-night flex">
<span className="nn-it1">
<h3>{props.data.title}</h3>
<p className="description">{props.data.description}</p>
</span>

<span className="nn-it2 flex-column">
<p style={{ fontSize: "17px" }}>
<strong>Perfect for a 9-night stay!</strong>
</p>
<p style={{ fontSize: "13px" }}>
Located in the real heart of KraKow, this property has an
excellent location score of 9.8
</p>
<p style={{ fontSize: "20px" }}>
<strong>${props.data.nine_night_price}</strong> (9 nights)
</p>
<button>Reserve or Book now</button>
</span>
</div>
</div>
</>
);
};

export default DetailList;