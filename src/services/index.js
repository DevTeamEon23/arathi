import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Url from "src/auth/authService/Url";

// Use as per your requirement

// const baseQuery = fetchBaseQuery({
//   baseUrl: liveUrl,

//   // baseUrl: 'https://192.168.1.1/',
//   prepareHeaders: (headers) => {
//     const token = JwtService.getAccessToken();
//     // If we have a token set in state, let's assume that we should be passing it.
//     headers.set('auth-token', `${token}`);
//     return headers;
//   },
// });


// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     console.log('called');
//     JwtService.emit('onAutoLogout', 'Invalid access_token');
//     JwtService.setSession(null);
//   }
//   return result;
// };

const liveUrl = Url();


const apiSlice = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }), // only for demo
  // baseQuery: fetchBaseQuery({ baseUrl: liveUrl }), // Uncomment before start development
  endpoints: (builder) => ({}),
});

export default apiSlice;
