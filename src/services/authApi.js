import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Url from "src/auth/authService/Url";

const liveUrl = Url();

const jwtToken = window.localStorage.getItem("jwt_access_token");

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }), //url
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/lms-service/users",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            AuthToken: localStorage.getItem("token"),
          },
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = authApi;
export default authApi;
