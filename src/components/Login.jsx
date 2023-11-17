import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { login } from "../services/login";

export const Login = ({ setUser }) => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState(null);

  function handlePasswordVisibility() {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await login(loginDetails);
      setUser(user);
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError(
          "Network Error: Please check your internet connection and retry"
        );
      } else if (err.response.status === 400) {
        setError(err.response.data.password[0]);
      } else if (err.response.status === 401) {
        setError(err.response.data.ui_err_msg);
      }
      setTimeout(() => setError(null), 5000);
    }

    setLoginDetails({
      username: "",
      password: "",
    });
  }

  return (
    <div className="login-container">
      <h1>Venue Admin Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-container">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={loginDetails.username}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, username: e.target.value })
            }
            required
          />
          <div className="password-container">
            <span className="visibility" onClick={handlePasswordVisibility}>
              {passwordType === "password" ? (
                <FaEye size={22} />
              ) : (
                <FaEyeSlash size={22} />
              )}
            </span>
            <input
              type={passwordType}
              name="password"
              id="password"
              placeholder="Password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="login-btn-container">
          {error && <div className="error">{error}</div>}
          <button>Sign In</button>
          <p>New Registration?</p>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func,
};
