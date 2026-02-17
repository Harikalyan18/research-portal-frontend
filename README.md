# Research Portal: Earnings Call Analyzer

A minimal research tool that extracts structured insights from earnings call transcripts using AI (Google Gemini 2.0 Flash).

## Features

- Upload PDF or TXT earnings call transcripts
- Automatic text extraction 
- AI‑powered analysis of:
  - Management tone & sentiment (with supporting quotes)
  - Key positives and concerns
  - Forward guidance (revenue, margin, capex)
  - Capacity utilization
  - Growth initiatives
- Clean, analyst‑ready structured output
- Download results as JSON

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Multer, pdf2json, Google Generative AI,Open-Router  
**Frontend:** React, Axios 
**Deployment:** Render (backend), Vercel (frontend), MongoDB Atlas (database)

## Installation

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Google AI Studio API key (free)
- openRouter API key 


### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Gemini API key
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with REACT_APP_API_URL (default: http://localhost:5000/api)
npm start
```

## 🌐 API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | /api/documents/upload        | Upload a PDF/TXT file                |
| POST   | /api/documents/:id/analyze   | Trigger AI analysis                  |
| GET    | /api/documents/:id           | Retrieve document + analysis         |

## 🧠 AI Prompt Design

The system uses a carefully engineered prompt that:
- **Forbids hallucination** – only explicitly stated information
- **Requires null** for missing data
- **Demands direct quotes** for sentiment evidence
- **Low temperature (0.1)** for deterministic output

## ⚠️ Limitations (Free Tier)

- File size: 20 MB max (Render free tier).
- Long transcripts >1M tokens are truncated (Gemini)
- No authentication (public access) (Gemini)
- PDF text extraction: Only works with text‑based PDFs (not scanned images).
- Truncation: Very long transcripts (>100k characters) are truncated to fit model    context.
- Cold start: Render may spin down after inactivity; first request may take extra seconds.
- Rate limits: OpenRouter free tier has per‑minute limits; fallback models are used.

