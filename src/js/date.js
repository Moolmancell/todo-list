// Helper function to format the date to YYYY-MM-DD
export function formatDate(date) {
    if (!date) return '';
    
    // Create a Date object
    const d = new Date(date);
    
    // Extract the year, month, and day
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    
    // Return the formatted date
    return `${year}-${month}-${day}`;
}