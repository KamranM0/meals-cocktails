import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";

function FiltrationChoiceField({
  items,
  selectedFiltrationChoiceKey,
  setSelectedFiltrationChoiceKey,
}) {
  return (
    <Dropdown
      style={{ width: "500px" }}
      menu={{
        items: items,
        selectable: true,
        selectedKeys: selectedFiltrationChoiceKey,
        style: { width: "400px" },
        onSelect: (item) => {
          setSelectedFiltrationChoiceKey(item.key);
        },
      }}
      trigger={"click"}
    >
      <Typography.Link>
        <Space>
          Filter by <DownOutlined />
          {/* TODO */}
          <span style={{ color: "gray" }}>{selectedFiltrationChoiceKey}</span>
        </Space>
      </Typography.Link>
    </Dropdown>
  );
}

export default FiltrationChoiceField;
