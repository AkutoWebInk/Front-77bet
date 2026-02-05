import { API_PATH2 } from "../api";

export async function getTransactionsHistory(userId) {
    try {
        const response = await fetch(`${API_PATH2}/transactions/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: userId })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch transaction history');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return null;
    }
}
