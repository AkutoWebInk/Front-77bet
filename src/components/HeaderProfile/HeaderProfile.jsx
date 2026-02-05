import styles from './HeaderProfile.module.css';
import fallback from './assets/user.png';
import { NavLink } from 'react-router-dom';

export default function HeaderProfile(){
    return(
        <section className={styles.component}>
            <NavLink className={styles.component} to={'/profile'}>
                <img src={fallback} className={styles.picture} />
            </NavLink>
        </section>
    )
}