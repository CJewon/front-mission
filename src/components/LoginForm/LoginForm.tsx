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

  const handleGoToSignup = () => {
    nav("/signup");
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
        <div className={styles.errorContainer}>
          {errors.username ? (
            <p className={styles.errorMessage}>{errors.username.message}</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        ></Input>
        <div className={styles.errorContainer}>
          {errors.password ? (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <Button text="로그인" type="submit"></Button>
      </form>
      <div className={styles.linkContainer}>
        <p>회원이 아니신가요?</p>
        <p onClick={handleGoToSignup} className={styles.signupLink}>
          회원가입 하러가기
        </p>
      </div>
    </div>
  );
}
