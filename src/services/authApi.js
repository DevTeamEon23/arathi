import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Url from "src/auth/authService/Url";

const liveUrl = Url();

const jwtToken = window.localStorage.getItem("jwt_access_token");
console.log(jwtToken);

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),//url
  endpoints: (builder) => ({
    getAllUsers:builder.query({
      query:(headers)=>{
        return{
          url: "/lms-service/users",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": jwtToken
          }
        }
      }
    })
  }),
});

export const {useGetUsersQuery}= authApi;
export default authApi 