import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testFlashImage() {
    console.log("Testing Gemini 3.1 Flash Image...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: "Generate a simple icon of a banana" }]
                }]
            }
        );
        console.log("Flash Image Success!");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Flash Image Failed:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testFlashImage();
