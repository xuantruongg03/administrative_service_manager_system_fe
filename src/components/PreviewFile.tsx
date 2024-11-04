import { useState } from "react";
import { PreviewFileProps } from "../interfaces/props";
import { MdRemoveRedEye } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";

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
                    <Page pageNumber={1} width={props.typePreview === 'mini' ? 160 : 800} />
                </Document>
            );
        }
        
        if (['doc', 'docx'].includes(fileExtension)) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <p className="mt-2 text-gray-500">Word Document Preview Not Available</p>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Preview not available</p>
            </div>
        );
    };

    const renderPreview = () => {
        if (props.typePreview === "mini") {
            return (
                <div
                    className="relative w-40 h-40 overflow-hidden items-center rounded-lg flex shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        {getPreviewContent()}
                    </div>
                    {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
                            <button
                                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 flex items-center"
                                onClick={handleViewClick}
                            >
                                <MdRemoveRedEye className="mr-2" />
                                <span> View</span>
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10001">
                    <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                        {getPreviewContent()}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl"
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
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10001">
                    <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                        {getPreviewContent()}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl"
                            onClick={handleCloseFullImage}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PreviewFile;
