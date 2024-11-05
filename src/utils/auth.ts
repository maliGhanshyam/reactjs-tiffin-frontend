export const isAuthenticated = (): boolean => {
  return (
    !!localStorage.getItem("token") && !!localStorage.getItem("userRoleId")
  );
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
