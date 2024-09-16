import "../../static/searchListItem.scss";

const SearchListItem = (props) => {
return (
<div className="searchList-card grid">
<img src={require(../../images/${props.image})} alt={props.name} />
<div className="searchList-info flex-column">
<h2>{props.name}</h2>
<p>{props.distance} from center</p>
<p className="tag">{props.tag}</p>
<p>
<strong>{props.description}</strong>
</p>
<p>{props.type}</p>
<p style={{ color: "green" }}>
<strong>{props.free_cancel ? "Free cancellartion" : ""}</strong>
</p>
<p className="free-cancel">
{props.free_cancel
? "You can cancel later, so lock in this great price today!"
: ""}
</p>
</div>

<div className="price-card flex-column">
<p className="rate flex">
{props.rate_text} <span>{props.rate}</span>
</p>
<div className="price flex-column">
<p style={{ fontSize: "23px", fontWeight: "600" }}>${props.price}</p>
<p style={{ color: "#777" }}>Includes taxes and fees</p>
<button>See Availability</button>
</div>
</div>
</div>
);
};

export default SearchListItem;