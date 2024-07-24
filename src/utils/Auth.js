export const Config = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

// Function to handle logout
export const logout = (navigate) => {
  localStorage.removeItem("accessToken");
  navigate("/login");
};
