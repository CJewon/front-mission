import BoardList from "@/components/BoardList/BoardList";
import styles from "./Boards.module.scss";

export default function BoardsPage() {
  return (
    <div className={styles.Boards}>
      <BoardList></BoardList>
    </div>
  );
}
