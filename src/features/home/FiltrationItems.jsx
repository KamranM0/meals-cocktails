import { Menu } from "antd";

const FiltrationItems = ({
  selectedFiltrationItemsKey,
  refinedFiltrationItemsArray,
  setChosenFiltrationOptions,
  chosenFiltrationOptions,
  setCurrentPage,
  setSelectedFiltrationItemsKey,
  categoryItemLabel,
}) => {
  const handleClick = (item) => {
    setCurrentPage(1);
    setChosenFiltrationOptions({
      ...chosenFiltrationOptions,
      Category: categoryItemLabel,
    });
    if (selectedFiltrationItemsKey === item.key) {
      return setSelectedFiltrationItemsKey(null);
    }
    setSelectedFiltrationItemsKey(item.key);
  };
  return (
    <Menu
      selectedKeys={selectedFiltrationItemsKey}
      onClick={(item) => handleClick(item)}
      items={refinedFiltrationItemsArray}
      style={{
        background: "transparent",
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
      mode="horizontal"
    ></Menu>
  );
};

export default FiltrationItems;
