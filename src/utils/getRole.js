import { jwtDecode } from "jwt-decode";

export const GetRoleFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
