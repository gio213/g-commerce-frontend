export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
};


export const timeAgo = (dateString: string) => {
    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - reviewDate.getTime()) / 1000
    );

    const years = Math.floor(diffInSeconds / (3600 * 24 * 365));
    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

    const months = Math.floor(diffInSeconds / (3600 * 24 * 30));
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

    const days = Math.floor(diffInSeconds / (3600 * 24));
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

    const hours = Math.floor(diffInSeconds / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
};