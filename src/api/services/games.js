import { API_PATH_GAMES } from "../api";

export const gameService = {
    listGames: async (providerCode = "PGSOFT") => {
        try {
            const response = await fetch(`${API_PATH_GAMES}/games/list?provider_code=${providerCode}`);
            if (!response.ok) throw new Error('Failed to fetch games');
            const data = await response.json();
            return data.games || [];
        } catch (error) {
            console.error("Error listing games:", error);
            return [];
        }
    },
    launchGame: async (userCode, providerCode, gameCode, gameType = "slot") => {
        try {
            const response = await fetch(`${API_PATH_GAMES}/games/launch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_code: userCode,
                    provider_code: providerCode,
                    game_code: gameCode,
                    game_type: gameType
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error launching game:", error);
            return { status: "error", message: error.message };
        }
    },
    getGameUrl: (gameId) => {
        // ... (keeping old one for compatibility if needed, but we will use launchGame)
        const token = localStorage.getItem('token');
        return `${API_PATH_GAMES}/games/play/${gameId}/index.html?token=${token}`;
    }
};
