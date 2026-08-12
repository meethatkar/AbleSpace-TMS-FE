import { api } from "@/utils/axios";

export const AuthApi = {
  guestLogin: async () => {
    return api.post("/auth/guest");
  },

  googleLogin: async (idToken: string) => {
    return api.post("/auth/googleAuth", { token: idToken });
  },
};
