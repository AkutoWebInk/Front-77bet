import { API_BASE_URL } from "../api";

export const gameService = {
    listGames: async (providerCode = "PGSOFT") => {
        try {
            const response = await fetch(`${API_BASE_URL}/games/list?provider_code=${providerCode}`);
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
            const response = await fetch(`${API_BASE_URL}/games/launch`, {
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
    getGameUrl: (id) => {
        // This is for local games. If needed, implement mapping here.
        console.warn(`Local game URL requested for ${id}, but no local mapping exists.`);
        return null;
    }
};
