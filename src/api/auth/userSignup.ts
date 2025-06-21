import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface SignupProps {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export async function Signup(data: SignupProps) {
  const response = await axiosClientHelper.post("/auth/signup", data);

  return response.data;
}
