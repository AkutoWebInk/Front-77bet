import styles from './Swiper.module.css';
import { useNavigate } from 'react-router-dom';

export default function CategorySwiper({shortcuts}) {
  const navigate = useNavigate();

  const handleClick = (shortcut) => {
    if (shortcut.code) {
        // navigate(`/casino/provider/${shortcut.code}`);
        console.log("Navigation disabled: Provider page temporarily removed.");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.swiper}>
        {shortcuts.map((shortcut, index) => (
          <div key={index} className={styles.item} onClick={() => handleClick(shortcut)}>
            <div className={`${styles.card} ${!shortcut.img ? styles.textCard : ''}`}>
              {shortcut.img ? (
                <img src={shortcut.img} className={styles.icon} alt={shortcut.name} />
              ) : (
                <span className={styles.cardText}>{shortcut.name}</span>
              )}
            </div>
            {shortcut.img && <span className={styles.name}>{shortcut.name}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}