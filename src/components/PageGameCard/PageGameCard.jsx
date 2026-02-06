import styles from './PageGameCard.module.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';
import noImgIcon from '../../assets/images/white.png';
import { localBanners } from '../../api/localBanners';

export default function PageGameCard({ gameImg, title, id, variant = "square", loadingSkeleton, forceProviderBanner = false }) {
  const navigate = useNavigate();

  if (loadingSkeleton) {
    return <div className={`${styles.gameCard} ${styles[variant]} ${styles.skeleton}`}></div>;
  }

  const gameCode = id ? id.split('/')[1] : null;
  const provider = id ? id.split('/')[0]?.toLowerCase() : null;
  const normalizedCode = gameCode?.toLowerCase();
  const isCurated = !forceProviderBanner && normalizedCode && localBanners.includes(normalizedCode);
  
  const imgSrc = isCurated 
    ? `/assets/banners/games/${provider}/${normalizedCode}.png`
    : (gameImg ? (gameImg.startsWith('http') ? gameImg : `${API_BASE_URL}/${gameImg}`) : noImgIcon);

  return (
    <div className={`${styles.gameCard} ${styles[variant]}`} onClick={() => navigate(`/play/${id}`)}>
      <img src={imgSrc} className={styles.gameImg} alt={title} loading="lazy" />
      <div className={styles.overlay}>
         <span className={styles.playBtn}>PLAY</span>
      </div>
    </div>
  );
}
