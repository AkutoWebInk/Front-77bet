import { useMemo } from 'react';
import styles from './OtherGamesList.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { getProviderIcon } from '../../../api/providers';
import OtherGameCard from './OtherGameCard';

export default function OtherGamesList({ 
  provider, 
  providerName, 
  games = [], 
  loading, 
  limit = 12,
  variant = "square" 
}) {
  const processedGames = useMemo(() => {
    if (loading || !games.length) return [];
    return games.slice(0, limit);
  }, [games, loading, limit]);

  if (!loading && games.length === 0) return null;

  const icon = getProviderIcon(provider);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          {icon && <img src={icon} className={styles.producerIcon} alt={provider} />}
          <h2 className={styles.title}>{providerName || provider}</h2>
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.cardWrapper}>
              <OtherGameCard loadingSkeleton={true} variant={variant} />
            </div>
          ))
        ) : (
          processedGames.map((game, i) => (
            <div key={i} className={styles.cardWrapper}>
              <OtherGameCard 
                  gameImg={game.banner} 
                  title={game.game_name} 
                  id={`${provider}/${game.game_code}`} 
                  variant={variant}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
