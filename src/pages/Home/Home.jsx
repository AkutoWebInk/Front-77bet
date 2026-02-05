import React, { useState, useEffect, useMemo } from 'react';
import styles from './Home.module.css';
// Components
import GameList from '../../components/GameList/GameList';
import SearchBar from '../../components/SearchBar/SearchBar';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel'; 
import Swiper from '../../components/Swiper/Swiper';
import GameCard from '../../components/GameCard/GameCard';

// Assets
import { gameService } from '../../api/services/games';
import { localBanners } from '../../api/localBanners';
import { promoList } from '../../api/promoList';

// Icons for Swiper
import pgsoftIcon from '../../assets/providers/pgsoft.png';
import pragmaticIcon from '../../assets/providers/pragmatic.png';

export default function Home() {
  const [pgGames, setPgGames] = useState([]);
  const [pragmaticGames, setPragmaticGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pgList, prList] = await Promise.all([
          gameService.listGames("PGSOFT"),
          gameService.listGames("PRAGMATIC")
        ]);

        // Strictly show only curated games on Home for both providers
        const curatedPg = (Array.isArray(pgList) ? pgList : []).filter(game => 
          localBanners.includes(game.game_code?.toLowerCase())
        );

        const curatedPr = (Array.isArray(prList) ? prList : []).filter(game => 
          localBanners.includes(game.game_code?.toLowerCase())
        );

        // Sort PGSOFT: Tiger, Rabbit, Ox, Ganesha, then others
        const pgOrder = ["fortune-tiger", "fortune-rabbit", "fortune-ox", "ganesha-gold"];
        const sortedPg = curatedPg.sort((a, b) => {
          const indexA = pgOrder.indexOf(a.game_code?.toLowerCase());
          const indexB = pgOrder.indexOf(b.game_code?.toLowerCase());
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return a.game_name?.localeCompare(b.game_name);
        });

        setPgGames(sortedPg);
        setPragmaticGames(curatedPr.sort((a, b) => a.game_name?.localeCompare(b.game_name)));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allGames = useMemo(() => {
    const pg = pgGames.map(g => ({ ...g, provider: 'PGSOFT' }));
    const pr = pragmaticGames.map(g => ({ ...g, provider: 'PRAGMATIC' }));
    return [...pg, ...pr];
  }, [pgGames, pragmaticGames]);

  const filteredGames = useMemo(() => {
    if (!searchTerm) return null;
    const term = searchTerm.toLowerCase();
    return allGames.filter(g => 
      g.game_name?.toLowerCase().includes(term) || 
      g.provider?.toLowerCase().includes(term)
    );
  }, [allGames, searchTerm]);

  const providerShortcuts = useMemo(() => {
    return [
      { name: 'PG SOFT', img: pgsoftIcon, code: 'PGSOFT' },
      { name: 'PRAGMATIC', img: pragmaticIcon, code: 'PRAGMATIC' },
    ];
  }, []);

  return (
    <section className={styles.mainContainer}>
      <section className={styles.headerContent}>  
        <div className={styles.carouselSection}>
          <PromoCarousel promoList={promoList}/>
        </div>
        <div className={styles.searchWrapper}>
          <SearchBar 
            placeholder='Encontre seu jogo ou provedor...' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!searchTerm && <Swiper shortcuts={providerShortcuts} />}
      </section>

      <section className={styles.gamesSection}>
        {searchTerm ? (
           <div className={styles.searchResults}>
             <h2 className={styles.sectionTitle}>Resultados da busca</h2>
             <div className={styles.gamesGrid}>
                {filteredGames.length > 0 ? (
                    filteredGames.map((game, i) => (
                        <GameCard 
                          key={i} 
                          gameImg={game.banner} 
                          title={game.game_name} 
                          id={`${game.provider}/${game.game_code}`}
                          variant="square"
                        />
                    ))
                ) : (
                    <p>Nenhum jogo encontrado.</p>
                )}
             </div>
           </div>
        ) : (
          <>
            <GameList 
                provider="PGSOFT" 
                title="PG Soft Slots" 
                games={pgGames} 
                maxGames={12}
                loading={loading}
            />
            <GameList 
                provider="PRAGMATIC" 
                title="Pragmatic Play" 
                games={pragmaticGames} 
                maxGames={12}
                loading={loading}
            />
          </>
        )}
      </section>

    </section>
  );
}