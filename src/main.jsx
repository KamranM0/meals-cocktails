import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
const myTheme = {
  token: {
    colorPrimary: "#f77f00",
    colorBgBase: "white",
    colorTextBase: "#1F1000",
    colorTextSecondary: "#fff",
    colorBorder: "#DF3E1E",
    colorBgHeader: "#f77f00",
  },
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider theme={myTheme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ConfigProvider>
    </PersistGate>
  </Provider>
);
