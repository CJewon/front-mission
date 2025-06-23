import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface GetBoardsProps {
  page?: number;
  offset?: number;
}

export async function getBoards({ page = 0, offset = 10 }: GetBoardsProps) {
  const response = await axiosClientHelper.get("/boards", {
    params: { page, offset },
  });

  return response.data;
}
