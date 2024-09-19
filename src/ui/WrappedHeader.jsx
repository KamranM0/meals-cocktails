import { Input, Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import Paragraph from "antd/es/skeleton/Paragraph";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebouncing } from "../hooks/useDebouncing";
import { useEffect } from "react";

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

function WrappedHeader({ input, setInput, query }) {
  const { Title } = Typography;
  const resetQuery = () => setInput("");
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
      <Menu style={styles.menu}>
        <Menu.Item>
          <p>Salam</p>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default WrappedHeader;
