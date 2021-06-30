import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginPage from "./Page/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { useLogin } from "src/lib/hooks/useLogin";
import store from "src/ReduxStore/store";
import { useDispatch } from "react-redux";
import TYPE from 'src/ReduxStore/bin/CONSTANT'
import API from 'src/lib/API/UserAPI'
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
function DispatchLogin(res) {

  return (dispatch)=>{
    const { uid, userFullName, userDisplayName, picture } = res.user;
  const payload = {
    loggedIn: true,
    uid: uid,
    displayName: userDisplayName,
    profileImage: picture,
    fullName: userFullName,
  };
    dispatch({ type: TYPE.logInUser, payload: payload });
  }

}
const Loader = () => {
  const dispatch = useDispatch()
  const [load,setLoad]=React.useState(false)
  React.useEffect(()=>{
    API.resumeUserSession().then(res=>{
      if(res?.user){
        dispatch(DispatchLogin(res))
      }


      setLoad(true)
    })
  })
  const isLoggedIn = useLogin();
 if(load){
  if (isLoggedIn !== null) {
    if (isLoggedIn === true) {
      return <App />;
    }
    return (
        <LoginPage />
      
    );
  }
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
