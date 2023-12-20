import { compare, hash } from 'bcryptjs';

export class UtilsService {
  excludeFields<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    fields: K[],
  ): Omit<T, K> {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !fields.includes(key as K)),
    ) as Omit<T, K>;
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
