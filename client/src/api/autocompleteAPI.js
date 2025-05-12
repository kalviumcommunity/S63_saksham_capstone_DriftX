import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchAutocomplete = async (prompt) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/autocomplete`, { prompt });
    return data.suggestion;
  } catch (error) {
    console.error('Autocomplete API error:', error);
    return '';
  }
}; 