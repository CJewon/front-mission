import axiosClientHelper from "@/utils/network/axiosClientHelper";

type PostFormData = {
  title: string;
  content: string;
  category: "NOTICE" | "FREE" | "QNA" | "ETC";
  file?: File | null;
};

export async function createBoard(formData: PostFormData) {
  const { title, content, category, file } = formData;

  const multipartForm = new FormData();

  const requestPayload = JSON.stringify({ title, content, category });
  multipartForm.append(
    "request",
    new Blob([requestPayload], { type: "application/json" })
  );

  if (file) {
    multipartForm.append("file", file);
  }

  const response = await axiosClientHelper.post("/boards", multipartForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
