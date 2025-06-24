import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/regex";
import { userSignup } from "@/api/auth/userSignup";
import { useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.scss";

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

  const nav = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    try {
      await userSignup(data);
      nav("/login");
    } catch (error) {
      console.error("회원가입 실패 : ", error);
    }
  };

  const handleGoToLogin = () => {
    nav("/login");
  };

  const handleLogoLink = () => {
    nav("/");
  };
  return (
    <div className={styles.SignupForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.imgContainer}>
          <img src={undefined} alt="회사 로고" onClick={handleLogoLink} />
        </div>
        <Input
          type="text"
          placeholder="이메일을 입력해주세요"
          {...register("username", {
            required: "아이디를 입력해주세요",
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
          type="text"
          placeholder="이름을 입력해주세요"
          {...register("name", { required: "이름을 입력해주세요" })}
        ></Input>
        <div className={styles.errorContainer}>
          {errors.name ? (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: 8,
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상으로 조합해주세요.",
            },
          })}
        ></Input>
        <div className={styles.errorContainer}>
          {errors.password ? (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          {...register("confirmPassword", {
            required: "비밀번호를 입력해주세요",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        ></Input>
        <div className={styles.errorContainer}>
          {errors.confirmPassword ? (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <Button text="회원가입" type="submit"></Button>
      </form>
      <div className={styles.linkContainer}>
        <p>이미 회원이신가요?</p>
        <p onClick={handleGoToLogin} className={styles.loginLink}>
          로그인 하러가기
        </p>
      </div>
    </div>
  );
}
