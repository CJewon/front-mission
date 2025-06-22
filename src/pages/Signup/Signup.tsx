import SignupForm from "@/components/SignupForm/SignupForm";
import styles from "./Signup.module.scss";

export default function Signup() {
  return (
    <div className={styles.Signup}>
      <SignupForm></SignupForm>
    </div>
  );
}
