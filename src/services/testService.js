import apiSlice from "./index";

export const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get
    getUsers: builder.query({
        query: () => ({
            url: '/lms-service/users',
            method: 'Get',
        }),
    }),
    // Post
    createUser: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    // Put
    updateUser: builder.mutation({
      query: (id, body) => ({
        url: `/users?userId=${id}`,
        method: 'PUT',
        body,
      }),
    }),
    // Delete
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users?userId=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = testApi;
// Use can call Lazy as per your requrement
// export const { useLazyGetUsersQuery} = testApi
