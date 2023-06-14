import jwtServiceConfig from "./jwtServiceConfig";
import Utils from "../../utils";
import axios from "axios";
import Url from "./Url";

/* eslint-disable camelcase */

const liveUrl = Url();

const axiosInstance = axios.create({
  baseURL: liveUrl,
});

class JwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (access_token) {
      this.emit("onAutoLogin", true);
      this.setSession(access_token);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axiosInstance.post(jwtServiceConfig.signUp, data).then((response) => {
        resolve();
        // if (response.data.user) {
        //   this.setSession(response.data.access_token);
        //   resolve(response.data.user);

        //   this.emit("onLogin", response.data.user);
        // } else {
        //   reject(response.data.error);
        // }
      });
    });
  };

  signInWithEmailAndPassword = (data) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(jwtServiceConfig.signIn, { ...data })
        .then((response) => {
          // handle wrong password or email response
          if (response.data.data.user) {
            this.setSession(response.data.token);
            this.emit("onLogin", response.data.data.user);
            resolve(response.data.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.data.status === "failure") {
            reject(new Error('Email or Password invaild.'));
          }
          reject(response.data);
          //   if (!response.data.verified) {
          //     reject(new Error({ verified: response.data.verified }));
          //   }
        });
    });
  };
  logout = () => {
    axiosInstance
      .post(
        jwtServiceConfig.logout,
        {},
        { headers: { ["auth-token"]: this.getAccessToken() } }
      )
      .then(() => {
        this.setSession(null);
        this.emit("onLogout", "Logged out");
      });
  };
  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(jwtServiceConfig.accessToken, {
          headers: { ["auth-token"]: this.getAccessToken() },
        })
        .then((response) => {
          if (response.data.data.user) {
            this.setSession(response.data.token);
            resolve(response.data.data.user);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axiosInstance.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  };

  //   isAuthTokenValid = (access_token) => {
  //     if (!access_token) {
  //       return false;
  //     }
  //     const decoded = jwtDecode(access_token);
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       console.warn("access token expired");
  //       return false;
  //     }

  //     return true;
  //   };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;
