import type { User } from '@repo/database';

type APIResponse =
  | { statusCode: number; message: string; data?: unknown }
  | { statusCode: number; message: string; errors: Record<string, string[]> };

export async function getProfile(): Promise<Omit<User, 'password'>> {
  try {
    const response = await fetch('/api/auth/profile');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function login(email: string, password: string): Promise<APIResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function logout(): Promise<APIResponse> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: 'TEACHER' | 'STUDENT',
): Promise<APIResponse> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    throw error;
  }
}
