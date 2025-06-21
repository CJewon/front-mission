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

  return response.data;
}
