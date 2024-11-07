import { useQuery } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeModal from "../components/EmployeeModal";
import LoadingMini from "../components/LoadingMini";
import useRemoveLicense from "../hooks/useRemoveLicense";
import useUpdateBusiness from "../hooks/useUpdateBusiness";
import useUploadBusinessLicense from "../hooks/useUploadBusinessLicense";
import useUploadFirePreventionLicense from "../hooks/useUploadFirePreventionLicense";
import useUploadSecurityLicense from "../hooks/useUploadSecurityLicense";
import { BusinessDataApiRequest, LicenseDataApi } from "../interfaces/api";
import businessService from "../services/business";
import typeOfOrganizationService from "../services/typeOfOrganization";
import Loading from "./Loading";
import { REGEX } from "../utils/regex";
import { CONSTANTS } from "../utils/constants";
import { Dropdown } from "primereact/dropdown";

const getBusinessByIdReq = async (id: string) => {
    const response = await businessService.getBusinessById(id);
    return response;
};

const getTypeOfOrganizationReq = async () => {
    const response = await typeOfOrganizationService.getTypeOfOrganization();
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
    const [fileBusinessLicense, setFileBusinessLicense] = useState<File | null>(
        null,
    );
    const [fileFirePreventionLicense, setFileFirePreventionLicense] =
        useState<File | null>(null);
    const [fileSecurityLicense, setFileSecurityLicense] = useState<File | null>(
        null,
    );
    const [nameFirePreventionLicense, setNameFirePreventionLicense] = useState<
        string | null
    >(null);
    const [nameBusinessLicense, setNameBusinessLicense] = useState<
        string | null
    >(null);
    const [nameSecurityLicense, setNameSecurityLicense] = useState<
        string | null
    >(null);
    const { id } = useParams();
    const [selectedType, setSelectedType] = useState("");

    const { isLoading: isLoadingBusiness, data: dataBusiness } = useQuery({
        queryKey: ["getBusinessById", id],
        queryFn: () => getBusinessByIdReq(id as string),
    });

    //Hooks
    const { updateBusiness, isPending: isPendingUpdateBusiness } =
        useUpdateBusiness();
    const { uploadBusinessLicense, isPending: isPendingUploadBusinessLicense } =
        useUploadBusinessLicense();
    const {
        uploadFirePreventionLicense,
        isPending: isPendingUploadFirePreventionLicense,
    } = useUploadFirePreventionLicense();
    const { uploadSecurityLicense, isPending: isPendingUploadSecurityLicense } =
        useUploadSecurityLicense();
    const { removeLicense, isPending: isPendingRemoveLicense } =
        useRemoveLicense();

    //Functions
    const handleUploadBusinessLicense = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileBusinessLicense(file);
            uploadBusinessLicense({ file, id: id as string }).then(() => {
                toast.success("Tải lên giấy đăng ký kinh doanh thành công");
            });
        }
    };

    const handleUploadFirePreventionLicense = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileFirePreventionLicense(file);
            uploadFirePreventionLicense({ file, id: id as string }).then(() => {
                toast.success("Tải lên giấy phép PCCC thành công");
            });
        }
    };

    const handleUploadSecurityLicense = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileSecurityLicense(file);
            uploadSecurityLicense({ file, id: id as string }).then(() => {
                toast.success(
                    "Tải lên giấy chứng nhận đủ điều kiện về ANTT thành công",
                );
            });
        }
    };

    const handleRemoveLicense = (licenseId: string, type: string) => {
        removeLicense({ id: licenseId }).then(() => {
            toast.success("Xóa giấy tờ thành công");
        });
        if (type === "Business License") {
            setFileBusinessLicense(null);
            setNameBusinessLicense(null);
        }
        if (type === "Fire Prevention License") {
            setFileFirePreventionLicense(null);
            setNameFirePreventionLicense(null);
        }
        if (type === "Security License") {
            setFileSecurityLicense(null);
            setNameSecurityLicense(null);
        }
    };

    const {
        isLoading: isLoadingTypeOfOrganization,
        data: dataTypeOfOrganization,
    } = useQuery({
        queryKey: ["getTypeOfOrganization"],
        queryFn: () => getTypeOfOrganizationReq(),
    });

    const onSubmit = handleSubmit((data) => {
        updateBusiness({ id: id as string, data }).then(() => {
            toast.success("Cập nhật thông tin thành công");
        });
    });

    const handleOpenEmployeeModal = () => {
        setShowEmployeeModal(true);
    };

    useEffect(() => {
        if (
            dataBusiness?.data?.licenses?.find(
                (license: LicenseDataApi) =>
                    license.type === CONSTANTS.LICENSE_TYPE.FIRE,
            )
        ) {
            setNameFirePreventionLicense(
                dataBusiness?.data?.licenses?.find(
                    (license: LicenseDataApi) =>
                        license.type === CONSTANTS.LICENSE_TYPE.FIRE,
                )?.name,
            );
        }
        if (
            dataBusiness?.data?.licenses?.find(
                (license: LicenseDataApi) =>
                    license.type === CONSTANTS.LICENSE_TYPE.BUSINESS,
            )
        ) {
            setNameBusinessLicense(
                dataBusiness?.data?.licenses?.find(
                    (license: LicenseDataApi) =>
                        license.type === CONSTANTS.LICENSE_TYPE.BUSINESS,
                )?.name,
            );
        }
        if (
            dataBusiness?.data?.licenses?.find(
                (license: LicenseDataApi) =>
                    license.type === CONSTANTS.LICENSE_TYPE.SECURITY,
            )
        ) {
            setNameSecurityLicense(
                dataBusiness?.data?.licenses?.find(
                    (license: LicenseDataApi) =>
                        license.type === CONSTANTS.LICENSE_TYPE.SECURITY,
                )?.name,
            );
        }
        setSelectedType(dataBusiness?.data?.type_of_organization);
    }, [dataBusiness?.data?.licenses, dataBusiness?.data?.type_of_organization]);

    if (isLoadingBusiness || isLoadingTypeOfOrganization) return <Loading />;

    return (
        <>
            <div className="flex flex-col gap-8 p-6 bg-gray-100 rounded-lg shadow-md">
                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Legal Representative & Owner Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="legal_representative.citizen_id"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="legal_representative.citizen_id"
                                            className={`w-full p-3 text-sm ${
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
                                            className={`w-full p-3 text-sm ${
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
                                            className={`w-full p-3 text-sm ${
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
                                        <select
                                            id="legal_representative.gender"
                                            className={`w-full p-3 border rounded-md ${
                                                errors.legal_representative
                                                    ?.gender
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data
                                                    ?.legal_representative
                                                    .gender
                                            }
                                            {...register(
                                                "legal_representative.gender",
                                                {
                                                    required:
                                                        "Giới tính là bắt buộc",
                                                },
                                            )}
                                        >
                                            <option value="">
                                                Chọn giới tính
                                            </option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
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
                                            className={`w-full p-3 text-sm ${
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
                                            className="w-full p-3 text-sm"
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
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="legal_representative.hometown"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="legal_representative.hometown"
                                            className={`w-full p-3 text-sm ${
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
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="legal_representative.current_address"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="legal_representative.current_address"
                                            className={`w-full p-3 text-sm ${
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

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Thông tin chủ sở hữu
                                </h2>
                                <input
                                    type="hidden"
                                    {...register("owner.id")}
                                    value={dataBusiness?.data?.owner.id}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="owner.citizen_id"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="owner.citizen_id"
                                            className={`w-full p-3 text-sm ${
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
                                            className={`w-full p-3 text-sm ${
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
                                            className={`w-full p-3 text-sm ${
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
                                        <select
                                            id="owner.gender"
                                            className={`w-full p-3 border rounded-md ${
                                                errors.owner?.gender
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            defaultValue={
                                                dataBusiness?.data?.owner.gender
                                            }
                                            {...register("owner.gender", {
                                                required:
                                                    "Giới tính là bắt buộc",
                                            })}
                                        >
                                            <option value="">
                                                Chọn giới tính
                                            </option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
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
                                            className={`w-full p-3 text-sm ${
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
                                            className="w-full p-3 text-sm"
                                            defaultValue={
                                                dataBusiness?.data?.owner
                                                    .religion
                                            }
                                            {...register("owner.religion")}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="owner.hometown"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="owner.hometown"
                                            className={`w-full p-3 text-sm ${
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
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="owner.current_address"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="owner.current_address"
                                            className={`w-full p-3 text-sm ${
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                                        required: "Vốn điều lệ là bắt buộc",
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-1 col-span-1">
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
                                        setValue("type_of_organization", e.value);
                                    }}
                                />
                                {errors.type_of_organization && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.type_of_organization.message}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-1 col-span-1">
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
                            <div className="md:col-span-2 col-span-1">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giấy đăng kí kinh doanh
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="business_license"
                                        className="hidden"
                                        accept={CONSTANTS.ACCEPT_FILE}
                                        onChange={handleUploadBusinessLicense}
                                    />
                                    {fileBusinessLicense ||
                                    nameBusinessLicense ? (
                                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md w-full">
                                            <span
                                                className="text-sm truncate hover:text-clip"
                                                title={
                                                    fileBusinessLicense?.name ||
                                                    nameBusinessLicense ||
                                                    ""
                                                }
                                            >
                                                {fileBusinessLicense?.name ||
                                                    nameBusinessLicense}
                                            </span>
                                            <div className="flex items-center flex-shrink-0">
                                                {isPendingRemoveLicense ? (
                                                    <LoadingMini />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => {
                                                            setFileBusinessLicense(
                                                                null,
                                                            );
                                                            handleRemoveLicense(
                                                                dataBusiness?.data?.licenses?.find(
                                                                    (
                                                                        license: LicenseDataApi,
                                                                    ) =>
                                                                        license.type ===
                                                                        "Business License",
                                                                )?.id,
                                                                "Business License",
                                                            );
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="business_license"
                                            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer w-full"
                                        >
                                            {isPendingUploadBusinessLicense ? (
                                                <LoadingMini />
                                            ) : (
                                                <>
                                                    <FiUpload className="size-4 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        Tải lên giấy đăng kí
                                                        kinh doanh
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giấy phép PCCC
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="fire_prevention_license"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        onChange={
                                            handleUploadFirePreventionLicense
                                        }
                                    />
                                    {fileFirePreventionLicense ||
                                    nameFirePreventionLicense ? (
                                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md w-full">
                                            <span
                                                className="text-sm truncate hover:text-clip"
                                                title={
                                                    fileFirePreventionLicense?.name ||
                                                    nameFirePreventionLicense ||
                                                    ""
                                                }
                                            >
                                                {fileFirePreventionLicense?.name ||
                                                    nameFirePreventionLicense}
                                            </span>
                                            <div className="flex items-center flex-shrink-0">
                                                {isPendingRemoveLicense ? (
                                                    <LoadingMini />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => {
                                                            setFileFirePreventionLicense(
                                                                null,
                                                            );
                                                            handleRemoveLicense(
                                                                dataBusiness?.data?.licenses?.find(
                                                                    (
                                                                        license: LicenseDataApi,
                                                                    ) =>
                                                                        license.type ===
                                                                        "Fire Prevention License",
                                                                )?.id,
                                                                "Fire Prevention License",
                                                            );
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="fire_prevention_license"
                                            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer w-full"
                                        >
                                            {isPendingUploadFirePreventionLicense ? (
                                                <LoadingMini />
                                            ) : (
                                                <>
                                                    <FiUpload className="size-4 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        Tải lên giấy phép PCCC
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giấy chứng nhận đủ đk về ANTT
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="security_license"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        onChange={handleUploadSecurityLicense}
                                    />
                                    {fileSecurityLicense ||
                                    nameSecurityLicense ? (
                                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md w-full">
                                            <span
                                                className="text-sm truncate hover:text-clip"
                                                title={
                                                    fileSecurityLicense?.name ||
                                                    nameSecurityLicense ||
                                                    ""
                                                }
                                            >
                                                {fileSecurityLicense?.name ||
                                                    nameSecurityLicense}
                                            </span>
                                            <div className="flex items-center flex-shrink-0">
                                                {isPendingRemoveLicense ? (
                                                    <LoadingMini />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => {
                                                            setFileSecurityLicense(
                                                                null,
                                                            );
                                                            handleRemoveLicense(
                                                                dataBusiness?.data?.licenses?.find(
                                                                    (
                                                                        license: LicenseDataApi,
                                                                    ) =>
                                                                        license.type ===
                                                                        "Security License",
                                                                )?.id,
                                                                "Security License",
                                                            );
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="security_license"
                                            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer w-full"
                                        >
                                            {isPendingUploadSecurityLicense ? (
                                                <LoadingMini />
                                            ) : (
                                                <>
                                                    <FiUpload className="size-4 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        Tải lên giấy chứng nhận
                                                        đủ đk về ANTT
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                    )}
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
        </>
    );
}

export default EditBusiness;
