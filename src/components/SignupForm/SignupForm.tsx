import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/regex";
import { userSignup } from "@/api/auth/userSignup";

type SignupForm = {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>();

  const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await userSignup(data);
      console.log(response);
    } catch (error) {
      console.error("회원가입 실패 : ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={undefined} alt="회사 로고" />
        </div>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("username", {
            required: "아이디를 입력해주세요",
            pattern: {
              value: EMAIL_REGEX,
              message: "이메일 형식으로 작성해주세요",
            },
          })}
        ></Input>
        {errors.username && <p>{errors.username.message}</p>}
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          {...register("name", { required: "이름을 입력해주세요" })}
        ></Input>
        {errors.name && <p>{errors.name.message}</p>}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상으로 조합해주세요.",
            },
          })}
        ></Input>
        {errors.password && <p>{errors.password.message}</p>}
        <Input
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          {...register("confirmPassword", {
            required: "비밀번호를 입력해주세요",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        ></Input>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <Button text="회원가입" type="submit"></Button>
      </form>
    </div>
  );
}
