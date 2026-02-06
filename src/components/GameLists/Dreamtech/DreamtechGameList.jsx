import { useMemo } from 'react';
import styles from './DreamtechGameList.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import DreamtechGameCard from './DreamtechGameCard';

export default function DreamtechGameList({ games = [], loading, limit = 12 }) {
  const providerId = 'DREAMTECH';
  const providerName = 'DREAMTECH';

  const processedGames = useMemo(() => {
    if (loading || !games.length) return [];
    return games.slice(0, limit);
  }, [games, loading, limit]);

  if (!loading && games.length === 0) return null;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2 className={styles.title}>{providerName}</h2>
        </div>
        <NavLink to={`/provider/${providerId}`} className={styles.viewAll}>
          Ver mais <IoIosArrowForward />
        </NavLink>
      </div>

      <div className={styles.content}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.cardWrapper}>
              <DreamtechGameCard loadingSkeleton={true} variant="square" />
            </div>
          ))
        ) : (
          processedGames.map((game, i) => (
            <div key={i} className={styles.cardWrapper}>
              <DreamtechGameCard 
                  gameImg={game.banner} 
                  title={game.game_name} 
                  id={`${providerId}/${game.game_code}`} 
                  variant="square"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
