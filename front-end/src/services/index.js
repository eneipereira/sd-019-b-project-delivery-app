import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createUser = async (payload = {}) => {
  try {
    const { data: token } = await api.post('/register', { ...payload });
    return token;
  } catch ({ response }) {
    return response;
  }
};

export default api;
