import Link from "next/link";
import styles from "../styles/header.module.css";
import {
  linePassive,
} from "./hamburger";


function Header() {

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <img src="/images/globe.png" alt="" className={styles.logo} />
        </Link>
        <h1 className={styles.title}>Blogr</h1>
      </div>
      <div className={styles.hamburger}>
        <div style={linePassive}></div>
        <div style={linePassive}></div>
        <div style={linePassive}></div>
      </div>
    </div>
  );
}

export default Header;
