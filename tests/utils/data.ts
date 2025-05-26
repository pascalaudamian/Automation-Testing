export function randomEmail() {
  return `user_${Math.floor(Math.random() * 10000)}@test.com`;
}

export function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}