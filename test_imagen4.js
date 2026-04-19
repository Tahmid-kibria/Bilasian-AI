import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testImagen4() {
    console.log("Testing Imagen 4...");
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_API_KEY}`,
            {
                instances: [{ prompt: "A sleek 3D toy of a banana in a suit" }],
                parameters: { sampleCount: 1 }
            }
        );
        console.log("Imagen 4 Success!");
        if (response.data.predictions && response.data.predictions[0]) {
             console.log("Image Data Found (base64 length):", response.data.predictions[0].bytesBase64Encoded.length);
        } else {
            console.log("No predictions in response", response.data);
        }
    } catch (error) {
        console.error("Imagen 4 Failed:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testImagen4();
