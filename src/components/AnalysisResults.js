
const AnalysisResults = ({ analysis }) => {
    if (!analysis) return null;

    // Helper to render a list of items with bullet points
    const renderList = (items, title) => {
        if (!items || items.length === 0) return null;
        return (
            <>
                <h3>{title}</h3>
                <ul>
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.topic || item.initiative}:</strong> {item.description}
                            {item.mentioned_by && <em> (mentioned by: {item.mentioned_by})</em>}
                            {item.severity && <span> [Severity: {item.severity}]</span>}
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    return (
        <div className="analysis-document">
            <h1>Earnings Call Analysis Report</h1>

            {/* Management Tone */}
            {analysis.management_tone && (
                <section>
                    <h2>Management Tone</h2>
                    <p>
                        <strong>Sentiment:</strong> {analysis.management_tone.sentiment || 'N/A'} <br />
                        <strong>Confidence:</strong> {analysis.management_tone.confidence || 'N/A'}
                    </p>
                    {analysis.management_tone.supporting_quotes?.length > 0 && (
                        <>
                            <p><strong>Supporting Quotes:</strong></p>
                            <ul>
                                {analysis.management_tone.supporting_quotes.map((quote, idx) => (
                                    <li key={idx}>“{quote}”</li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            )}

            {/* Key Positives */}
            {renderList(analysis.key_positives, 'Key Positives')}

            {/* Key Concerns */}
            {renderList(analysis.key_concerns, 'Key Concerns & Challenges')}

            {/* Forward Guidance */}
            {analysis.forward_guidance && (
                <section>
                    <h2>Forward Guidance</h2>
                    {analysis.forward_guidance.revenue_outlook && (
                        <p><strong>Revenue Outlook:</strong> {analysis.forward_guidance.revenue_outlook}</p>
                    )}
                    {analysis.forward_guidance.margin_outlook && (
                        <p><strong>Margin Outlook:</strong> {analysis.forward_guidance.margin_outlook}</p>
                    )}
                    {analysis.forward_guidance.capex_outlook && (
                        <p><strong>CapEx Outlook:</strong> {analysis.forward_guidance.capex_outlook}</p>
                    )}
                    {analysis.forward_guidance.confidence && (
                        <p><strong>Confidence:</strong> {analysis.forward_guidance.confidence}</p>
                    )}
                </section>
            )}

            {/* Capacity Utilization */}
            {analysis.capacity_utilization && (
                <section>
                    <h2>Capacity Utilization</h2>
                    <p>{analysis.capacity_utilization}</p>
                </section>
            )}

            {/* Growth Initiatives */}
            {renderList(analysis.growth_initiatives, 'Growth Initiatives')}

            {/* Executive Summary */}
            {analysis.summary && (
                <section>
                    <h2>Executive Summary</h2>
                    <p>{analysis.summary}</p>
                </section>
            )}

            {/* Download Button */}
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
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
    );
};

export default AnalysisResults;