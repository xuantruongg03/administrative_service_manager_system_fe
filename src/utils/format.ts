const formatVND = (value: number) => {
    const formatted = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formatted.replace('₫', '').trim();
}

const formatDate = (date: string) => {
    const formatted = new Date(date).toLocaleDateString('vi-VN');
    return formatted;
}

export { formatVND, formatDate };