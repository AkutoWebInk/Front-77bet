import styles from './AuthButtons.module.css';
import { useNavigate } from 'react-router-dom';


export default function AuthButtons(){
    const navigate = useNavigate();

    return (
        <section className={styles.component}>

            <button className={styles.login}
                onClick={()=>navigate('/login')}> Entrar </button>

           <button className={styles.register}
                onClick={()=>navigate('/register')}> Registrar </button>
                     
        </section>
    );
}