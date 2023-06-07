import { lazy, Suspense, useEffect } from 'react';

import { createContext } from "react";
/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import InstructorDashboard from './jsx/components/Instructor/InstructorDashboard';
// import Home from './jsx/components/Dashboard/Home';
// import Profile from './jsx/components/Dashboard/Profile';

  

const Register = lazy(() => import('./jsx/pages/Register'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});
const Reset = lazy(() => import('./jsx/pages/Reset'));
const Users = lazy(() => import('./jsx/components/Users/Users'));

function App (props) {
    const dispatch = useDispatch();
    useEffect(() => {
        checkAutoLogin(dispatch, props.history);
    }, [dispatch, props.history]);
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    let routes = (  
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/page-register' component={Register} />
            <Route path='/page-forgot-password' component={ForgotPassword} />
            <Route path='/page-reset-password' component={Reset} />
            <Route path='/users-list' component={Users} />
            <ToastContainer />
                <GoogleLogin clientID={process.env.REACT_APP_GOOGLE_CLIENT_ID} onSuccess={responseMessage} onError={errorMessage} ></GoogleLogin>
            </Switch>
    );
    if (props.isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                        <div id="preloader">
                            {/* <div className="sk-three-bounce">
                                <div className="sk-child sk-bounce1"></div>
                                <div className="sk-child sk-bounce2"></div>
                                <div className="sk-child sk-bounce3"></div>
                            </div> */}
                            </div> 
                   }
                >
                    <Index />
                </Suspense>
            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >           
        
                    {routes}
                </Suspense>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 

