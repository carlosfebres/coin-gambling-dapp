import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HomePage } from "./pages/HomePage/HomePage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
