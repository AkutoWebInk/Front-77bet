import styles from './Swiper.module.css';
import { useNavigate } from 'react-router-dom';

export default function CategorySwiper({shortcuts}) {
  const navigate = useNavigate();

  const handleClick = (shortcut) => {
    if (shortcut.code) {
        navigate(`/casino/provider/${shortcut.code}`);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.swiper}>
        {shortcuts.map((shortcut, index) => (
          <div key={index} className={styles.item} onClick={() => handleClick(shortcut)}>
            <div className={styles.card}>
              <img src={shortcut.img} className={styles.icon} alt={shortcut.name} />
            </div>
            <span className={styles.name}>{shortcut.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}