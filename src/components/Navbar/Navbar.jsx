// React:
import { NavLink } from 'react-router-dom';

// CSS:
import styles from './Navbar.module.css';

// Assets:
import slotsIcon from './assets/slots.png';
import background from './assets/background.png';
import userIcon from '../../pages/Profile/assets/user.png';

// Auth
import { useAuth } from '../../context/AuthProvider';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <section className={styles.component}>

      <img src={background} className={styles.background} />

      {/* Home Button */}
      <NavLink className={styles.button} to='/'>
        <img src={slotsIcon} className={styles.icon}/>
        <span> Slots </span>
      </NavLink>
      
      {/* Profile Button */}
      {user && (
        <NavLink className={styles.button} to='/profile'>
          <img src={userIcon} className={styles.icon}/>
          <span> Perfil </span>
        </NavLink>
      )}

    </section>
  );

}
