import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./reducers/PostsReducer";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
import rootReducers from "./reducers/Index";
import appApi from "../services";
import counterReducer from "./reducers/counterSlice";
import authReducer from "./reducers/authSlice";
import userReducer from './reducers/userSlice';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  todoReducers,
  //form: reduxFormReducer,
});

const middlewares = [appApi.middleware];

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./reducers/rootReducers", () => {
//     const newRootReducer = require("./reducers/rootReducers").default;
//     store.replaceReducer(newRootReducer.createReducer());
//   });
// }

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === "development",
});

export default store;
//const store = createStore(rootReducers);

// export const store = createStore(reducers,  composeEnhancers(middleware));
