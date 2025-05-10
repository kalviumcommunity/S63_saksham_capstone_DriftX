import axios from 'axios';

export const getAutocomplete = async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful e-commerce search suggestion assistant. Provide concise, relevant product search suggestions.'
          },
          { 
            role: 'user', 
            content: `Given the user input "${prompt}", suggest a relevant product search query. Keep it short and relevant to e-commerce.` 
          }
        ],
        max_tokens: 50,
        temperature: 0.5,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestion = response.data.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error('Autocomplete error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch autocomplete suggestion' });
  }
}; 