import SearchListItem from "./searchListItem";

const SearchList = (props) => {
  return (
    <>
      {props.data.map((item) => {
        return (
          <SearchListItem
            key={item.name}
            name={item.name}
            distance={item.distance}
            tag={item.tag}
            type={item.type}
            description={item.description}
            free_cancel={item.free_cancel}
            price={item.price}
            rate={item.rate}
            rate_text={item.rate_text}
            image={item.image_url}
          />
        );
      })}
    </>
  );
};

export default SearchList;
