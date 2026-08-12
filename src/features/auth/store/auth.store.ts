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
    logout() {
      self.user = null;
      self.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    initialize() {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
          try {
            self.user = JSON.parse(storedUser);
          } catch (e) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }
      }
    },
  }));
