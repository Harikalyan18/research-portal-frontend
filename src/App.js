import { useState } from 'react'
import FileUpload from './components/FileUpload'
import AnalysisResults from './components/AnalysisResults'
import { documentAPI } from './services/api'
import './App.css'

function App() {
  const [currentDocumentId, setCurrentDocumentId] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  const handleUploadComplete = async (uploadData) => {
    setCurrentDocumentId(uploadData.documentId)
    setAnalysis(null)
    setError(null)
    await analyzeDocument(uploadData.documentId)
  }

  const analyzeDocument = async (documentId) => {
    setAnalyzing(true)
    try {
      const { data } = await documentAPI.analyzeDocument(documentId)
      setAnalysis(data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Research Portal: Earnings Call Analyzer</h1>
          <p className="app-subtitle">
            Upload earnings call transcripts for AI‑powered analysis and insights
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <div className="section-header">
            <h2>Upload Transcript</h2>
            <p>Upload a PDF or text file containing an earnings call transcript</p>
          </div>
          <FileUpload onUploadComplete={handleUploadComplete} />
        </section>

        {currentDocumentId && (
          <section className="analysis-section">
            <div className="section-header">
              <h2>Analysis Results</h2>
              <p>AI‑generated insights from the earnings call</p>
            </div>

            {analyzing && (
              <div className="analyzing-state">
                <div className="spinner-large"></div>
                <p>Analyzing transcript with AI... This may take 20‑30 seconds.</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <div className="error-icon-large">⚠️</div>
                <h3>Analysis Error</h3>
                <p>{error}</p>
                <button className="btn-primary mt-4" onClick={() => analyzeDocument(currentDocumentId)}>
                  Retry Analysis
                </button>
              </div>
            )}

            {analysis && !analyzing && <AnalysisResults analysis={analysis} />}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Research Portal v1.0 | Earnings Call Analysis Tool</p>
        <p className="footer-note">
          Note: This tool uses AI. Results should be verified by human analysts.
        </p>
      </footer>
    </div>
  )
}

export default App