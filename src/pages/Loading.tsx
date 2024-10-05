function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="flex items-center justify-center w-28 h-28">
                <span className="loader"></span>
            </div>
            <span className="font-semibold mt-2">Đang tải dữ liệu...</span>
        </div>
    );
}

export default Loading;
