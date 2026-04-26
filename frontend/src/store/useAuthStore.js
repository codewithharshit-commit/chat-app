import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  /* These are the initial state values for the properties in the `useAuthStore` created using Zustand.
  Here's what each property represents: */

  /* The `authUser: null,` property in the `useAuthStore` created using Zustand is initializing the
 `authUser` property with a value of `null`. This property is used to store the authenticated user
 data once the user is logged in. By setting it to `null` initially, it indicates that there is no
 authenticated user data available when the store is first created. Later, when the user logs in or
 the authentication status is checked, this property will be updated with the user data if the user
 is authenticated. */
  authUser: null,

  /* The `isSigningIn: false,` property in the `useAuthStore` created using Zustand is initializing the
  `isSigningIn` property with a value of `false`. This property is used to track the state of
  whether a user is currently in the process of signing in. By setting it to `false` initially, it
  indicates that the user is not currently in the process of signing in. This property can be
  updated to `true` when the sign-in process is initiated and then back to `false` once the sign-in
  process is completed. It helps manage the UI state related to the signing-in process within the
  application. */
  isSigningIn: false,
  /* The `isLoggingIn: false,` property in the `useAuthStore` created using Zustand is initializing the
 `isLoggingIn` property with a value of `false`. This property is used to track the state of whether
 a user is currently in the process of logging in. By setting it to `false` initially, it indicates
 that the user is not currently in the process of logging in. This property can be updated to `true`
 when the log-in process is initiated and then back to `false` once the log-in process is completed.
 It helps manage the UI state related to the logging-in process within the application. */
  isLoggingIn: false,
  isUpdatingProfile: false,

  /* The `isCheckingAuth: true,` property in the `useAuthStore` created using Zustand is initializing the
`isCheckingAuth` property with a value of `true`. This property is used to track the state of
whether the application is currently checking the authentication status of the user. */
  isCheckingAuth: true,

  /* The `checkAuth` function defined within the `useAuthStore` created using Zustand is an
  asynchronous function that is responsible for checking the authentication status of the user by
  making a request to the server endpoint `/auth/check`. */
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
