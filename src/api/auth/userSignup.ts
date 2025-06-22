import axiosClientHelper from "@/utils/network/axiosClientHelper";

interface SignupProps {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export async function userSignup(data: SignupProps) {
  console.log(data);
  const response = await axiosClientHelper.post("/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
