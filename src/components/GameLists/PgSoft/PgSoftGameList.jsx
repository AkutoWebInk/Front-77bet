import { useMemo } from 'react';
import styles from './PgSoftGameList.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { getProviderIcon } from '../../../api/providers';
import { localBanners } from '../../../api/localBanners';
import PgSoftGameCard from './PgSoftGameCard';

export default function PgSoftGameList({ games = [], loading, limit = 12 }) {
  const providerId = 'PGSOFT';
  const providerName = 'PG SOFT';

  const processedGames = useMemo(() => {
    if (loading || !games.length) return [];
    
    // Filter curated for Home page
    let displayGames = games.filter(game => 
      localBanners.includes(game.game_code?.toLowerCase())
    );

    if (displayGames.length === 0 && games.length > 0) {
      displayGames = games.slice(0, limit);
    }

    // Special PG Soft sorting
    const pgOrder = ["fortune-tiger", "fortune-rabbit", "fortune-ox", "ganesha-gold", "fortune-mouse", "fortune-gods"];
    return [...displayGames].sort((a, b) => {
        const codeA = a.game_code?.toLowerCase();
        const codeB = b.game_code?.toLowerCase();
        const indexA = pgOrder.indexOf(codeA);
        const indexB = pgOrder.indexOf(codeB);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.game_name?.localeCompare(b.game_name);
    });
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
              <PgSoftGameCard loadingSkeleton={true} variant="portrait" />
            </div>
          ))
        ) : (
          processedGames.slice(0, limit).map((game, i) => (
            <div key={i} className={styles.cardWrapper}>
              <PgSoftGameCard 
                  gameImg={game.banner} 
                  title={game.game_name} 
                  id={`${providerId}/${game.game_code}`} 
                  variant="portrait"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
