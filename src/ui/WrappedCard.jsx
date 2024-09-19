import { Button, Card } from "antd";
import { Link } from "react-router-dom";

function WrappedCard({ cover, children, style, idFood, type }) {
  return (
    <Card
      hoverable
      style={{
        border: "1px solid #10080052",
        ...style,
      }}
      styles={{ body: { padding: 10, minHeight: 70, position: "relative" } }}
      cover={
        <>
          <img src={cover}></img>
          {/* <Button
            hoverable
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: 80,
              borderRadius: 15,
              margin: 10,
              border: "none",
              height: 50,
              color: "white",
              display: "inline",
            }}
          >
            +
          </Button> */}
        </>
      }
    >
      {children}
      <Link to={`/${type}/${idFood}`}>
        <Button>Check details</Button>
      </Link>
    </Card>
  );
}

export default WrappedCard;
