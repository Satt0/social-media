import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginPage from "./Page/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { useLogin } from "src/lib/hooks/useLogin";
import store from "src/ReduxStore/store";
import url from "./lib/API/URL";
import "src/stylesheets/css/global.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  
} from "@apollo/client";
import { splitLink } from "./lib/API/Apollo/Link";
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

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
        <ApolloProvider client={client}>
        <Loader />
    
  </ApolloProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
