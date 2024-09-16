import React from "react";
import cityData from "../data/city.json";
import "../static/city.scss";

const City = () => {
return (
<>
<div className="flex city-card">
{cityData.map((item) => {
return (
<span key={item.name} className="city-item">
<div className="city-title">
<p>{item.name}</p>
<p>{item.subText}</p>
</div>
<div className="city-img">
<img src={require(../images/${item.image})} alt={item.name} />
</div>
</span>
);
})}
</div>
</>
);
};

export default City;