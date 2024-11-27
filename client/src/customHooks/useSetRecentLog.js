export const addRecentLog = (message) => {
    const recentLogData = JSON.parse(localStorage.getItem('recentLogs')) || [];
    const updatedRecentLog = [...recentLogData, message];
    localStorage.setItem('recentLogs', JSON.stringify(updatedRecentLog));
};