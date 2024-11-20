import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddLicenseModal from "../components/AddLicenseModal";
import BoxLicenses from "../components/BoxLicenses";
import EmployeeModal from "../components/EmployeeModal";
import LoadingMini from "../components/LoadingMini";
import useRemoveLicense from "../hooks/useRemoveLicense";
import useUpdateBusiness from "../hooks/useUpdateBusiness";
import useUploadLicenses from "../hooks/useUploadLicenses";
import {
    BusinessDataApiRequest,
    LicenseDataApi,
    LicenseOfType,
} from "../interfaces/api";
import businessService from "../services/business";
import licenseTypeService from "../services/licenseType";
import typeOfOrganizationService from "../services/typeOfOrganization";
import { CONSTANTS } from "../utils/constants";
import { REGEX } from "../utils/regex";
import Loading from "./Loading";

const getBusinessByIdReq = async (id: string) => {
    const response = await businessService.getBusinessById(id);
    return response;
};

const getTypeOfOrganizationReq = async () => {
    const response = await typeOfOrganizationService.getTypeOfOrganization();
    return response;
};

const getLicenseTypeReq = async () => {
    const response = await licenseTypeService.getLicenseType();
    return response;
};

function EditBusiness() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<BusinessDataApiRequest>();
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showAddLicenseModal, setShowAddLicenseModal] = useState(false);
    const [nameFireLicense, setNameFireLicense] = useState<string[]>([]);
    const [nameBusinessLicense, setNameBusinessLicense] = useState<string[]>(
        [],
    );
    const [nameSecurityLicense, setNameSecurityLicense] = useState<string[]>(
        [],
    );
    const [otherLicenses, setOtherLicenses] = useState<
        {
            name: string[];
            type: string;
        }[]
    >([]);
    const { id } = useParams();
    const [selectedType, setSelectedType] = useState("");
    const [
        selectedGenderLegalRepresentative,
        setSelectedGenderLegalRepresentative,
    ] = useState("");
    const [selectedGenderOwner, setSelectedGenderOwner] = useState("");
    const businessLicenseInputRef = useRef<HTMLInputElement>(null);
    const fireLicenseInputRef = useRef<HTMLInputElement>(null);
    const securityLicenseInputRef = useRef<HTMLInputElement>(null);
    const otherLicenseRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
        {},
    );
    const queryClient = useQueryClient();

    const { isLoading: isLoadingBusiness, data: dataBusiness } = useQuery({
        queryKey: ["getBusinessById", id],
        queryFn: () => getBusinessByIdReq(id as string),
    });

    const { isLoading: isLoadingLicenseType, data: dataLicenseType } = useQuery(
        {
            queryKey: ["getLicenseType"],
            queryFn: () => getLicenseTypeReq(),
        },
    );

    const {
        isLoading: isLoadingTypeOfOrganization,
        data: dataTypeOfOrganization,
    } = useQuery({
        queryKey: ["getTypeOfOrganization"],
        queryFn: () => getTypeOfOrganizationReq(),
    });

    //Hooks
    const { updateBusiness, isPending: isPendingUpdateBusiness } =
        useUpdateBusiness();
    const { uploadLicenses, isPending: isPendingUploadLicenses } =
        useUploadLicenses();
    const { removeLicense, isPending: isPendingRemoveLicense } =
        useRemoveLicense();

    //Functions
    const handleUploadLicense = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: string,
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const licenseTypeId = dataLicenseType?.data.find(
                (licenseType: { id: string; name: string }) =>
                    licenseType.name === type,
            )?.id;

            if (!licenseTypeId) {
                toast.error("Không tìm thấy loại giấy phép");
                return;
            }

            // Create an array of promises for each file upload
            const uploadPromises = Array.from(files).map(file => 
                uploadLicenses({
                    file,
                    id: id as string,
                    type: licenseTypeId,
                })
            );

            // Wait for all uploads to complete
            Promise.all(uploadPromises)
                .then(() => {
                    const fileNames = Array.from(files).map(file => file.name);
                    
                    if (type === "Giấy phép kinh doanh") {
                        toast.success("Tải lên giấy phép kinh doanh thành công");
                        setNameBusinessLicense([...nameBusinessLicense, ...fileNames]);
                    } else if (type === "Giấy phép PCCC") {
                        toast.success("Tải lên giấy phép PCCC thành công");
                        setNameFireLicense([...nameFireLicense, ...fileNames]);
                    } else if (type === "Giấy phép ANTT") {
                        toast.success("Tải lên giấy phép ANTT thành công");
                        setNameSecurityLicense([...nameSecurityLicense, ...fileNames]);
                    } else {
                        toast.success("Tải lên giấy tờ thành công");
                        // Handle other license types if needed
                        setOtherLicenses(prevLicenses => 
                            prevLicenses.map(license => 
                                license.type === type 
                                    ? { ...license, name: [...license.name, ...fileNames] }
                                    : license
                            )
                        );
                    }

                    queryClient.invalidateQueries({
                        queryKey: ["getBusinessById", id],
                    });

                    // Reset input file
                    if (type === "Giấy phép kinh doanh") {
                        businessLicenseInputRef.current!.value = "";
                    } else if (type === "Giấy phép PCCC") {
                        fireLicenseInputRef.current!.value = "";
                    } else if (type === "Giấy phép ANTT") {
                        securityLicenseInputRef.current!.value = "";
                    } else {
                        const ref = otherLicenseRefs.current[type];
                        if (ref) ref.value = "";
                    }
                })
                .catch((error) => {
                    toast.error("Có lỗi xảy ra khi tải lên giấy tờ");
                    console.error("Upload error:", error);
                });
        }
    };

    const handleRemoveLicense = (
        licenseId: string,
        type: string,
        licenseName: string,
    ) => {
        removeLicense({ id: licenseId }).then(() => {
            toast.success("Xóa giấy tờ thành công");
            if (type === "Giấy phép kinh doanh") {
                setNameBusinessLicense(
                    nameBusinessLicense.filter((name) => name !== licenseName),
                );
            } else if (type === "Giấy phép PCCC") {
                setNameFireLicense(
                    nameFireLicense.filter((name) => name !== licenseName),
                );
            } else if (type === "Giấy phép ANTT") {
                setNameSecurityLicense(
                    nameSecurityLicense.filter((name) => name !== licenseName),
                );
            } else {
                setOtherLicenses(
                    otherLicenses.map((license) => ({
                        ...license,
                        name: license.name.filter(
                            (name) => name !== licenseName,
                        ),
                    })),
                );
            }
        });
    };

    const onSubmit = handleSubmit((data) => {
        updateBusiness({ id: id as string, data }).then(() => {
            toast.success("Cập nhật thông tin thành công");
        });
    });

    const handleOpenEmployeeModal = () => {
        setShowEmployeeModal(true);
    };

    const handleChooseLicense = (type: string) => {
        if (type === "Giấy phép kinh doanh") {
            businessLicenseInputRef.current?.click();
        } else if (type === "Giấy phép PCCC") {
            fireLicenseInputRef.current?.click();
        } else if (type === "Giấy phép ANTT") {
            securityLicenseInputRef.current?.click();
        } else {
            const ref = otherLicenseRefs.current[type];
            if (ref) {
                ref.click();
            }
        }
    };

    const businessLicenseNames = useMemo(() => {
        const l = dataBusiness?.data?.licenses?.find(
            (license: LicenseDataApi) =>
                license.type === CONSTANTS.LICENSE_TYPE.BUSINESS,
        );
        if (l) {
            return l.licenses.map((license: LicenseOfType) => license.name);
        }
        return [];
    }, [dataBusiness?.data?.licenses]);

    const fireLicenseNames = useMemo(() => {
        const l = dataBusiness?.data?.licenses?.find(
            (license: LicenseDataApi) =>
                license.type === CONSTANTS.LICENSE_TYPE.FIRE,
        );
        if (l) {
            return l.licenses.map((license: LicenseOfType) => license.name);
        }
        return [];
    }, [dataBusiness?.data?.licenses]);

    const securityLicenseNames = useMemo(() => {
        const l = dataBusiness?.data?.licenses?.find(
            (license: LicenseDataApi) =>
                license.type === CONSTANTS.LICENSE_TYPE.SECURITY,
        );
        if (l) {
            return l.licenses.map((license: LicenseOfType) => license.name);
        }
        return [];
    }, [dataBusiness?.data?.licenses]);

    const otherLicenseTypes = useMemo(() => {
        const l = dataBusiness?.data?.licenses?.filter(
            (license: LicenseDataApi) =>
                license.type !== CONSTANTS.LICENSE_TYPE.BUSINESS &&
                license.type !== CONSTANTS.LICENSE_TYPE.FIRE &&
                license.type !== CONSTANTS.LICENSE_TYPE.SECURITY,
        );
        if (l) {
            return l.map((license: LicenseDataApi) => ({
                name: license.licenses.map(
                    (license: LicenseOfType) => license.name,
                ),
                type: license.type,
            }));
        }
        return [];
    }, [dataBusiness?.data?.licenses]);

    useEffect(() => {
        setNameBusinessLicense(businessLicenseNames);
        setNameFireLicense(fireLicenseNames);
        setNameSecurityLicense(securityLicenseNames);
        setOtherLicenses(otherLicenseTypes);
        setSelectedType(dataBusiness?.data?.type_of_organization);
        setSelectedGenderLegalRepresentative(
            dataBusiness?.data?.legal_representative.gender,
        );
        setSelectedGenderOwner(dataBusiness?.data?.owner.gender);
        setValue(
            "type_of_organization",
            dataBusiness?.data?.type_of_organization,
        );
        setValue(
            "legal_representative.gender",
            dataBusiness?.data?.legal_representative.gender,
        );
        setValue("owner.gender", dataBusiness?.data?.owner.gender);
    }, [
        dataBusiness?.data?.licenses,
        dataBusiness?.data?.type_of_organization,
        businessLicenseNames,
        fireLicenseNames,
        securityLicenseNames,
        otherLicenseTypes,
        dataBusiness?.data?.legal_representative.gender,
        dataBusiness?.data?.owner.gender,
        setValue,
    ]);

    if (
        isLoadingBusiness ||
        isLoadingTypeOfOrganization ||
        isLoadingLicenseType
    )
        return <Loading />;

    return (
        <>
            <div className="flex flex-col gap-8 p-6 bg-gray-100 rounded-lg shadow-md">
                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Legal Representative & Owner Information Section */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-2">
                                    Thông tin người đại diện pháp luật
                                </h2>
                                <input
                                    type="hidden"
                                    {...register("legal_representative.id")}
                                    value={
                                        dataBusiness?.data?.legal_representative
                                            .id
                                    }
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.citizen_id"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="legal_representative.citizen_id"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.citizen_id
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .citizen_id
                                            }
                                            {...register(
                                                "legal_representative.citizen_id",
                                                {
                                                    required:
                                                        "Số CCCD là bắt buộc",
                                                    pattern: {
                                                        value: REGEX.ID_CARD,
                                                        message:
                                                            "Số CCCD phải có 8 hoặc 12 chữ số",
                                                    },
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.citizen_id && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .citizen_id.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Họ và tên *
                                        </label>
                                        <InputText
                                            id="legal_representative.name"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.name
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative.name
                                            }
                                            {...register(
                                                "legal_representative.name",
                                                {
                                                    required:
                                                        "Họ và tên là bắt buộc",
                                                    minLength: {
                                                        value: 2,
                                                        message:
                                                            "Họ và tên phải có ít nhất 2 ký tự",
                                                    },
                                                },
                                            )}
                                        />
                                        {errors.legal_representative?.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .name.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.birth_date"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Ngày sinh *
                                        </label>
                                        <InputText
                                            id="legal_representative.birth_date"
                                            type="date"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.birth_date
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .birth_date
                                            }
                                            {...register(
                                                "legal_representative.birth_date",
                                                {
                                                    required:
                                                        "Ngày sinh là bắt buộc",
                                                    validate: (value) => {
                                                        const birthDate =
                                                            new Date(value);
                                                        const today =
                                                            new Date();
                                                        const age =
                                                            today.getFullYear() -
                                                            birthDate.getFullYear();
                                                        return (
                                                            age >= 18 ||
                                                            "Người đại diện phải từ 18 tuổi trở lên"
                                                        );
                                                    },
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.birth_date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .birth_date.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.gender"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Giới tính *
                                        </label>
                                        <Dropdown
                                            id="legal_representative.gender"
                                            options={[
                                                {
                                                    label: "Nam",
                                                    value: "Nam",
                                                },
                                                {
                                                    label: "Nữ",
                                                    value: "Nữ",
                                                },
                                            ]}
                                            className={`w-full md:w-full ${
                                                errors.legal_representative
                                                    ?.gender
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            value={
                                                selectedGenderLegalRepresentative
                                            }
                                            {...register(
                                                "legal_representative.gender",
                                                {
                                                    required:
                                                        "Giới tính là bắt buộc",
                                                    onChange: (e) => {
                                                        setSelectedGenderLegalRepresentative(
                                                            e.value,
                                                        );
                                                        setValue(
                                                            "legal_representative.gender",
                                                            e.value,
                                                        );
                                                    },
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.gender && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .gender.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.nationality"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quốc tịch *
                                        </label>
                                        <InputText
                                            id="legal_representative.nationality"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.nationality
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .nationality
                                            }
                                            {...register(
                                                "legal_representative.nationality",
                                                {
                                                    required:
                                                        "Quốc tịch là bắt buộc",
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.nationality && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .nationality.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.religion"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Tôn giáo
                                        </label>
                                        <InputText
                                            id="legal_representative.religion"
                                            className="w-full p-2 md:p-3 text-sm"
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .religion
                                            }
                                            {...register(
                                                "legal_representative.religion",
                                            )}
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label
                                            htmlFor="legal_representative.hometown"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="legal_representative.hometown"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.hometown
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .hometown
                                            }
                                            {...register(
                                                "legal_representative.hometown",
                                                {
                                                    required:
                                                        "Quê quán là bắt buộc",
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.hometown && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .hometown.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label
                                            htmlFor="legal_representative.current_address"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="legal_representative.current_address"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.legal_representative
                                                    ?.current_address
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .current_address
                                            }
                                            {...register(
                                                "legal_representative.current_address",
                                                {
                                                    required:
                                                        "Địa chỉ hiện tại là bắt buộc",
                                                },
                                            )}
                                        />
                                        {errors.legal_representative
                                            ?.current_address && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.legal_representative
                                                        .current_address.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-2">
                                    Thông tin chủ sở hữu
                                </h2>
                                <input
                                    type="hidden"
                                    {...register("owner.id")}
                                    value={dataBusiness?.data?.owner.id}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.citizen_id"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="owner.citizen_id"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.citizen_id
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .citizen_id
                                            }
                                            {...register("owner.citizen_id", {
                                                required: "Số CCCD là bắt buộc",
                                                pattern: {
                                                    value: REGEX.ID_CARD,
                                                    message:
                                                        "Số CCCD phải có 8 hoặc 12 chữ số",
                                                },
                                            })}
                                        />
                                        {errors.owner?.citizen_id && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.owner.citizen_id
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Họ và tên *
                                        </label>
                                        <InputText
                                            id="owner.name"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.name
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner.name
                                            }
                                            {...register("owner.name", {
                                                required:
                                                    "Họ và tên là bắt buộc",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Họ và tên phải có ít nhất 2 ký tự",
                                                },
                                            })}
                                        />
                                        {errors.owner?.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.owner.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.birth_date"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Ngày sinh *
                                        </label>
                                        <InputText
                                            id="owner.birth_date"
                                            type="date"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.birth_date
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .birth_date
                                            }
                                            {...register("owner.birth_date", {
                                                required:
                                                    "Ngày sinh là bắt buộc",
                                                validate: (value) => {
                                                    const birthDate = new Date(
                                                        value,
                                                    );
                                                    const today = new Date();
                                                    const age =
                                                        today.getFullYear() -
                                                        birthDate.getFullYear();
                                                    return (
                                                        age >= 18 ||
                                                        "Chủ sở hữu phải từ 18 tuổi trở lên"
                                                    );
                                                },
                                            })}
                                        />
                                        {errors.owner?.birth_date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.owner.birth_date
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.gender"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Giới tính *
                                        </label>
                                        <Dropdown
                                            id="owner.gender"
                                            options={[
                                                {
                                                    label: "Nam",
                                                    value: "Nam",
                                                },
                                                {
                                                    label: "Nữ",
                                                    value: "Nữ",
                                                },
                                            ]}
                                            className={`w-full md:w-full ${
                                                errors.owner?.gender
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            value={selectedGenderOwner}
                                            {...register("owner.gender", {
                                                required:
                                                    "Giới tính là bắt buộc",
                                                onChange: (e) => {
                                                    setSelectedGenderOwner(
                                                        e.value,
                                                    );
                                                    setValue(
                                                        "owner.gender",
                                                        e.value,
                                                    );
                                                },
                                            })}
                                        />
                                        {errors.owner?.gender && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.owner.gender.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.nationality"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quốc tịch *
                                        </label>
                                        <InputText
                                            id="owner.nationality"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.nationality
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .nationality
                                            }
                                            {...register("owner.nationality", {
                                                required:
                                                    "Quốc tịch là bắt buộc",
                                            })}
                                        />
                                        {errors.owner?.nationality && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.owner.nationality
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.religion"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Tôn giáo
                                        </label>
                                        <InputText
                                            id="owner.religion"
                                            className="w-full p-2 md:p-3 text-sm"
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .religion
                                            }
                                            {...register("owner.religion")}
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label
                                            htmlFor="owner.hometown"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="owner.hometown"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.hometown
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .hometown
                                            }
                                            {...register("owner.hometown", {
                                                required:
                                                    "Quê quán là bắt buộc",
                                            })}
                                        />
                                        {errors.owner?.hometown && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.owner.hometown.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label
                                            htmlFor="owner.current_address"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="owner.current_address"
                                            className={`w-full p-2 md:p-3 text-sm ${
                                                errors.owner?.current_address
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .current_address
                                            }
                                            {...register(
                                                "owner.current_address",
                                                {
                                                    required:
                                                        "Địa chỉ hiện tại là bắt buộc",
                                                },
                                            )}
                                        />
                                        {errors.owner?.current_address && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.owner.current_address
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Thông tin doanh nghiệp
                        </h2>
                        <input
                            type="hidden"
                            {...register("id")}
                            value={dataBusiness?.data?.id}
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="code"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mã doanh nghiệp *
                                </label>
                                <InputText
                                    id="code"
                                    className="w-full p-3 bg-gray-100 text-sm"
                                    defaultValue={dataBusiness?.data?.code}
                                    {...register("code")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="name_vietnamese"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên tiếng việt *
                                </label>
                                <InputText
                                    id="name_vietnamese"
                                    className={`w-full p-3 text-sm ${
                                        errors.name_vietnamese
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    defaultValue={
                                        dataBusiness?.data?.name_vietnamese
                                    }
                                    {...register("name_vietnamese", {
                                        required: "Tên tiếng việt là bắt buộc",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Tên phải có ít nhất 2 ký tự",
                                        },
                                    })}
                                />
                                {errors.name_vietnamese && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name_vietnamese.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="name_english"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên tiếng anh
                                </label>
                                <InputText
                                    id="name_english"
                                    className="w-full p-3 text-sm"
                                    defaultValue={
                                        dataBusiness?.data?.name_english
                                    }
                                    {...register("name_english")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="name_acronym"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên viết tắt
                                </label>
                                <InputText
                                    id="name_acronym"
                                    className="w-full p-3 text-sm"
                                    defaultValue={
                                        dataBusiness?.data?.name_acronym
                                    }
                                    {...register("name_acronym")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="chartered_capital"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Vốn điều lệ *
                                </label>
                                <InputText
                                    type="number"
                                    id="chartered_capital"
                                    className={`w-full p-3 text-sm ${
                                        errors.chartered_capital
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    defaultValue={
                                        dataBusiness?.data?.chartered_capital
                                    }
                                    {...register("chartered_capital", {
                                        required: "Vốn điu lệ là bắt buộc",
                                        min: {
                                            value: 0,
                                            message: "Vốn điều lệ không thể âm",
                                        },
                                    })}
                                />
                                {errors.chartered_capital && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.chartered_capital.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-3 col-span-2">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Địa chỉ *
                                </label>
                                <InputText
                                    id="address"
                                    className={`w-full p-3 text-sm ${
                                        errors.address ? "border-red-500" : ""
                                    }`}
                                    defaultValue={dataBusiness?.data?.address}
                                    {...register("address", {
                                        required: "Địa chỉ là bắt buộc",
                                    })}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số điện thoại *
                                </label>
                                <InputText
                                    type="tel"
                                    id="phone"
                                    className={`w-full p-3 text-sm ${
                                        errors.phone ? "border-red-500" : ""
                                    }`}
                                    defaultValue={dataBusiness?.data?.phone}
                                    {...register("phone", {
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message:
                                                "Số điện thoại không hợp lệ",
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email *
                                </label>
                                <InputText
                                    type="email"
                                    id="email"
                                    className={`w-full p-3 text-sm ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    defaultValue={dataBusiness?.data?.email}
                                    {...register("email", {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Email không hợp lệ",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="website"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Website
                                </label>
                                <InputText
                                    id="website"
                                    className={`w-full p-3 text-sm ${
                                        errors.website ? "border-red-500" : ""
                                    }`}
                                    defaultValue={dataBusiness?.data?.website}
                                    {...register("website", {
                                        pattern: {
                                            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                            message: "Website không hợp lệ",
                                        },
                                    })}
                                />
                                {errors.website && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.website.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="created_at"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày đăng ký *
                                </label>
                                <InputText
                                    type="date"
                                    id="created_at"
                                    className={`w-full p-3 text-sm ${
                                        errors.created_at
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    defaultValue={
                                        dataBusiness?.data?.created_at
                                            ? new Date(
                                                  dataBusiness.data.created_at,
                                              )
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    {...register("created_at", {
                                        required: "Ngày đăng ký là bắt buộc",
                                    })}
                                />
                                {errors.created_at && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.created_at.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="type_of_organization"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Loại hình doanh nghiệp *
                                </label>
                                <Dropdown
                                    value={selectedType}
                                    options={dataTypeOfOrganization?.data.map(
                                        (type: {
                                            name: string;
                                            id: string;
                                        }) => ({
                                            label: type.name,
                                            value: type.id,
                                        }),
                                    )}
                                    placeholder="Loại hình doanh nghiệp"
                                    className="w-full md:w-full"
                                    panelClassName="max-w-[30rem] md:max-w-[35rem] overflow-x-auto"
                                    onChange={(e) => {
                                        setSelectedType(e.value);
                                        setValue(
                                            "type_of_organization",
                                            e.value,
                                        );
                                    }}
                                />
                                {errors.type_of_organization && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.type_of_organization.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label
                                    htmlFor="number_of_employees"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số nhân viên
                                </label>
                                <div className="relative">
                                    <InputText
                                        type="number"
                                        id="number_of_employees"
                                        className="w-full p-3 pr-16 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        defaultValue={
                                            dataBusiness?.data
                                                ?.number_of_employees
                                        }
                                        disabled
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-3">
                                        <FaEye
                                            className="text-gray-600 size-4 hover:text-blue-600 cursor-pointer"
                                            onClick={handleOpenEmployeeModal}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái hoạt động *
                                </label>
                                <div className="flex gap-4 items-center">
                                    <div className="flex items-center h-16">
                                        <input
                                            type="radio"
                                            id="status_active"
                                            className="size-6 hover:cursor-pointer"
                                            value="active"
                                            defaultChecked={
                                                dataBusiness?.data?.status ===
                                                "active"
                                            }
                                            {...register("status", {
                                                required:
                                                    "Trạng thái hoạt động là bắt buộc",
                                            })}
                                        />
                                        <label
                                            htmlFor="status_active"
                                            className="ml-2 text-sm"
                                        >
                                            Đang HĐ
                                        </label>
                                    </div>
                                    <div className="flex items-center h-16">
                                        <input
                                            type="radio"
                                            id="status_inactive"
                                            className="size-6 hover:cursor-pointer"
                                            value="inactive"
                                            defaultChecked={
                                                dataBusiness?.data?.status !==
                                                "active"
                                            }
                                            {...register("status")}
                                        />
                                        <label
                                            htmlFor="status_inactive"
                                            className="ml-2 text-sm"
                                        >
                                            Ngừng HĐ
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Business Certificate Section */}
                            <div className="md:col-span-1 col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Giấy đăng kí kinh doanh{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    {nameBusinessLicense?.length > 0 && (
                                        <button
                                            type="button"
                                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
                                            onClick={() =>
                                                handleChooseLicense(
                                                    "Giấy phép kinh doanh",
                                                )
                                            }
                                        >
                                            <FaPlus className="size-3" />
                                        </button>
                                    )}
                                </div>
                                <BoxLicenses
                                    nameBusinessLicense={nameBusinessLicense}
                                    onUploadLicense={handleUploadLicense}
                                    onRemoveLicense={handleRemoveLicense}
                                    dataBusiness={dataBusiness}
                                    acceptFile={CONSTANTS.ACCEPT_FILE}
                                    type="Giấy phép kinh doanh"
                                    isUpload={isPendingUploadLicenses}
                                    ref={businessLicenseInputRef}
                                    isRemove={isPendingRemoveLicense}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giấy phép PCCC{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    {nameFireLicense?.length > 0 && (
                                        <button
                                            type="button"
                                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
                                            onClick={() =>
                                                handleChooseLicense(
                                                    "Giấy phép PCCC",
                                                )
                                            }
                                        >
                                            <FaPlus className="size-3" />
                                        </button>
                                    )}
                                </div>
                                <BoxLicenses
                                    nameBusinessLicense={nameFireLicense}
                                    onUploadLicense={handleUploadLicense}
                                    onRemoveLicense={handleRemoveLicense}
                                    dataBusiness={dataBusiness}
                                    acceptFile={CONSTANTS.ACCEPT_FILE}
                                    type="Giấy phép PCCC"
                                    isUpload={isPendingUploadLicenses}
                                    isRemove={isPendingRemoveLicense}
                                    ref={fireLicenseInputRef}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giấy chứng nhận đủ đk về ANTT{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    {nameSecurityLicense?.length > 0 && (
                                        <button
                                            type="button"
                                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
                                            onClick={() =>
                                                handleChooseLicense(
                                                    "Giấy phép ANTT",
                                                )
                                            }
                                        >
                                            <FaPlus className="size-3" />
                                        </button>
                                    )}
                                </div>
                                <BoxLicenses
                                    nameBusinessLicense={nameSecurityLicense}
                                    onUploadLicense={handleUploadLicense}
                                    onRemoveLicense={handleRemoveLicense}
                                    dataBusiness={dataBusiness}
                                    acceptFile={CONSTANTS.ACCEPT_FILE}
                                    type="Giấy phép ANTT"
                                    isUpload={isPendingUploadLicenses}
                                    isRemove={isPendingRemoveLicense}
                                    ref={securityLicenseInputRef}
                                />
                            </div>
                            {otherLicenses?.length > 0 && (
                                <>
                                    {otherLicenses.map((license, index) => (
                                        <Fragment key={index}>
                                            <div className="md:col-span-1 col-span-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {license.type}
                                                    </label>
                                                    <button
                                                        type="button"
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
                                                        onClick={() =>
                                                            handleChooseLicense(
                                                                license.type,
                                                            )
                                                        }
                                                    >
                                                        <FaPlus className="size-3" />
                                                    </button>
                                                </div>
                                                <BoxLicenses
                                                    nameBusinessLicense={
                                                        license.name
                                                    }
                                                    onUploadLicense={
                                                        handleUploadLicense
                                                    }
                                                    onRemoveLicense={
                                                        handleRemoveLicense
                                                    }
                                                    dataBusiness={dataBusiness}
                                                    acceptFile={
                                                        CONSTANTS.ACCEPT_FILE
                                                    }
                                                    type={license.type}
                                                    isUpload={
                                                        isPendingUploadLicenses
                                                    }
                                                    isRemove={
                                                        isPendingRemoveLicense
                                                    }
                                                    ref={(el) => {
                                                        otherLicenseRefs.current[
                                                            license.type
                                                        ] = el;
                                                    }}
                                                />
                                            </div>
                                        </Fragment>
                                    ))}
                                </>
                            )}
                            <div className="md:col-span-1 col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giấy phép khác
                                    </label>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAddLicenseModal(true)
                                        }
                                        className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                    >
                                        <FaPlus className="size-4" />
                                        <span className="text-sm">
                                            Thêm giấy phép khác
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between">
                        <div className="">
                            <p className="text-sm text-red-500 italic">
                                * Tải lên giấy phép không cần nhấn nút cập nhật
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="md:w-1/6 w-full float-end px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {isPendingUpdateBusiness ? (
                                <LoadingMini />
                            ) : (
                                "Cập nhật thông tin"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <EmployeeModal
                show={showEmployeeModal}
                onHide={() => setShowEmployeeModal(false)}
                businessId={id as string}
            />
            <AddLicenseModal
                show={showAddLicenseModal}
                onHide={() => setShowAddLicenseModal(false)}
                businessId={id as string}
            />
        </>
    );
}

export default EditBusiness;
