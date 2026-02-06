import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Provider.module.css';
import { gameService } from '../../api/services/games';
import PageGameCard from '../../components/PageGameCard/PageGameCard';
import { IoIosArrowBack } from "react-icons/io";
import { getProviderIcon, getProviderName } from '../../api/providers';

export default function Provider() {
    const { provider } = useParams();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const icon = getProviderIcon(provider);
    const providerName = getProviderName(provider);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchGames = async () => {
            if (!provider) return;
            setLoading(true);
            try {
                // Fetch games specifically for this provider from our backend
                const providerGames = await gameService.listGames(provider);
                const filtered = Array.isArray(providerGames) ? providerGames : [];
                
                setGames(filtered);
            } catch (error) {
                console.error("Failed to load provider games", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, [provider]);

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    <IoIosArrowBack />
                </button>
                <div className={styles.titleSection}>
                    {icon && <img src={icon} className={styles.providerIcon} alt={provider} />}
                    <h1 className={styles.title}>{providerName}</h1>
                </div>
            </div>

            {loading ? (
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <PageGameCard key={i} loadingSkeleton={true} variant="provider" />
                    ))}
                </div>
            ) : (
                <div className={styles.grid}>
                    {games.length > 0 ? (
                        games.map((game, i) => (
                            <PageGameCard 
                                key={i}
                                gameImg={game.banner} 
                                title={game.game_name} 
                                id={`${provider}/${game.game_code}`} 
                                variant="provider"
                                forceProviderBanner={true}
                            />
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
