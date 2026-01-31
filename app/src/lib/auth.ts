export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("storage"));
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
  window.location.href = "/login";
};
