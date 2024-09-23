import { Input, Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";

import { Link, useLocation } from "react-router-dom";

const styles = {
  header: {
    width: "100%",
    display: "flex",
    height: "90px",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#E75414",
    borderRadius: "0 0 5px 5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  bar: { maxWidth: "600px" },
  menu: {
    background: "transparent",
    color: "white",
  },
  title: { alignSelf: "center", color: "white", margin: 0 },
};

const WrappedHeader = ({ input, setInput }) => {
  const { Title } = Typography;
  const resetQuery = () => setInput("");
  const location = useLocation();
  const path = location.pathname.slice(1, location.pathname.length);
  const isFavButtonActive = path === "favorites";

  const items = [
    {
      key: "1",
      label: (
        <Link
          to="favorites"
          style={{ fontSize: "16px", color: "white" }}
          onClick={resetQuery}
        >
          Favorites
        </Link>
      ),
    },
  ];
  return (
    <Header style={styles.header}>
      <Link to="/" onClick={resetQuery}>
        <Title style={styles.title} level={2}>
          Meals & Cocktails
        </Title>
      </Link>

      <Input.Search
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        height={100}
        style={styles.bar}
        size="large"
        placeholder="Type..."
      ></Input.Search>
      <Menu
        selectedKeys={isFavButtonActive ? ["1"] : null}
        style={styles.menu}
        items={items}
      ></Menu>
    </Header>
  );
};

export default WrappedHeader;
