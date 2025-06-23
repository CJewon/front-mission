import { getBoards } from "@/api/boards/getBoards";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

interface BoardItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export default function BoardList() {
  const [boardItem, setBoardItem] = useState<BoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 10;

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const List = await getBoards({ page: page - 1, size });
        setBoardItem(List.content);
        setTotal(List.totalElements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoards();
  }, [page]);
  return (
    <div>
      <ul>
        {boardItem.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        count={total}
        pageSize={size}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
