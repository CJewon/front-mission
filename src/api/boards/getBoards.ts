import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface GetBoardsProps {
  page?: number;
  size?: number;
}

export async function getBoards({ page = 0, size = 5 }: GetBoardsProps) {
  const response = await axiosClientHelper.get("/boards", {
    params: { page, size },
  });

  return response.data;
}
