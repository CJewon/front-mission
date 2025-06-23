import { isloggedIn } from "@/utils/auth/auth";
import styles from "./Header.module.scss";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const loggedIn = isloggedIn();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    nav("/login");
  };

  const handleLogoLink = () => {
    nav("/");
  };

  const handleLoginLink = () => {
    nav("/login");
  };

  const handleSignupLink = () => {
    nav("/signup");
  };

  const handleBoradLink = () => {
    if (localStorage.getItem("accessToken")) {
      nav({
        pathname: "/boards",
        search: createSearchParams({
          page: "1",
          size: "10",
        }).toString(),
      });
    } else {
      nav("/login");
    }
  };
  return (
    <header className={styles.Header}>
      <div>
        <img
          src={undefined}
          alt="회사 로고"
          className={styles.img}
          onClick={handleLogoLink}
        />
      </div>
      <div className={styles.boardButton} onClick={handleBoradLink}>
        게시판
      </div>
      <div className={styles.loginContainer}>
        {loggedIn ? (
          <>
            <div className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div className={styles.loginButton} onClick={handleLoginLink}>
              로그인
            </div>
            <div className={styles.signupButton} onClick={handleSignupLink}>
              회원가입
            </div>
          </>
        )}
      </div>
    </header>
  );
}
