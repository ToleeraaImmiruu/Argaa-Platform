import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import chatbotService from '../api/chatbot.service';

const Chatbot = ({ closeChat }) => {
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! I am Argaa, your personal tour guide. How can I help you today?' }]);
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('English');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const reply = await chatbotService.getChatReply(input, language);
            const botMessage = { sender: 'bot', text: reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: error.toString() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-5 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-2xl">
                <div>
                    <h3 className="font-bold">Argaa Assistant</h3>
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-transparent text-xs outline-none border-none focus:ring-0">
                        <option className="text-black" value="English">English</option>
                        <option className="text-black" value="Amharic">Amharic</option>
                        <option className="text-black" value="Oromoo">Oromoo</option>
                    </select>
                </div>
                <button onClick={closeChat}><XMarkIcon className="h-6 w-6" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && <div className="flex justify-start"><div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">...</div></div>}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex items-center bg-gray-100 rounded-full">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..."
                        className="w-full bg-transparent px-4 py-2 focus:outline-none" />
                    <button type="submit" className="p-2 text-blue-600"><PaperAirplaneIcon className="h-6 w-6" /></button>
                </div>
            </form>
        </motion.div>
    );
};

export default Chatbot;