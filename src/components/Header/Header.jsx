// CSS:
import styles from './Header.module.css';
// Assets:
import icon from './assets/77-.png';
// Auth:
import { useAuth } from '../../context/AuthProvider';
// Router:
import { Link } from 'react-router-dom';
// Components:
import AuthButtons from '../AuthButtons/AuthButtons';

export default function Header() {
  const { user } = useAuth();

  return (
    <section className={styles.component}>
      <div className={styles.innerHeader}>
        
        <Link to="/" className={styles.logoContainer}>
          <img src={icon} className={styles.icon}/>
        </Link>

        <nav className={styles.desktopNav}>
          <Link to="/" className={styles.navLink}>Início</Link>
          <Link to="/profile" className={styles.navLink}>Perfil</Link>
        </nav>
      
        <div className={styles.rightContainer}>
            {!user && <AuthButtons />}
        </div>
      </div>
    </section>
  );
}