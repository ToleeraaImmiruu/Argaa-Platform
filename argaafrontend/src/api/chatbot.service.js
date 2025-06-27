import axios from 'axios';

const apiClient = axios.create({ baseURL: 'http://localhost:3000/api/chatbot' });

const getChatReply = async (question, language) => {
    try {
        const response = await apiClient.post('/query', { question, language });
        return response.data.reply;
    } catch (error) {
        throw error.response?.data || "Sorry, I'm having trouble connecting right now.";
    }
};

export default { getChatReply };