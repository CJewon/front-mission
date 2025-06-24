import SignupForm from "@/components/SignupForm/SignupForm";
import styles from "./SignupPage.module.scss";

export default function SignupPage() {
  return (
    <div className={styles.Signup}>
      <SignupForm></SignupForm>
    </div>
  );
}
