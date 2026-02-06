import { API_BASE_URL } from "../api";

export async function requestLogin(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { error: error?.detail || "Login Failed" };
    }

    return await response.json();
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Network error" };
  }
}

export async function requestRegister(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { error: error?.detail || "Registration Failed" };
    }

    return await response.json();
  } catch (err) {
    console.error("Register Error:", err);
    return { error: "Network error" };
  }
}

export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Fetch Profile Error:", err);
    return null;
  }
}

export async function requestLogout() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  } catch (err) {
    console.error("Logout Error:", err);
    return null;
  }
}
