import { lazy, Suspense, useEffect } from 'react'
/// Components
import Index from './main'
import { useDispatch } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

/// Style
import './theme/vendor/bootstrap-select/dist/css/bootstrap-select.min.css'
import './theme/css/style.css'
import { useAuth } from './auth/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { selectUser } from 'src/store/user/userSlice'
const SignUp = lazy(() => import('./main/pages/Registration'))
const ForgotPassword = lazy(() => import('./main/pages/ForgotPassword'))
const Reset = lazy(() => import('./main/pages/Reset'))
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./main/pages/Login')), 500)
  })
})

function App(props) {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const user = useSelector(selectUser)
  const roleType = user && user.role && user.role[0]

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     props.history.replace("/dashboard");
  //   } else {
  //     props.history.replace("/login");
  //   }
  // }, [dispatch, props.history, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && roleType === 'Learner') {
      props.history.replace('/learn-dash')
    } else if (isAuthenticated && roleType === 'Instructor') {
      props.history.replace('/inst-dash')
    } else if (isAuthenticated) {
      props.history.replace('/dashboard')
    } else {
      props.history.replace('/login')
    }
  }, [dispatch, props.history, isAuthenticated, roleType])

  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/page-register' component={SignUp} />
      <Route path='/page-forgot-password' component={ForgotPassword} />
      <Route path='/page-reset-password' component={Reset} />
    </Switch>
  )
  if (isAuthenticated) {
    return (
      <>
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }
        >
          <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Index />
        </Suspense>
      </>
    )
  } else {
    return (
      <div className='vh-100'>
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    )
  }
}

export default withRouter(App)
