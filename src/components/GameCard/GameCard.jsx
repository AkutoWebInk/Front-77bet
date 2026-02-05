import { useState } from 'react';
import styles from './GameCard.module.css';
import noImgIcon from './assets/white.png'
import { useNavigate } from 'react-router-dom';
import { API_PATH_GAMES } from '../../api/api';
import { localBanners } from '../../api/localBanners';

export default function GameCard({ gameImg, title = "Game Title", id, variant = "portrait", loadingSkeleton }) {
  const navigate = useNavigate();

  if (loadingSkeleton) {
    return (
      <section className={`${styles.gameCard} ${styles[variant]} ${styles.skeleton}`}></section>
    );
  }

  const gameCode = id ? id.split('/')[1] : null;
  const provider = id ? id.split('/')[0]?.toLowerCase() : null;
  const normalizedCode = gameCode?.toLowerCase();
  
  // Check if we have a local banner for this game
  const isCurated = normalizedCode && localBanners.includes(normalizedCode);
  
  let imgSrc;
  if (isCurated) {
      imgSrc = `/banners/games/${provider}/${normalizedCode}.png`;
  } else {
      imgSrc = gameImg 
        ? (gameImg.startsWith('http') ? gameImg : `${API_PATH_GAMES}/${gameImg}`) 
        : noImgIcon;
  }

  const handlePlay = () => {
    if (id) {
      navigate(`/play/${id}`);
    }
  };

  // Combine classes based on variant and whether it's curated
  const cardClass = `${styles.gameCard} ${styles[variant]} ${isCurated ? styles.curated : ''}`;
  const imgClass = `${styles.gameImg} ${isCurated ? styles.curatedImg : styles.providerImg}`;

  return (
    <section className={cardClass} onClick={handlePlay}>
      <img 
        src={imgSrc} 
        className={imgClass} 
        alt={title} 
        loading="lazy" 
      />
      <div className={styles.overlay}>
         <span className={styles.playBtn}>PLAY</span>
      </div>
    </section>
  );
}
