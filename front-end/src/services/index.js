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

export const createSale = async (payload = {}, token) => {
  try {
    const { data: sale } = await api.post('/sales', { ...payload }, {
      headers: {
        authorization: token,
      },
    });
    return sale;
  } catch ({ response }) {
    return response;
  }
};

export default api;
