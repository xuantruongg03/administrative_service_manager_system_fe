import { useState } from "react";
import { PreviewFileProps } from "../interfaces/props";
import { MdRemoveRedEye } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`

function PreviewFile(props: PreviewFileProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleViewClick = () => setShowFullImage(true);
    const handleCloseFullImage = () => setShowFullImage(false);

    const renderPreview = () => {
        if (props.typePreview === "mini") {
            return (
                <div
                    className="relative w-40 h-40 overflow-hidden items-center rounded-lg flex shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        {props.type === "pdf" ? (
                            <Document file={props.file}>
                                <Page pageNumber={1} width={160} />
                            </Document>
                        ) : (
                            <img
                                src={props.file}
                                alt="Preview"
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
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
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                        {props.type === "pdf" ? (
                            <Document file={props.file}>
                                <Page pageNumber={1} width={800} />
                            </Document>
                        ) : (
                            <img
                                src={props.file}
                                alt="Full size"
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
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
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                        {props.type === "pdf" ? (
                            <Document file={props.file}>
                                <Page pageNumber={1} width={800} />
                            </Document>
                        ) : (
                            <img
                                src={props.file}
                                alt="Full size"
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
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
