import { useEffect, useState } from "react";
import { MdClose, MdContentCopy } from "react-icons/md";
import QRCode from "react-qr-code";
import { ShareProps } from "../interfaces";

function Share(props: ShareProps) {
    const { setIsShowShare, isShowShare } = props;
    const [link, setLink] = useState("Không thể lấy địa chỉ IP local");
    const [copyMessage, setCopyMessage] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopyMessage("Đã sao chép!");
        setTimeout(() => setCopyMessage(""), 2000);
    };

    useEffect(() => {
        const fetchLocalIP = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_SERVER_GET_LOCAL_IP_URL
                    }/api/local-ip`,
                );
                const data = await response.json();
                const localLink = `http://${data.localIP}:5173`;
                setLink(localLink);
            } catch (error) {
                console.error("Lỗi khi lấy IP local:", error);
                setLink("Không thể lấy địa chỉ IP local");
            }
        };

        fetchLocalIP();

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsShowShare(false);
            }
        };

        if (isShowShare) {
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isShowShare, setIsShowShare]);

    if (isShowShare) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-10001 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[360px] relative animate-zoom-in">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsShowShare(false)}
                    >
                        <MdClose size={20} />
                    </button>
                    <h2 className="text-xl font-semibold mb-3 text-center">
                        Chia sẻ
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Quét mã QR hoặc sao chép đường dẫn bên dưới để chia sẻ
                        ứng dụng
                    </p>
                    <div className="w-48 h-48 mx-auto mb-4">
                        {link !== "Không thể lấy địa chỉ IP local" ? (
                            <QRCode value={link} size={192} />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                                Không thể lấy địa chỉ IP local
                            </div>
                        )}
                    </div>
                    <div className="flex items-center mb-3">
                        <input
                            type="text"
                            value={link}
                            readOnly
                            className="w-full px-3 py-2 text-sm text-gray-700 border rounded-l-md focus:outline-none"
                        />
                        <button
                            onClick={handleCopy}
                            className="p-2 text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none"
                        >
                            <MdContentCopy size={20} />
                        </button>
                    </div>
                    {copyMessage && (
                        <p className="text-green-500 text-sm text-center mb-2">
                            {copyMessage}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 text-center">
                        Thiết bị chia sẻ phải kết nối cùng mạng với thiết bị
                        được chia sẻ
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

export default Share;
