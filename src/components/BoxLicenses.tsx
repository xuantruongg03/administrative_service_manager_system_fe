import { Panel } from "primereact/panel";
import { forwardRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LicenseDataApi, LicenseOfType } from "../interfaces/api";
import { CONSTANTS } from "../utils/constants";
import LoadingMini from "./LoadingMini";

interface BoxLicensesProps {
    nameBusinessLicense: string[];
    isPendingRemoveLicense?: boolean;
    isPendingUploadLicenses?: boolean;
    onUploadLicense: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: string,
    ) => void;
    onRemoveLicense: (licenseId: string, type: string, name: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataBusiness?: any;
    acceptFile: string;
    type: string;
    isUpload?: boolean;
    isRemove?: boolean;
}

const BoxLicenses = forwardRef<HTMLInputElement, BoxLicensesProps>(
    (props, ref) => {
        const [isPanelCollapsed, setIsPanelCollapsed] = useState(true);
        const handleChooseLicense = () => {
            if (ref && "current" in ref) {
                ref.current?.click();
            }
        };

        return (
            <>
                {props.nameBusinessLicense?.length > 1 ? (
                    <div className="[&_.p-panel-header]:p-0 [&_.p-panel-header]:bg-transparent [&_.p-panel-header]:border-0 [&_.p-panel-content]:p-2 [&_.p-panel-content]:bg-transparent [&_.p-panel-content]:border-0 [&_.p-panel-header-icon]:hidden">
                        <Panel
                            headerTemplate={() => (
                                <div className="flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-md hover:border-blue-500">
                                    <span className="text-sm">Danh sách</span>
                                    <button
                                        type="button"
                                        className="text-gray-400"
                                    >
                                        {isPanelCollapsed ? (
                                            <FaChevronDown className="size-3" />
                                        ) : (
                                            <FaChevronUp className="size-3" />
                                        )}
                                    </button>
                                </div>
                            )}
                            onClick={() =>
                                setIsPanelCollapsed(!isPanelCollapsed)
                            }
                            toggleable
                            collapsed={isPanelCollapsed}
                            onToggle={(e) => setIsPanelCollapsed(e.value)}
                            transitionOptions={{ timeout: 100 }}
                            className={`${
                                isPanelCollapsed
                                    ? ""
                                    : "border border-gray-300 rounded-md mt-1"
                            }`}
                        >
                            <div className="flex flex-col gap-1">
                                {props.nameBusinessLicense?.map(
                                    (license: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-md group"
                                        >
                                            <span
                                                className="text-sm truncate"
                                                title={license}
                                            >
                                                {license}
                                            </span>
                                            <button
                                                type="button"
                                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                                                onClick={() => {
                                                    const licenseId =
                                                        props.dataBusiness?.data?.licenses
                                                            ?.find(
                                                                (
                                                                    l: LicenseDataApi,
                                                                ) =>
                                                                    l.type ===
                                                                    props.type,
                                                            )
                                                            ?.licenses?.find(
                                                                (
                                                                    l: LicenseOfType,
                                                                ) =>
                                                                    l.name ===
                                                                    license,
                                                            )?.id;
                                                    props.onRemoveLicense(
                                                        licenseId,
                                                        props.type,
                                                        license,
                                                    );
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        </Panel>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {props.nameBusinessLicense?.length === 1 ? (
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md w-full">
                                <span
                                    className="text-sm truncate hover:text-clip"
                                    title={props.nameBusinessLicense[0]}
                                >
                                    {props.nameBusinessLicense[0]}
                                </span>
                                <div className="flex items-center flex-shrink-0 justify-between">
                                    {props.isPendingRemoveLicense ? (
                                        <LoadingMini />
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            onClick={() => {
                                                const licenseId =
                                                    props.dataBusiness?.data?.licenses
                                                        ?.find(
                                                            (
                                                                l: LicenseDataApi,
                                                            ) =>
                                                                l.type ===
                                                                props.type,
                                                        )
                                                        ?.licenses?.find(
                                                            (
                                                                l: LicenseOfType,
                                                            ) =>
                                                                l.name ===
                                                                props
                                                                    .nameBusinessLicense[0],
                                                        )?.id;
                                                props.onRemoveLicense(
                                                    licenseId,
                                                    props.type,
                                                    props
                                                        .nameBusinessLicense[0],
                                                );
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div
                                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer w-full transition-colors"
                                onClick={handleChooseLicense}
                            >
                                {props.isPendingUploadLicenses ? (
                                    <LoadingMini />
                                ) : (
                                    <>
                                        <FiUpload className="size-4 flex-shrink-0" />
                                        <span className="text-sm">
                                            Tải lên {props.type.toLowerCase()}
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    id="business_license"
                    className="hidden"
                    multiple
                    accept={CONSTANTS.ACCEPT_FILE}
                    ref={ref}
                    onChange={(e) => props.onUploadLicense(e, props.type)}
                />
            </>
        );
    },
);

export default BoxLicenses;
