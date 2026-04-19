import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY not found in .env file!")
    exit()

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

print("🤖 Jarvis (Gemini AI) is ready! Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")


    if user_input.lower() in ["exit", "quit"]:
        print("👋 Goodbye!")
        break

    try:
        response = model.generate_content(user_input)
        print("Jarvis:", response.text, "\n")
    except Exception as e:
        print("⚠️ Error:", e, "\n")


