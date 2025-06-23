// src/api/boards/updatePost.ts

import axiosClientHelper from "@/utils/network/axiosClientHelper";

type UpdatePostFormData = {
  id: number; // 게시글 ID
  title: string;
  content: string;
  category: "NOTICE" | "FREE" | "QNA"; // 서버에 정의된 카테고리
  file?: File | null;
};

export async function updateBoard(formData: UpdatePostFormData) {
  const { id, title, content, category, file } = formData;

  const multipartForm = new FormData();

  const requestPayload = JSON.stringify({ title, content, category });
  multipartForm.append(
    "request",
    new Blob([requestPayload], { type: "application/json" })
  );

  if (file) {
    multipartForm.append("file", file);
  }

  const response = await axiosClientHelper.patch(
    `/boards/${id}`,
    multipartForm,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
