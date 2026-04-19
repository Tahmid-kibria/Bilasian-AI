import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.static("public"));

// Keep track of request count for "Rare" image logic
let requestCount = 0;
let lastImage = null;

// Endpoint for mock real-time synthesis
app.post("/api/generate", async (req, res) => {
    try {
        requestCount++;
        console.log(`Synthesis Request #${requestCount} received.`);

        // Step 1: Simulate the "Analysis" and "Synthesis" delay (4-8 seconds)
        const delay = 4000 + Math.random() * 4000;
        console.log(`Simulating CPU-intensive synthesis for ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Step 2: Get list of images in the results folder
        const mode = req.body.mode || "noir";
        let folderName;
        if (mode === "banana") folderName = "results_RBM_X";
        else if (mode === "n") folderName = "results_RBM_N";
        else folderName = "results_RBM_A";
        const resultsDir = path.join(process.cwd(), "public", folderName);
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        let files = fs.readdirSync(resultsDir).filter(file => 
            [".png", ".jpg", ".jpeg", ".webp"].includes(path.extname(file).toLowerCase())
        );

        if (files.length === 0) {
            throw new Error(`No synthesis results found in /public/${folderName} folder. Please upload some images!`);
        }

        // Step 10: "Rare" logic - if a file has 'rare' in name, only show every 10+ times
        let selectedFile;
        const rareFiles = files.filter(f => f.toLowerCase().includes('rare'));
        const commonFiles = files.filter(f => !f.toLowerCase().includes('rare'));

        if (rareFiles.length > 0 && requestCount % 10 === 0) {
            selectedFile = rareFiles[Math.floor(Math.random() * rareFiles.length)];
            console.log("CRITICAL HIT: Rare synthesis result selected!");
        } else {
            // Avoid immediate repeats if we have enough common files
            const pool = commonFiles.length > 1 ? commonFiles.filter(f => f !== lastImage) : commonFiles;
            selectedFile = pool[Math.floor(Math.random() * pool.length)];
        }

        lastImage = selectedFile;
        console.log(`Returning synthesis result: ${selectedFile}`);

        // Step 3: Read and return the file
        const filePath = path.join(resultsDir, selectedFile);
        const imageBuffer = fs.readFileSync(filePath);
        const base64Image = imageBuffer.toString("base64");

        res.json({ 
            image: base64Image,
            filename: selectedFile,
            isRare: selectedFile.toLowerCase().includes('rare')
        });

    } catch (error) {
        console.error("Mock System Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));