// src/lib/resetTokenStore.ts
// This file is NOT a Route Handler

// Using Map for in-memory storage.
// IMPORTANT: This storage is temporary and resets whenever your server restarts.
// For a production application, use a database or a dedicated caching service (like Redis).
export const resetTokens = new Map<string, string>();

// You might also add helper functions here to manage the map
// export function setToken(token: string, email: string) {
//   resetTokens.set(token, email);
// }
//
// export function getToken(token: string): string | undefined {
//   return resetTokens.get(token);
// }
//
// export function deleteToken(token: string) {
//   resetTokens.delete(token);
// }