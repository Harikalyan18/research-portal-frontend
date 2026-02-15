const AnalysisResults = ({ analysis }) => {
    if (!analysis) return null;

    const sentimentColor = {
        optimistic: 'bg-green-100 text-green-800',
        cautious: 'bg-yellow-100 text-yellow-800',
        neutral: 'bg-gray-100 text-gray-800',
        pessimistic: 'bg-red-100 text-red-800'
    };

    const confidenceColor = {
        high: 'bg-blue-100 text-blue-800',
        medium: 'bg-purple-100 text-purple-800',
        low: 'bg-gray-100 text-gray-800'
    };

    return (
        <div className="analysis-results">
            <div className="analysis-header">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Analysis Results</h2>
                        <p className="text-gray-600">Earnings Call Summary</p>
                    </div>
                    <div className="flex gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${sentimentColor[analysis.management_tone?.sentiment] || ''}`}>
                            {analysis.management_tone?.sentiment?.charAt(0).toUpperCase() + analysis.management_tone?.sentiment?.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${confidenceColor[analysis.management_tone?.confidence] || ''}`}>
                            Confidence: {analysis.management_tone?.confidence}
                        </span>
                    </div>
                </div>
            </div>

            {/* Key Positives */}
            <div className="section">
                <h3 className="section-title">Key Positives</h3>
                <div className="cards-grid">
                    {analysis.key_positives?.map((item, idx) => (
                        <div key={idx} className="card positive">
                            <div className="card-header">
                                <span className="card-badge positive">+</span>
                                <h4 className="card-title">{item.topic}</h4>
                            </div>
                            <p className="card-content">{item.description}</p>
                            {item.mentioned_by && <div className="card-footer">Mentioned by: {item.mentioned_by}</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Concerns */}
            <div className="section">
                <h3 className="section-title">Key Concerns & Challenges</h3>
                <div className="cards-grid">
                    {analysis.key_concerns?.map((item, idx) => (
                        <div key={idx} className="card concern">
                            <div className="card-header">
                                <span className="card-badge concern">⚠️</span>
                                <h4 className="card-title">{item.topic}</h4>
                                {item.severity && <span className={`severity-badge ${item.severity}`}>{item.severity}</span>}
                            </div>
                            <p className="card-content">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forward Guidance */}
            {analysis.forward_guidance && (
                <div className="section">
                    <h3 className="section-title">Forward Guidance</h3>
                    <div className="guidance-grid">
                        {analysis.forward_guidance.revenue_outlook && (
                            <div className="guidance-item">
                                <span className="guidance-label">Revenue Outlook:</span>
                                <span className="guidance-value">{analysis.forward_guidance.revenue_outlook}</span>
                            </div>
                        )}
                        {analysis.forward_guidance.margin_outlook && (
                            <div className="guidance-item">
                                <span className="guidance-label">Margin Outlook:</span>
                                <span className="guidance-value">{analysis.forward_guidance.margin_outlook}</span>
                            </div>
                        )}
                        {analysis.forward_guidance.capex_outlook && (
                            <div className="guidance-item">
                                <span className="guidance-label">CapEx Outlook:</span>
                                <span className="guidance-value">{analysis.forward_guidance.capex_outlook}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Growth Initiatives */}
            {analysis.growth_initiatives?.length > 0 && (
                <div className="section">
                    <h3 className="section-title">Growth Initiatives</h3>
                    <div className="initiatives-list">
                        {analysis.growth_initiatives.map((item, idx) => (
                            <div key={idx} className="initiative-item">
                                <div className="initiative-header">
                                    <span className="initiative-icon">🚀</span>
                                    <h4 className="initiative-title">{item.initiative}</h4>
                                    <span className="initiative-timeframe">{item.timeframe}</span>
                                </div>
                                <p className="initiative-description">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Summary */}
            {analysis.summary && (
                <div className="section">
                    <h3 className="section-title">Executive Summary</h3>
                    <div className="summary-card">
                        <p>{analysis.summary}</p>
                    </div>
                </div>
            )}

            {/* Export buttons */}
            <div className="section">
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'earnings-analysis.json';
                            a.click();
                        }}
                    >
                        Download JSON
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResults;