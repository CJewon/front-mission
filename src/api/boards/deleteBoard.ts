import axiosClientHelper from "@/utils/network/axiosClientHelper";

export async function deleteBoard(id: number) {
  const response = await axiosClientHelper.delete(`/boards/${id}`);
  return response.data;
}
