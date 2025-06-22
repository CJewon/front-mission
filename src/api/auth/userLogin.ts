import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserLoginProps {
  username: string;
  password: string;
}

export async function userLogin({
  username,
  password,
}: UserLoginProps): Promise<LoginResponse> {
  const response = await axiosClientHelper.post<LoginResponse>("/auth/signin", {
    username,
    password,
  });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data;
}
