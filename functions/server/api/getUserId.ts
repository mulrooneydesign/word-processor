import { db } from './db';

export async function getUserId() {
  const {
    data: { user },
    error,
  } = await db.auth.getUser();

  if (!error) {
    return user?.id;
  }

  return '';
}
