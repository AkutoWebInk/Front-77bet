import { API_PATH } from "../api";

// API
export async function requestLogin(data) {
  try {
    const response = await fetch(`${API_PATH}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(()=>null)
      return {error: error?.detail || "Login Failed"};

    }

    return await response.json();

  } catch(err) {
    console.error(err)
    return null;
  }
}
  