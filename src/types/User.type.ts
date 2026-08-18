export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: string | null;
  profileImg: string | null;
}
