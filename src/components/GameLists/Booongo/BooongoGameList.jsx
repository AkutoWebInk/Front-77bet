import { useMemo } from 'react';
import styles from './BooongoGameList.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { getProviderIcon } from '../../../api/providers';
import BooongoGameCard from './BooongoGameCard';

export default function BooongoGameList({ games = [], loading, limit = 12 }) {
  const providerId = 'BOOONGO';
  const providerName = 'BOOONGO';

  const processedGames = useMemo(() => {
    if (loading || !games.length) return [];
    return games.slice(0, limit);
  }, [games, loading, limit]);

  if (!loading && games.length === 0) return null;

  const icon = getProviderIcon(providerId);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          {icon && <img src={icon} className={styles.producerIcon} alt={providerId} />}
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
              <BooongoGameCard loadingSkeleton={true} variant="square" />
            </div>
          ))
        ) : (
          processedGames.map((game, i) => (
            <div key={i} className={styles.cardWrapper}>
              <BooongoGameCard 
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
