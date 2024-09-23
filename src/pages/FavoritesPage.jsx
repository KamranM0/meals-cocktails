import { HeartFilled } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavs } from "../features/favorites/favoritesSlice";

const FavoritesPage = () => {
  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  const dispatch = useDispatch();
  const handleRemove = (el) => dispatch(removeFromFavs(el.idFood));
  return (
    <Row
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {favoritesList.map((el) => (
        <Row
          key={el.idFood}
          style={{
            height: "140px",
            borderRadius: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <Col>
            <Image
              height={140}
              width={140}
              style={{ borderRadius: "10px" }}
              src={el.strFoodThumb}
            />
          </Col>
          <Col style={{ flexGrow: "1" }}>
            <Title level={1} style={{ margin: "10px", fontSize: "30px" }}>
              {el.strFood}
            </Title>
            <Link
              style={{
                position: "absolute",
                bottom: "0",
                margin: "10px",
                width: "200px",
              }}
              to={`/${el.type}/${el.idFood}`}
            >
              <Button
                style={{
                  width: "150px",
                  height: "30px",
                  background: "var(--colorPrimary)",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "17px",
                }}
              >
                Check details
              </Button>
            </Link>
            <div
              onClick={() => handleRemove(el)}
              size={"10px"}
              width={"20px"}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "0px",
                marginRight: "20px",
                top: "50px",
                color: "var(--colorPrimary)",
                fontSize: "40px",
              }}
            >
              <HeartFilled />
            </div>
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default FavoritesPage;
