import { types } from "mobx-state-tree";
import { User } from "@/types/User.type";

// Define the User Model
export const UserModel = types.model("User", {
  _id: types.identifier,
  username: types.string,
  fullName: types.string,
  email: types.string,
  role: types.string,
  profileImg: types.maybeNull(types.string),
});

// Define the Auth Store
export const AuthStore = types
  .model("AuthStore", {
    user: types.maybeNull(UserModel),
    token: types.maybeNull(types.string),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value;
    },
    setError(message: string | null) {
      self.error = message;
    },
    setUser(user: User | null) {
      self.user = user ? (user as User) : null;
    },
    setToken(token: string | null) {
      self.token = token;
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    logout() {
      self.user = null;
      self.error = null;
      self.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    initialize() {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          self.token = storedToken;
        }
      }
    },
  }));
