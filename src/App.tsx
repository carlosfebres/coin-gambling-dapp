import React from "react";
import "./App.css";
import 'fontsource-roboto';
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
