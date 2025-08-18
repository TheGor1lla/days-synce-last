import apiClient from '@/services/api.js';

const apiEndpoint = '/api/v1';

export async function getAllBoards() {
  try {
    return await apiClient.get(`${apiEndpoint}/boards`);
  } catch (error) {
    console.log('Failed to fetch boards: ', error.message);
  }
}

export async function getBoard(boardId) {
  apiClient.get(`${apiEndpoint}/board/${boardId}`);
  return apiClient.get(`${apiEndpoint}/board/${boardId}`);
}

export async function createBoard(boardData) {
  try {
    const result = await apiClient.post(`${apiEndpoint}/boards/new`, boardData);

    if (result.status === 201) {
      const createdBoard = result.data;
      console.log('Board created successfully:', createdBoard);
      return createdBoard;
    } else {
      const errorData = result.status;
      console.log('Failed to create board:', errorData.message);
      return { error: true, message: errorData.message };
    }
  } catch (error) {
    console.error('Error creating board:', error);
    return { error: true, message: error.message };
  }
}

export const deleteBoard = (boardId) => {
  return apiClient.delete(`${apiEndpoint}/board/${boardId}`);
}

export const putNewBoardName = (boardId, newBoardName) => {
  return apiClient.put(`${apiEndpoint}/board/${boardId}`, { newBoardName });
}
