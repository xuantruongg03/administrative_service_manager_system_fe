import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { PreviewFileProps } from "../interfaces/props";
import Modal from "./Modal";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

function PreviewFile(props: PreviewFileProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleViewClick = () => setShowFullImage(true);
    const handleCloseFullImage = () => setShowFullImage(false);

    const getPreviewContent = () => {
        const fileExtension = props.file.split('.').pop()?.toLowerCase() || props.type.toLowerCase();
        
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            return (
                <img
                    src={props.file}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                />
            );
        }
        
        if (fileExtension === 'pdf') {
            return (
                <Document file={props.file}>
                    <Page 
                        pageNumber={1} 
                        width={props.typePreview === 'mini' ? 160 : window.innerWidth < 768 ? window.innerWidth - 40 : 800}
                    />
                </Document>
            );
        }
        
        if (['doc', 'docx'].includes(fileExtension)) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-xs sm:text-sm text-center p-2">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <p className="mt-2 text-gray-500">Word chưa hỗ trợ xem trước</p>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center h-full p-2">
                <p className="text-gray-500 text-xs sm:text-sm">Xem trước không hỗ trợ</p>
            </div>
        );
    };

    const renderPreview = () => {
        if (props.typePreview === "mini") {
            return (
                <div
                    className="relative w-28 h-28 sm:w-40 sm:h-40 overflow-hidden items-center rounded-lg flex shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        {getPreviewContent()}
                    </div>
                    {(isHovered || window.innerWidth < 768) && (
                        <div className="absolute inset-0 rounded-lg bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm z-20">
                            <button
                                className="bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 flex items-center"
                                onClick={handleViewClick}
                            >
                                <MdRemoveRedEye className="mr-1 sm:mr-2" />
                                <span>View</span>
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
                >
                    <div className="relative w-full h-[90vh] flex items-center justify-center">
                        {getPreviewContent()}
                        <button
                            className="absolute top-10 right-2 sm:top-4 sm:right-4 text-white text-xl sm:text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                            onClick={props.closePreview || handleCloseFullImage}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {renderPreview()}
            {showFullImage && props.typePreview === "mini" && (
                <Modal>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4 backdrop-blur-sm">
                        <div className="relative w-full h-[90vh] flex items-center justify-center">
                            {getPreviewContent()}
                            <button
                                className="absolute top-10 right-2 sm:top-4 sm:right-4 text-white text-xl sm:text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                                onClick={handleCloseFullImage}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default PreviewFile;
