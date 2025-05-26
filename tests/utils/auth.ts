import { APIRequestContext } from '@playwright/test';

export async function apiLogin(request: APIRequestContext, email: string, password: string) {
  const response = await request.post('/api/auth/login', {
    data: { email, password },
  });
  return response.ok();
}