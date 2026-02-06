import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../../api/services/games';
import { useAuth } from '../../context/AuthProvider';
import styles from './Play.module.css';
import { IoIosArrowBack } from "react-icons/io";

export default function Play() {
    const params = useParams();
    const id = params['*']; // Get everything after /play/
    const navigate = useNavigate();
    const { user } = useAuth();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUrl = async () => {
            if (!id) return;
            setLoading(true);
            
            // Check if it's an external game (e.g., "PGSOFT/medusa")
            if (id.includes('/')) {
                const parts = id.split('/');
                const provider = parts[0];
                const gameCode = parts.slice(1).join('/'); // In case game_code has slashes
                
                if (user) {
                    const response = await gameService.launchGame(user.id, provider, gameCode);
                    if (response.status === 'success') {
                        setUrl(response.launch_url);
                    } else {
                        console.error("Launch error:", response.message);
                    }
                }
            } else {
                // Local game logic
                const localUrl = gameService.getGameUrl(id);
                setUrl(localUrl);
            }
            
            setLoading(false);
        };
        
        if (user) {
            getUrl();
        }
    }, [id, user]);

    if (!user) return <div className={styles.error}>Você precisa estar logado para jogar.</div>;
    if (loading) return <div className={styles.loading}>Carregando jogo...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    <IoIosArrowBack />
                </button>
                <h1 className={styles.title}>
                    {id.split('/').pop().replace(/-/g, " ").replace(/_/g, " ")}
                </h1>
            </div>
            <div className={styles.gameWrapper}>
                {url ? (
                    <iframe 
                        key={url}
                        src={url} 
                        title={id}
                        className={styles.iframe}
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; fullscreen; dpr; camera; microphone; clipboard-read; clipboard-write; encrypted-media; gyroscope; accelerometer; midi;"
                        loading="eager"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className={styles.error}>Erro ao carregar o jogo. Tente novamente mais tarde.</div>
                )}
            </div>
        </div>
    );
}
