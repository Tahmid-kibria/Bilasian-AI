import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testMultimodal() {
    console.log("Testing Gemini 3 Flash Multimodal...");
    // A tiny 1x1 black PNG base64
    const tinyImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [
                        { text: "What is in this image?" },
                        { inline_data: { mime_type: "image/png", data: tinyImage } }
                    ]
                }]
            }
        );
        console.log("Multimodal Success:", response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("Multimodal Failed:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testMultimodal();
