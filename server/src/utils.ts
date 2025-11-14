export const formatDate = (timestamp: string) => {
    return timestamp
        ? new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')
        : '';
}