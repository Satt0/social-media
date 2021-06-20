import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginPage from "./Page/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { useLogin } from "src/lib/hooks/useLogin";
import store from "src/ReduxStore/store";
import "src/stylesheets/css/global.css";
import PostEdit from "./Components/PostEdit";

const Loader = () => {
  const isLoggedIn = useLogin();
  if (isLoggedIn !== null) {
    if (isLoggedIn === true) {
      return <App />;
    }
    return (
        <LoginPage />
      
    );
  }
  return <></>;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Loader />
        {/* <PostEdit/> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
