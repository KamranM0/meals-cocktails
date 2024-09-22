import { Menu } from "antd";

function FiltrationItems({
  selectedFiltrationItemsKey,
  refinedFiltrationItemsArray,
  setChosenFiltrationOptions,
  chosenFiltrationOptions,
  setCurrentPage,
  setSelectedFiltrationItemsKey,
  categoryItemLabel,
}) {
  return (
    <Menu
      selectedKeys={selectedFiltrationItemsKey}
      onClick={(item) => {
        setCurrentPage(1);
        setChosenFiltrationOptions({
          ...chosenFiltrationOptions,
          Category: categoryItemLabel,
        });
        if (selectedFiltrationItemsKey === item.key) {
          return setSelectedFiltrationItemsKey(null);
        }
        setSelectedFiltrationItemsKey(item.key);
      }}
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
}

export default FiltrationItems;
