import { useEffect, useState } from "react";
import styles from "./BoardItem.module.scss";
import { getBoard } from "@/api/boards/getBoard";
import { useParams } from "react-router-dom";

type Board = {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  imageUrl?: string;
  createdAt: string;
};

export default function BoardItem() {
  const { id } = useParams();
  const [item, setItem] = useState<Board | null>(null);

  useEffect(() => {
    if (!id) return;
    const getItem = async () => {
      try {
        const data = await getBoard(Number(id));
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    getItem();
  }, [id]);

  if (!item) return <div>로딩 중...</div>;

  return (
    <div className={styles.BoardItem}>
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
    </div>
  );
}
