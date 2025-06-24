import { useEffect, useState } from "react";
import styles from "./BoardDetailPage.module.scss";
import { getBoard } from "@/api/boards/getBoard";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "@/api/boards/deleteBoard";

type Board = {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  imageUrl?: string;
  createdAt: string;
};

export default function BoardDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Board | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    const getItem = async () => {
      try {
        const data = await getBoard(Number(id));
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    getItem();
  }, [id]);

  const handleBoards = () => {
    nav("/boards");
  };

  const handleEdit = () => {
    if (item) {
      nav(`/boards/edit/${item.id}`, { state: { board: item } });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하겠습니까?");
    if (!confirmDelete || !item) return;

    try {
      await deleteBoard(item.id);
      alert("삭제되었습니다.");
      nav("/boards");
    } catch (error) {
      console.error(error);
      alert("삭제중 오류가 발생했습니다.");
    }
  };

  if (!item) return <div className={styles.Loading}>로딩 중...</div>;

  return (
    <div className={styles.BoardDetail}>
      <div className={styles.header}>
        <span className={styles.category}>{item.boardCategory}</span>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.date}>
          {new Date(item.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
      {item.imageUrl && (
        <div className={styles.imageContainer}>
          <img src={item.imageUrl} alt={item.title} />
        </div>
      )}
      <div className={styles.content}>
        <p>{item.content}</p>
      </div>
      <div className={styles.boardButtonWrapper}>
        <button onClick={handleBoards}>목록보기</button>
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
}
