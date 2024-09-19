import { Image, Menu } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

function FiltrationItems({
  selectedFiltrationItemsKey,
  refinedFiltrationItemsArray,
  setCurrentPage,
  setSelectedFiltrationItemsKey,
}) {
  return (
    <Menu
      selectedKeys={selectedFiltrationItemsKey}
      onSelect={(item) => {
        setCurrentPage(1);
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
    // <ul
    //   style={{
    //     display: "flex",
    //     gap: "30px",
    //     justifyContent: "start",
    //     overflowX: "scroll",
    //     width: "100%",
    //     listStyle: "none",
    //     padding: 0,
    //     height: "auto",
    //     alignItems: "stretch",
    //   }}
    // >
    //   {refinedFiltrationItemsArray.map((el) => (
    //     <li
    //       onMouseEnter={handleMouseEnter}
    //       onMouseLeave={handleMouseLeave}
    //       style={
    //         isHovered
    //           ? {
    //               background: "red",
    //               padding: "10px",
    //               borderRadius: "20px",
    //               ...hoverStyle,
    //             }
    //           : {
    //               background: "red",
    //               padding: "10px",
    //               borderRadius: "20px",
    //             }
    //       }
    //     >
    //       {el.label}
    //     </li>
    //   ))}
    // </ul>
  );
}

export default FiltrationItems;
