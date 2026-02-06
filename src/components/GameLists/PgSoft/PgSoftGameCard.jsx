import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PgSoftGameCard.module.css';
import noImgIcon from '../../../assets/images/white.png';
import { API_BASE_URL } from '../../../api/api';
import { localBanners } from '../../../api/localBanners';

export default function PgSoftGameCard({ gameImg, title, id, variant = "portrait", loadingSkeleton }) {
  const navigate = useNavigate();

  if (loadingSkeleton) {
    return <div className={`${styles.gameCard} ${styles[variant]} ${styles.skeleton}`}></div>;
  }

  const gameCode = id ? id.split('/')[1] : null;
  const provider = id ? id.split('/')[0]?.toLowerCase() : null;
  const normalizedCode = gameCode?.toLowerCase();
  const isCurated = normalizedCode && localBanners.includes(normalizedCode);
  
  const imgSrc = isCurated 
    ? `/assets/banners/games/${provider}/${normalizedCode}.png`
    : (gameImg ? (gameImg.startsWith('http') ? gameImg : `${API_BASE_URL}/${gameImg}`) : noImgIcon);

  return (
    <div className={`${styles.gameCard} ${styles[variant]}`} onClick={() => navigate(`/play/${id}`)}>
      <img src={imgSrc} className={styles.gameImg} alt={title} loading="lazy" />
      <div className={styles.overlay}>
         <span className={styles.playBtn}>JOGAR</span>
      </div>
    </div>
  );
}
