import "../../static/searchPopup.scss";

const SearchPopup = () => {
  const data = [
    "Min price per night",
    "Max price per night",
    "Adult",
    "Children",
    "Room",
  ];
  return (
    <>
      <form
        className="flex SearchPopup"
        onSubmit={(e) => {
          e.preventDefault(); //Ngăn việc reload lại trang
        }}
      >
        <h2 className="SearchPopup-title">Search</h2>
        <p>Destination</p>

        <input type="text" className="SearchPopup-input" />
        <p>Check-in Date</p>
        <input type="text" className="SearchPopup-input" />
        <p>Options</p>

        <div className="sf">
          {data.map((item) => {
            return (
              <div key={item} className="flex sf-item">
                <span>{item}</span>
                <input type="text" />
              </div>
            );
          })}
        </div>

        <button className="SearchPopup-btn">Search</button>
      </form>
    </>
  );
};

export default SearchPopup;
