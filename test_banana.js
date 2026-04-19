import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testBananaModel() {
    console.log("Testing Nano Banana Pro Preview...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/nano-banana-pro-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: "A 3D toy of a banana adventurer" }]
                }]
            }
        );
        console.log("Banana Model Success!");
        console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Banana Model Failed:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testBananaModel();
