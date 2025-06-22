import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Button from "../Button/Button";
import { userLogin } from "@/api/auth/userLogin";
import { EMAIL_REGEX } from "@/constants/regex";

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

  const onSubmit = async (data: LoginForm) => {
    try {
      await userLogin(data);

      nav("/");
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.log(error);
    }
  };

  const handleLogoLink = () => {
    nav("/");
  };
  return (
    <div className={styles.LoginForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div onClick={handleLogoLink} className={styles.imgContainer}>
          <img src={undefined} alt="회사 로고" />
        </div>
        <Input
          type="text"
          placeholder="아이디를 입력하세요."
          {...register("username", {
            required: "아이디를 입력해주세요.",
            pattern: {
              value: EMAIL_REGEX,
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
