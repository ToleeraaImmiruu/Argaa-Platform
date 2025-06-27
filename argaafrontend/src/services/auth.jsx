// src/services/auth.js
const API_BASE = 'http://localhost:3000/api/v1/auth';  // Change if your backend is at a different URL

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return response.json();  // Expected: { user, token }
}

export async function signup(firstName, lastName, email, password) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }
  return response.json(); // Expected: { user, token }
}
