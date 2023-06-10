import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use as per your requirement

// const liveUrl = url();

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


const apiSlice = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
