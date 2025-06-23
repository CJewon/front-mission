import axiosClientHelper from "@/utils/network/axiosClientHelper";

type UpdatePostFormData = {
  id: number;
  title: string;
  content: string;
  category: "NOTICE" | "FREE" | "QNA";
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
