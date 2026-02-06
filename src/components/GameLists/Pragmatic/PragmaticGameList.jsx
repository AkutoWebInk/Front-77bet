import { useMemo } from 'react';
import styles from './PragmaticGameList.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { getProviderIcon } from '../../../api/providers';
import { localBanners } from '../../../api/localBanners';
import PragmaticGameCard from './PragmaticGameCard';

export default function PragmaticGameList({ games = [], loading, limit = 12 }) {
  const providerId = 'PRAGMATIC';
  const providerName = 'PRAGMATIC PLAY';

  const processedGames = useMemo(() => {
    if (loading || !games.length) return [];
    
    // Filter curated
    let displayGames = games.filter(game => 
      localBanners.includes(game.game_code?.toLowerCase())
    );

    if (displayGames.length === 0 && games.length > 0) {
      displayGames = games.slice(0, limit);
    }

    return [...displayGames].sort((a, b) => a.game_name?.localeCompare(b.game_name));
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
              <PragmaticGameCard loadingSkeleton={true} variant="portrait" />
            </div>
          ))
        ) : (
          processedGames.slice(0, limit).map((game, i) => (
            <div key={i} className={styles.cardWrapper}>
              <PragmaticGameCard 
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
