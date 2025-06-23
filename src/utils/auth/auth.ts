export function isloggedIn(): boolean {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return Boolean(accessToken && refreshToken);
}
