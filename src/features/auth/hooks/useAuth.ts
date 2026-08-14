import { AuthApi } from "../service/auth.api";
import { useStore, getRootStore } from "@/stores/root.store";
import { User } from "@/types/User.type";

export const useAuth = () => {
  let authStore;
  try {
    const rootStore = useStore();
    authStore = rootStore.authStore;
  } catch (e) {
    authStore = getRootStore().authStore;
  }

  const handleGuestLogin = async (): Promise<User | undefined> => {
    authStore.setLoading(true);
    authStore.setError(null);
    try {
      const response = await AuthApi.guestLogin();
      const { access_token, user } = response.data;

      authStore.setToken(access_token);
      authStore.setUser(user);
      return user;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Guest login failed. Please try again.";
      authStore.setError(message);
    } finally {
      authStore.setLoading(false);
    }
  };

  const handleGoogleLogin = async (
    idToken: string,
  ): Promise<User | undefined> => {
    authStore.setLoading(true);
    authStore.setError(null);
    try {
      const response = await AuthApi.googleLogin(idToken);
      const { access_token, user } = response.data;

      authStore.setToken(access_token);
      authStore.setUser(user);
      return user;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Google authentication failed.";
      authStore.setError(message);
    } finally {
      authStore.setLoading(false);
    }
  };

  return {
    user: authStore.user,
    isLoading: authStore.isLoading,
    error: authStore.error,
    handleGuestLogin,
    handleGoogleLogin,
    logout: authStore.logout,
  };
};
