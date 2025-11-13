export const formatDate = (timestamp: string) => {
    if (!timestamp) return '';
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');

}