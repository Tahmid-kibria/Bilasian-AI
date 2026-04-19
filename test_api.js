import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
    console.log("Testing Gemini 3 Flash Preview...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: "Describe a person in one sentence." }]
                }]
            }
        );
        console.log("Gemini Success:", response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("Gemini Failed:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

async function testImagen() {
    console.log("\nTesting Imagen 4.0...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_API_KEY}`,
            {
                instances: [{ prompt: "A sleek 3D toy of a banana" }],
                parameters: { sampleCount: 1 }
            }
        );
        console.log("Imagen Success:", response.data.predictions[0].bytesBase64Encoded.substring(0, 50) + "...");
    } catch (error) {
        console.error("Imagen Failed (Likely Plan Restriction):", error.response?.data?.error?.message || error.message);
    }
}

async function run() {
    await testGemini();
    await testImagen();
}

run();
