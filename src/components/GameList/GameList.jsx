import styles from './GameList.module.css';
import GameCard from '../GameCard/GameCard';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';

// Icons
import pgsoftIcon from '../../assets/providers/pgsoft.png';
import pragmaticIcon from '../../assets/providers/pragmatic.png';

const PROVIDER_ICONS = {
  'pgsoft': pgsoftIcon,
  'pragmatic': pragmaticIcon,
};

export default function GameList({ title, provider, providerIcon, games = [], maxGames, loading }) {
  
  const icon = providerIcon || PROVIDER_ICONS[provider?.toLowerCase()];
  const route = provider ? `/casino/provider/${provider}` : '';

  if (!loading && (!games || games.length === 0)) return null;

  const displayedGames = maxGames ? games.slice(0, maxGames) : games;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          {icon && <img src={icon} className={styles.producerIcon} alt={provider} />}
          <h2 className={styles.title}>{title || provider}</h2>
        </div>
        
        <NavLink to={route} className={styles.viewAll}>
          Ver Tudo <IoIosArrowForward />
        </NavLink>
      </div>

      <div className={styles.content}>
        {loading ? (
          // Skeleton loader
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.cardWrapper}>
              <GameCard loadingSkeleton={true} />
            </div>
          ))
        ) : (
          displayedGames.map((game, index) => (
            <div key={index} className={styles.cardWrapper}>
              <GameCard 
                  gameImg={game.banner} 
                  title={game.game_name} 
                  id={`${provider}/${game.game_code}`} 
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
