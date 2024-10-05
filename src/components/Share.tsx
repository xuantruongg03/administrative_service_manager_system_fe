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
                    `${import.meta.env.VITE_SERVER_GET_LOCAL_IP_URL}/api/local-ip`,
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
    }, []);

    if (isShowShare) {
        return (
            <>
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-all duration-300">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative transform transition-all duration-300 scale-0 animate-zoom-in">
                        <button
                            className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsShowShare(false)}
                        >
                            <MdClose size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Chia sẻ
                        </h2>
                        
                        <div className="w-64 h-64 mx-auto mb-4">
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                {
                                    link !== "Không thể lấy địa chỉ IP local" ? (
                                        <QRCode value={link} />
                                    ) : (
                                        <span className="text-gray-500">
                                            Không thể lấy địa chỉ IP local
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                            <input
                                type="text"
                                value={link}
                                readOnly
                                className="w-full px-3 py-2 text-sm text-gray-500 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button
                                onClick={handleCopy}
                                className="p-3 text-sm text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                <MdContentCopy />
                            </button>
                        </div>
                        {copyMessage && (
                            <p className="text-green-500 text-sm text-center mb-2">
                                {copyMessage}
                            </p>
                        )}
                    </div>
                </div>
            </>
        );
    }
    return null;
}

export default Share;
