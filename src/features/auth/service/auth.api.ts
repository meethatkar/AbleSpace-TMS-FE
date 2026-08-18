import { localApi } from "@/utils/axios";

export const AuthApi = {
  guestLogin: async () => {
    return localApi.post("/auth/guest");
  },

  googleLogin: async (idToken: string) => {
    return localApi.post("/auth/googleAuth", { token: idToken });
  },

  getme: async () => {
    return localApi.get("/user");
  },

  updateEmail: async (email: string) => {
    return localApi.patch("/user", {
      email,
    });
  },
};
