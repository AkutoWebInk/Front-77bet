import styles from './Footer.module.css';

// Components:
import ageIcon from './assets/18+.svg';
import pixIcon from './assets/pix.svg';
import picpayIcon from './assets/picpay.svg';
import hipercardIcon from  './assets/hipercard.svg';
import sbcawardsIcon from './assets/SBCAwards.svg';
import best70Icon from './assets/best-70.svg';



export default function Footer() {
  return (
    <footer className={styles.footer}>

        <section className={styles.payments}>
          <img src={ageIcon} className={styles.paymentIcon}/>
          <img src={pixIcon} className={styles.paymentIcon}/>
          <img src={picpayIcon} className={styles.paymentIcon}/>
          <img src={hipercardIcon} className={styles.paymentIcon}/>
          <img src={sbcawardsIcon} className={styles.paymentIcon}/>
          <img src={best70Icon} className={styles.paymentIcon}/>

        </section>

        <p className={styles.warning}>
          Jogue com responsabilidade!
          <br />
          O jogo pode ser prejudicial se não for controlado e feito com responsabilidade. 
          Por isso, leia todas as informações disponíveis na nossa seção de Jogo Responsável. 
          <br />
          <br />
          <strong> Importante:</strong> O uso de recursos do Bolsa Família, 
          BPC e de outros programas de assistência social 
          é estritamente proibido para atividades relacionadas a apostas de quota fixa.
        </p>
        <p className={styles.rights}>© 2024 77bet. 
          Todos os direitos reservados.</p>
    </footer>
  );
}