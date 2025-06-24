import { getBoards } from "@/api/boards/getBoards";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import styles from "./BoardList.module.scss";

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
  const [loading, setLoading] = useState(false);
  const size = 5;
  const nav = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const List = await getBoards({ page: page - 1, size });
        setBoardItem(List.content);
        setTotal(List.totalElements);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [page]);

  const handleWrite = () => {
    nav("/boards/new");
  };

  if (loading) return <div className={styles.Loading}>로딩 중...</div>;
  return (
    <div className={styles.BoardList}>
      <div className={styles.header}>
        <button onClick={handleWrite}>글 작성하기</button>
      </div>

      <ul className={styles.list}>
        {boardItem.map((item) => (
          <li
            key={item.id}
            className={styles.listItem}
            onClick={() => nav(`/boards/${item.id}`)}
          >
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <Pagination
          currentPage={page}
          count={total}
          pageSize={size}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
