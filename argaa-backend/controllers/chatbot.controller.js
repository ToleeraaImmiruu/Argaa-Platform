const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.queryChatbot = async (req, res) => {
    try {
        const { question, language } = req.body;

        if (!question || !language) {
            return res.status(400).json({ message: "Question and language are required." });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // **THE CRITICAL PROMPT ENGINEERING**
        const prompt = `You are a helpful and friendly tourism guide for Oromia, Ethiopia. Your name is Argaa.
        You must answer ONLY in the following language: ${language}.
        Do not use any other language.
        Here is the user's question: "${question}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ message: "Failed to get a response from the AI assistant." });
    }
};