// import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

//  const store = configureStore({
//     reducer: {
//       [authApi.reducerPath]: authApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(authApi.middleware)
//   })
  
//   setupListeners(store.dispatch)

//   export default store;

  
import { configureStore } from "@reduxjs/toolkit";
import appApi from "../services";
import counterReducer from "./counter/counterSlice";
import userReducer from './user/userSlice';


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
