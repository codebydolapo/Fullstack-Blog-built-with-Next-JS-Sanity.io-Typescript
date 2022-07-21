import styles from "../styles/landing.module.css";
import Link from "next/link";

function Landing() {
  return (
    <div className={styles.landingMain} id="landing">
      <div className={styles.landingMessage}>
        <p className={styles.get}>Get Your Ideas Out Into The World</p>
        <p className={styles.lorem}>
          lorem ipsum dolor sit amet concectetur elipsing atur. lorem ipsum
          dolor sit amet concectetur elipsing atur lorem ipsum dolor sit amet
          concectetur elipsing atur
        </p>
        <Link href="#categoryMain">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
