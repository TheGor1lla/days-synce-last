import db from './index.js';

export async function createNewBoard(name, board_config = {}) {
  const query = `
    INSERT INTO boards (name, board_config) 
    VALUES ($1, $2) 
    RETURNING id, name;
  `;

  try {
    const result = await db.one(query, [name, JSON.stringify(board_config)]);
    console.log('New board created:', result);
    return result;
  } catch (err) {
    console.error('Error creating new board:', err);
    throw err;
  }
}

export async function grantUserPermission(user_id, board_id) {
  return await db
    .one('INSERT INTO user_board_permissions(user_id, board_id) VALUES($1, $2) RETURNING user_id', [user_id, board_id])
    .then((data) => {
      console.log('Granted permission to user_id "%s" for board "%s"', user_id, board_id);
      return data.user_id;
    })
    .catch((error) => {
      console.error('Error granting permission: ', error);
    });
}

export async function getAllBoards() {
  return await db.any('SELECT * FROM boards');
}

export async function getBoard(boardId) {
  return db.oneOrNone('SELECT * FROM boards WHERE id = $1', [boardId]);
}

export async function deleteBoard(boardId) {
  const result = await db.query('DELETE FROM boards WHERE id = $1 RETURNING *', [boardId]);
  return result.rows;
}

export async function updateBoardName(boardId, newBoardName) {
  return db.oneOrNone('UPDATE boards SET name = $2 WHERE id = $1*', [boardId, newBoardName]);
};
