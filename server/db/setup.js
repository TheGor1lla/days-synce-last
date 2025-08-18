import db from './index.js';

async function tableExists(tableName) {
  const result = await db.oneOrNone(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name = $1
    ) AS exists`, [tableName]);
  return result.exists;
}

async function createUsersTable() {
  const usersExists = await tableExists('users');
  if (!usersExists) {
    console.log('Creating "users" table...');
    const query = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        display_name VARCHAR(255) NOT NULL
      );
    `;
    await db.none(query);
    console.log('"users" table created!');
  } else {
    console.log('"users" table already exists.');
  }
}

async function createBoardsTable() {
  const boardsExists = await tableExists('boards');
  if (!boardsExists) {
    console.log('Creating "boards" table...');
    const query = `
      CREATE TABLE boards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        board_config JSON NOT NULL
      );
    `;
    await db.none(query);
    console.log('"boards" table created!');
  } else {
    console.log('"boards" table already exists.');
  }
}

async function createUserBoardPermissionsTable() {
  const permissionsExists = await tableExists('user_board_permissions');
  if (!permissionsExists) {
    console.log('Creating "user_board_permissions" table...');
    const query = `
      CREATE TABLE user_board_permissions (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, board_id)
      );
    `;
    await db.none(query);
    console.log('"user_board_permissions" table created!');
  } else {
    console.log('"user_board_permissions" table already exists.');
  }
}

export async function setupDatabase() {
  await createUsersTable();
  await createBoardsTable();
  await createUserBoardPermissionsTable();
}
