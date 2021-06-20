import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import FacebookLogin from "react-facebook-login";
import API from "src/lib/API/UserAPI";
import { useDispatch } from "react-redux";
import TYPE from "src/ReduxStore/bin/CONSTANT";
function getDateNowISO() {
  return new Date().toISOString().substring(0, 10);
}

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
export default function LoginPage() {
  const [hasAccount, openLoginPage] = useState(true);
  const [user, setUser] = useState(() => {
    return {
      username: "",
      password: "",
      userDisplayName: "",
      userFullName: "",
      dateOfBirth: "",
      dateCreatedAccount: getDateNowISO(),
      email: "",
      phone: "",
      gender: "",
    };
  });

  // redux
  const dispatch = useDispatch();

  const handleUserInput = (key) => {
    return (e) => {
      let value = e.target.value;
      if (key === "username" || key === "password") {
        if (value[value.length - 1] === " ") {
          alert("không được có khoảng cách");
        }
        value = value.trim();
      }
      setUser((state) => ({ ...state, [key]: value }));
    };
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = user;
    API.loginExistingUser({ username, password }).then((res) => {
      if (!res.err) {
        dispatch(DispatchLogin(res))
      }
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    API.registerNewUser(user).then((res) => {
      if (!res.err) {
        dispatch(DispatchLogin(res))
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.Form}>
        {hasAccount ? (
          <LoginForm
            handleLogin={handleLogin}
            user={user}
            handleChange={handleUserInput}
          />
        ) : (
          <RegisterForm
            handleRegister={handleRegister}
            user={user}
            handleChange={handleUserInput}
          />
        )}
        <p>{hasAccount ? "Don't have account?" : "Account already exists?"}</p>
        <div className={styles.Suggest}>
          <button
            onClick={() => {
              openLoginPage((s) => !s);
            }}
          >
            {hasAccount ? "Register" : "Login"}
          </button>
          <span>or</span>
          <FacebookLogin
            appId="142129044562039"
            redirectUri={"google.com"}
            cssClass="facebook-login-icon"
            autoLoad={false}
            fields="name,email,picture"
            onClick={() => {
              console.log("clicked");
            }}
            callback={(res) => {
              console.log(res);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const RegisterForm = ({ user, handleChange, handleRegister }) => {
  const schema = [
    {
      name: "Username",
      type: "text",
      placeholder: "login account",
      isRequired: true,
      key: "username",
    },
    {
      name: "Password",
      type: "password",
      placeholder: "secure password",
      isRequired: true,
      key: "password",
    },
    {
      name: "Full name",
      type: "text",
      placeholder: "your full name",
      isRequired: true,
      key: "userFullName",
    },

    {
      name: "Display name",
      type: "text",
      placeholder: "your display name",
      isRequired: true,
      key: "userDisplayName",
    },

    {
      name: "Gender",
      type: "text",
      placeholder: "what is your gender",
      isRequired: true,
      key: "gender",
    },

    {
      name: "Email",
      type: "email",
      placeholder: "your backup email",
      isRequired: true,
      key: "email",
    },

    {
      name: "Phone",
      type: "text",
      placeholder: "your phone number",
      isRequired: true,
      key: "phone",
    },

    {
      name: "Date of birth",
      type: "date",
      placeholder: "",
      isRequired: true,
      key: "dateOfBirth",
    },
  ];

  return (
    <form onSubmit={handleRegister} className={styles.MainForm}>
      {schema.map((input, index) => (
        <div key={"register-id-" + index} className={styles.groupForm}>
          <label>{input.name}</label>
          <input
            type={input.type}
            value={user[input.key]}
            onChange={handleChange(input.key)}
            placeholder={input.placeholder}
            required={input.isRequired}
          />
        </div>
      ))}
      <button type="submit">Create Account</button>
    </form>
  );
};
const LoginForm = ({ user, handleChange, handleLogin }) => {
  const schema = [
    {
      name: "Username",
      type: "text",
      placeholder: "login account",
      isRequired: true,
      key: "username",
    },
    {
      name: "Password",
      type: "password",
      placeholder: "secure password",
      isRequired: true,
      key: "password",
    },
  ];
  return (
    <form onSubmit={handleLogin} className={styles.MainForm}>
      {schema.map((input, index) => (
        <div key={"login-id-" + index} className={styles.groupForm}>
          <label>{input.name}</label>
          <input
            type={input.type}
            value={user[input.key]}
            onChange={handleChange(input.key)}
            placeholder={input.placeholder}
            required={input.isRequired}
          />
        </div>
      ))}

      <button type="submit">Login</button>
    </form>
  );
};
