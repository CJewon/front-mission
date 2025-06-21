import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function userRefresh(refreshToken: string) {
  const response = await axiosClientHelper.post<RefreshResponse>(
    "/auth/refresh",
    {
      refreshToken,
    }
  );
  return response.data;
}
