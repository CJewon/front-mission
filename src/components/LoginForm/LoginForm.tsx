import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Button from "../Button/Button";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const nav = useNavigate();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  const handleLogoLink = () => {
    nav("/");
  };
  return (
    <div className={styles.LoginForm}>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <div onClick={handleLogoLink}>
          <img src="" alt="회사 로고" />
        </div>
        <Input
          type="text"
          placeholder="아이디를 입력하세요."
          {...register("username", {
            required: "아이디를 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "이메일 형식으로 작성해주세요",
            },
          })}
        ></Input>
        {errors.username && <p>{errors.username.message}</p>}
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        ></Input>
        {errors.password && <p>{errors.password.message}</p>}
        <Button text="로그인" type="submit"></Button>
      </form>
    </div>
  );
}
