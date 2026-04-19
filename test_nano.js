import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testNanoBanana() {
    console.log("Testing Nano Banana...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/nano-banana-pro-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: "What are you?" }]
                }]
            }
        );
        console.log("Nano Banana Success:", response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("Nano Banana Failed:", error.response?.data || error.message);
    }
}

testNanoBanana();
