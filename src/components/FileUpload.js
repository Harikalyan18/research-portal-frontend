import { useState } from 'react'
import { documentAPI } from '../services/api'

const FileUpload = ({ onUploadComplete }) => {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)
    const [fileName, setFileName] = useState('')

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setFileName(file.name)
        setUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('document', file)

        try {
            const { data } = await documentAPI.uploadDocument(formData)
            onUploadComplete(data)
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="file-upload-container">
            <div className="simple-upload">
                <label htmlFor="file-upload" className="browse-btn">
                    {uploading ? 'Uploading...' : 'Choose File'}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    disabled={uploading}
                    style={{ display: 'none' }}
                />
                {fileName && !uploading && (
                    <p className="selected-file">Selected: {fileName}</p>
                )}
                {uploading && (
                    <div className="uploading-message">
                        <div className="spinner"></div>
                        <p>Uploading document...</p>
                    </div>
                )}
                <p className="file-types">Supported: PDF, TXT (max 20MB)</p>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default FileUpload