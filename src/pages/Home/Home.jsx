import React, { useState, useEffect, useMemo } from 'react';
import styles from './Home.module.css';
// Components
import PageGameCard from '../../components/PageGameCard/PageGameCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel'; 
import Swiper from '../../components/Swiper/Swiper';
import PragmaticGameList from '../../components/GameLists/Pragmatic/PragmaticGameList';
import PgSoftGameList from '../../components/GameLists/PgSoft/PgSoftGameList';
import HabaneroGameList from '../../components/GameLists/Habanero/HabaneroGameList';
import BooongoGameList from '../../components/GameLists/Booongo/BooongoGameList';
import EvoplayGameList from '../../components/GameLists/Evoplay/EvoplayGameList';
import DreamtechGameList from '../../components/GameLists/Dreamtech/DreamtechGameList';
import OtherGamesList from '../../components/GameLists/Other/OtherGamesList';

// Assets
import { gameService } from '../../api/services/games';
import { localBanners } from '../../api/localBanners';
import { promoList } from '../../api/promoList';
import { providers } from '../../api/providers';

export default function Home() {
  const [gamesByProvider, setGamesByProvider] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Try to get from sessionStorage first
      const cached = sessionStorage.getItem('home_games_cache_v2');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Cache valid for 30 minutes
        if (Date.now() - timestamp < 30 * 60 * 1000) {
          setGamesByProvider(data);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        // Fetch games for providers
        const results = await Promise.all(
          providers.map(p => gameService.listGames(p.id))
        );

        const newGamesState = {};
        providers.forEach((p, index) => {
          newGamesState[p.id] = results[index] || [];
        });

        setGamesByProvider(newGamesState);
        
        sessionStorage.setItem('home_games_cache_v2', JSON.stringify({
          data: newGamesState,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allGames = useMemo(() => {
    const all = [];
    Object.entries(gamesByProvider).forEach(([providerId, games]) => {
      games.forEach(g => {
        all.push({ ...g, provider: providerId });
      });
    });
    return all;
  }, [gamesByProvider]);

  const filteredGames = useMemo(() => {
    if (!searchTerm) return null;
    const term = searchTerm.toLowerCase();
    return allGames.filter(g => 
      g.game_name?.toLowerCase().includes(term) || 
      g.provider?.toLowerCase().includes(term)
    );
  }, [allGames, searchTerm]);

  const providerShortcuts = useMemo(() => {
    return providers.map(p => ({
      name: p.name,
      img: p.icon,
      code: p.id
    }));
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
                        <PageGameCard 
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
            <PgSoftGameList games={gamesByProvider['PGSOFT']} loading={loading} />
            <PragmaticGameList games={gamesByProvider['PRAGMATIC']} loading={loading} />
            <HabaneroGameList games={gamesByProvider['HABANERO']} loading={loading} />
            <BooongoGameList games={gamesByProvider['BOOONGO']} loading={loading} />
            <EvoplayGameList games={gamesByProvider['EVOPLAY']} loading={loading} />
            <DreamtechGameList games={gamesByProvider['DREAMTECH']} loading={loading} />
            
            {/* Fallback for any other providers not explicitly defined above */}
            {providers.slice(6).map(p => (
              <OtherGamesList 
                key={p.id}
                provider={p.id}
                providerName={p.name}
                games={gamesByProvider[p.id] || []}
                loading={loading}
                variant={p.variant}
              />
            ))}
          </>
        )}
      </section>

    </section>
  );
}