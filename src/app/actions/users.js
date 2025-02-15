'use server';
import db from '@/app/lib/turso';

export async function getUsers() {
  try {
    const { rows } = await db.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addUser(name, email) {
  try {
    await db.execute({
      sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
      args: [name, email],
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, error: error.message };
  }
}

export async function updateUser(id, name, email) {
  try {
    await db.execute({
      sql: 'UPDATE users SET name = ?, email = ? WHERE id = ?',
      args: [name, email, id],
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update user:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id) {
  try {
    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [id],
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error: error.message };
  }
}
