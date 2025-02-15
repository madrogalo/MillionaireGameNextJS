import db from '@/app/lib/turso';

export async function GET() {
  try {
    const { rows } = await db.execute('SELECT * FROM users');
    return Response.json({ success: true, data: rows });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return Response.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 },
      );
    }

    await db.execute({
      sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
      args: [name, email],
    });

    return Response.json(
      { success: true, message: 'User added successfully.' },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
