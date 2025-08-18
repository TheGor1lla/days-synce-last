import express from 'express';
import cors from 'cors';
import { setupDatabase } from './db/setup.js';
import { createNewBoard, deleteBoard, getAllBoards, getBoard, updateBoardName } from './db/queries.js';

const app = express();
app.use(express.json());
app.use(cors());

setupDatabase().then(() => console.log('Database setup complete'));

const apiPrefix = '/api/v1';
app.use((req, res, next) => {
  console.log('➡️', req.method, req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.send({
    status: 'up',
  });
});

app.get(apiPrefix + '/boards', async (req, res) => {
  const boards = await getAllBoards();
  console.log(`Fetched ${boards.length} boards`);
  res.json(boards);
});

app.get(apiPrefix + '/board/:boardId', async (req, res) => {
  const board = await getBoard(req.params.boardId);
  console.log(board);
  res.json(board);
});

app.get(apiPrefix + '/board/:boardId/metrics', (req, res) => {
  res.send('Beep boop, here are all metrics for board:');
});

app.post(apiPrefix + '/boards/new', async (req, res) => {
  const { name, user_id } = req.body;
  console.log('Received board creation request:', req.body);

  if (!name || !name.trim()) {
    res.status(400).send('Board name is required');
  }

  try {
    const board = await createNewBoard(name);
    res.status(201).json(board);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).send('Error creating board');
  }
});

app.delete(apiPrefix + '/board/:boardId', async (req, res) => {
  const { boardId } = req.params;

  try {
    const deletedBoard = await deleteBoard(boardId);
    console.log(`Deleted board ${boardId}`);

    res.status(200).json({
      message: 'Board deleted successfully',
      board: deletedBoard,
    });
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({
      message: 'Error deleting board',
    });
  }
});

app.put(apiPrefix + '/board/:boardId', async (req, res) => {
  const { boardId } = req.params; // Get the boardId from URL params
  const { newBoardName } = req.body; // Get the new board name from the request body
  await updateBoardName(boardId, newBoardName);
});


app.listen(process.env.PORT || 3000);
