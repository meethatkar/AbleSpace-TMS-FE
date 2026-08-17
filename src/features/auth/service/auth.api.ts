import { api } from "@/utils/axios";

export const AuthApi = {
  guestLogin: async () => {
    return api.post("/auth/guest");
  },

  googleLogin: async (idToken: string) => {
    return api.post("/auth/googleAuth", { token: idToken });
  },

  getme: async () => {
    return api.get("/user");
  },

  updateEmail: async (email: string) => {
    return api.patch("/user", {
      email,
    });
  },
};
