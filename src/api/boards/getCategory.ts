import axiosClientHelper from "@/utils/network/axiosClientHelper";

export async function getCategory() {
  const response = await axiosClientHelper.get("/boards/categories");
  return response.data;
}
