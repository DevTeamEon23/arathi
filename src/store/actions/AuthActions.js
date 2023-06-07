import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(username, email, password, confPassword,role, history) {
    return (dispatch) => {
        signUp(username, email, password, confPassword,role)
        .then((response) => {
            console.log("response",response.data);
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                history,
            );
            dispatch(confirmedSignupAction(response.data));
            history.push('/login');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    console.log("email",email,"password",password,history)
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                console.log("check res",response,response.data);
                saveTokenInLocalStorage(response.data);
                runLogoutTimer(
                    dispatch,
                    response.data.expiresIn * 1000,
                    history,
                );
                console.log("loginAction")
                dispatch(loginConfirmedAction(response.data));
				history.push('/dashboard');  
                console.log("end")

            })
            .catch((error) => {
				console.log("error in login action",error);
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    const loginData = {
        email: data[0].email,
        idToken: true,
        localId: data[0].id,
        expiresIn: data.expireDate,
        refreshToken: data[0].refresh_token,
        confPassword:data[0].confPassword,
        id:data[0].id,
        username: data[0].username,
        password: data[0].password,
        // refresh_token: data[0].refresh_token,
        returnSecureToken: data[0].returnSecureToken,
        role: data[0].role,
      };
      console.log("data Obj ", data[0].email);
      return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: loginData,
      };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
