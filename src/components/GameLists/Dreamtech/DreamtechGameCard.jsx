import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DreamtechGameCard.module.css';
import noImgIcon from '../../../assets/images/white.png';
import { API_BASE_URL } from '../../../api/api';

export default function DreamtechGameCard({ gameImg, title, id, variant = "square", loadingSkeleton }) {
  const navigate = useNavigate();

  if (loadingSkeleton) {
    return <div className={`${styles.gameCard} ${styles[variant]} ${styles.skeleton}`}></div>;
  }

  const imgSrc = gameImg ? (gameImg.startsWith('http') ? gameImg : `${API_BASE_URL}/${gameImg}`) : noImgIcon;

  return (
    <div className={`${styles.gameCard} ${styles[variant]}`} onClick={() => navigate(`/play/${id}`)}>
      <img src={imgSrc} className={styles.gameImg} alt={title} loading="lazy" />
      <div className={styles.overlay}>
         <span className={styles.playBtn}>PLAY</span>
      </div>
    </div>
  );
}
