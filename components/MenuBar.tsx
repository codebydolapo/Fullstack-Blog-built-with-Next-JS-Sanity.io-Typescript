import styles from '../styles/menubar.module.css'
import Link from 'next/link'
import { HomeIcon, BookOpenIcon, StarIcon, AnnotationIcon } from "@heroicons/react/solid";

function MenuBar(){
    return (
      <div className={styles.menuBar}>
        <div>
          <Link href="/#landing">
            <HomeIcon className={styles.heroIcon} />
          </Link>
          <p className={styles.title}>Home</p>
        </div>
        <div>
          <Link href='/#categoryMain'>
            <BookOpenIcon className={styles.heroIcon} />
          </Link>
          <p className={styles.title}>Categories</p>
        </div>
        <div>
          <Link href="">
            <AnnotationIcon className={styles.heroIcon} />
          </Link>
          <p className={styles.title}>Posts</p>
        </div>
        <div>
          <Link href="">
            <StarIcon className={styles.heroIcon} />
          </Link>
          <p className = {styles.title}>Featured</p>
        </div>
      </div>
    );
}

export default MenuBar