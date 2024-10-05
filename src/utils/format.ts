const formatVND = (value: number) => {
    const formatted = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formatted.replace('₫', '').trim();
}

export { formatVND };