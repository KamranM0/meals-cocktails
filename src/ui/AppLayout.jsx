import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import WrappedHeader from "./WrappedHeader";
import SearchResult from "../pages/SearchResult";
import { useDebouncing } from "../hooks/useDebouncing";

function AppLayout() {
  const { Content } = Layout;
  const { input, setInput, query, isSearching } = useDebouncing();

  return (
    <Layout
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      <WrappedHeader
        query={query}
        input={input}
        setInput={setInput}
        isSearching={isSearching}
      />
      <Content
        style={{
          padding: "20px 40px 20px 40px",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {isSearching ? <SearchResult query={query} /> : <Outlet />}
      </Content>
    </Layout>
  );
}

export default AppLayout;
