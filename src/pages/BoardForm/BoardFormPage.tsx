import BoardForm from "@/components/BoardForm/BoardForm";
import { useLocation } from "react-router-dom";
import styles from "./BoardFormPage.module.scss";

export default function BoardFormPage() {
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  return (
    <div className={styles.BoardForm}>
      <h1>{isEdit ? "게시글 수정" : "게시글 작성"}</h1>
      <BoardForm isEdit={isEdit} />
    </div>
  );
}
