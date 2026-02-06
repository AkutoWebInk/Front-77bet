import { API_BASE_URL } from "../api";

export async function requestDeposit(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { error: error?.detail || "Deposit Failed" };
    }

    return await response.json();
  } catch (err) {
    console.error("Deposit Error:", err);
    return { error: "Network error" };
  }
}

export async function requestWithdrawal(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { error: error?.detail || "Withdrawal Failed" };
    }

    return await response.json();
  } catch (err) {
    console.error("Withdrawal Error:", err);
    return { error: "Network error" };
  }
}

export async function getTransactionsHistory(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: userId })
    });

    if (!response.ok) throw new Error('Failed to fetch history');
    return await response.json();
  } catch (err) {
    console.error("History Error:", err);
    return { status: 500, data: [] };
  }
}
