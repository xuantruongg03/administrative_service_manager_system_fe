import { useRef } from "react";
import { FileUploadButtonProps } from "../interfaces";

function FileUploadButton(props: FileUploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.onFileSelect(file);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
            >
                {props.icon}
                <span className="text-sm font-medium text-gray-700">
                    {props.label}
                </span>
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={props.accept}
            />
        </>
    );
}

export default FileUploadButton;
