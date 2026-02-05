import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProviderGames.module.css';
import { gameService } from '../../api/services/games';
import GameCard from '../../components/GameCard/GameCard';
import { IoIosArrowBack } from "react-icons/io";
import { localBanners } from '../../api/localBanners';

// Icons
import pgsoftIcon from '../../assets/providers/pgsoft.png';
import pragmaticIcon from '../../assets/providers/pragmatic.png';

const PROVIDER_ICONS = {
  'pgsoft': pgsoftIcon,
  'pragmatic': pragmaticIcon,
};

export default function ProviderGames() {
    const { providerCode } = useParams();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const icon = PROVIDER_ICONS[providerCode?.toLowerCase()];

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchGames = async () => {
            if (!providerCode) return;
            setLoading(true);
            try {
                // Fetch games specifically for this provider from our backend
                const providerGames = await gameService.listGames(providerCode);
                let filtered = Array.isArray(providerGames) ? providerGames : [];
                
                // If it's PGSOFT, only show curated games
                if (providerCode?.toLowerCase() === 'pgsoft') {
                    filtered = filtered.filter(g => localBanners.includes(g.game_code?.toLowerCase()));
                }
                
                setGames(filtered);
            } catch (error) {
                console.error("Failed to load provider games", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, [providerCode]);

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    <IoIosArrowBack />
                </button>
                <div className={styles.titleSection}>
                    {icon && <img src={icon} className={styles.providerIcon} alt={providerCode} />}
                    <h1 className={styles.title}>{providerCode}</h1>
                </div>
            </div>

            {loading ? (
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={styles.cardWrapper}>
                            <GameCard loadingSkeleton={true} variant="landscape" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.grid}>
                    {games.length > 0 ? (
                        games.map((game, i) => (
                            <div key={i} className={styles.cardWrapper}>
                                <GameCard 
                                    gameImg={game.banner} 
                                    title={game.game_name} 
                                    id={`${providerCode}/${game.game_code}`} 
                                    variant="landscape"
                                />
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <p>Nenhum jogo encontrado para este provedor.</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
