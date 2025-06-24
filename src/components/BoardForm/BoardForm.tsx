import { useState, useEffect } from "react";
import { createBoard } from "@/api/boards/createBoard";
import { updateBoard } from "@/api/boards/updateBoard";
import { getBoard } from "@/api/boards/getBoard";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BoardForm.module.scss";

type BoardFormProps = {
  isEdit: boolean;
};

const categoryLabels = {
  NOTICE: "공지",
  FREE: "자유",
  QNA: "Q&A",
  ETC: "기타",
} as const;

type CategoryType = keyof typeof categoryLabels;

const categoryOptions = Object.entries(categoryLabels) as [
  CategoryType,
  string
][];

export default function BoardForm({ isEdit = false }: BoardFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CategoryType>("NOTICE");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      getBoard(+id)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.boardCategory);
        })
        .catch(console.error);
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && id) {
        await updateBoard({ id: +id, title, content, category, file });
        alert("수정 완료");
      } else {
        await createBoard({ title, content, category, file });
        alert("등록 완료");
      }
      navigate("/boards");
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.BoardForm}>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
        />
      </div>

      <div>
        <label>카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryType)}
        >
          {categoryOptions.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>파일 첨부 (선택)</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <button type="submit">{isEdit ? "수정하기" : "등록하기"}</button>
      <button type="button" onClick={() => navigate("/boards")}>
        취소
      </button>
    </form>
  );
}
