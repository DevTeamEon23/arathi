import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./main";
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./theme/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./theme/css/style.css";
import { useAuth } from './auth/AuthContext';


const SignUp = lazy(() => import('./main/pages/Registration'));
const ForgotPassword = lazy(() => import('./main/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./main/pages/Login')), 500);
  });
});

function App (props) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth()
    useEffect(() => {
        // checkAutoLogin(dispatch, props.history);
        if (isAuthenticated) {
            props.history.push('/dashboard')
        } else {
            props.history.push("/login");
        }
    }, [dispatch, props.history, isAuthenticated]);
    
    let routes = (  
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/page-register' component={SignUp} />
            <Route path='/page-forgot-password' component={ForgotPassword} />
        </Switch>
    );
    if (isAuthenticated) {
		return (
			<>
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
                    <Index / >
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

