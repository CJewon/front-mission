import axiosClientHelper from "@/utils/network/axiosClientHelper";

export async function getBoard(id: number) {
  const response = await axiosClientHelper.get(`/boards/${id}`);
  return response.data;
}
