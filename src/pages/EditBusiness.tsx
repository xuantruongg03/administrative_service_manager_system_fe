import { useQuery } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EmployeeModal from "../components/EmployeeModal";
import LoadingMini from "../components/LoadingMini";
import useUpdateBusiness from "../hooks/useUpdateBusiness";
import { BusinessDataApiRequest } from "../interfaces/api";
import businessService from "../services/business";
import typeOfOrganizationService from "../services/typeOfOrganization";
import Loading from "./Loading";

const getBusinessByIdReq = async (code: string) => {
    const response = await businessService.getBusinessById(code);
    console.log(response);
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
    } = useForm<BusinessDataApiRequest>();
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const { code } = useParams();

    const { isLoading: isLoadingBusiness, data: dataBusiness } = useQuery({
        queryKey: ["getBusinessById", code],
        queryFn: () => getBusinessByIdReq(code as string),
    });

    const { updateBusiness, isPending: isPendingUpdateBusiness } = useUpdateBusiness();

    const {
        isLoading: isLoadingTypeOfOrganization,
        data: dataTypeOfOrganization,
    } = useQuery({
        queryKey: ["getTypeOfOrganization"],
        queryFn: () => getTypeOfOrganizationReq(),
    });

    const onSubmit = handleSubmit((data) => {
        updateBusiness({ businessCode: code as string, data });
    });

    const handleOpenEmployeeModal = () => {
        setShowEmployeeModal(true);
    };

    if (isLoadingBusiness || isLoadingTypeOfOrganization) return <Loading />;

    return (
        <>
            <div className="flex flex-col gap-8 p-6 bg-gray-100 rounded-lg shadow-md">
                <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Legal Representative & Owner Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Thông tin người đại diện pháp luật
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label htmlFor="legal_representative.citizen_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="legal_representative.citizen_id"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.citizen_id}
                                            {...register("legal_representative.citizen_id", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="legal_representative.name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên *
                                        </label>
                                        <InputText
                                            id="legal_representative.name"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.name}
                                            {...register("legal_representative.name", { required: true })}
                                        />
                                    </div>
                                    <div  className="col-span-1">
                                        <label htmlFor="legal_representative.birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày sinh *
                                        </label>
                                        <InputText
                                            id="legal_representative.birth_date"
                                            type="date text-sm"
                                            className="w-full p-3"
                                            defaultValue={dataBusiness?.data?.legal_representative.birth_date}
                                            {...register("legal_representative.birth_date", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="legal_representative.gender" className="block text-sm font-medium text-gray-700 mb-1">
                                            Giới tính *
                                        </label>
                                        <select
                                            id="legal_representative.gender"
                                            className="w-full p-3 border rounded-md"
                                            defaultValue={dataBusiness?.data?.legal_representative.gender}
                                            {...register("legal_representative.gender", { required: true })}
                                        >
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="legal_representative.nationality" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quốc tịch *
                                        </label>
                                        <InputText
                                            id="legal_representative.nationality"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.nationality}
                                            {...register("legal_representative.nationality", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="legal_representative.religion" className="block text-sm font-medium text-gray-700 mb-1">
                                            Tôn giáo
                                        </label>
                                        <InputText
                                            id="legal_representative.religion"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.religion}
                                            {...register("legal_representative.religion")}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="legal_representative.hometown" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="legal_representative.hometown"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.hometown}
                                            {...register("legal_representative.hometown", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="legal_representative.current_address" className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="legal_representative.current_address"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.legal_representative.current_address}
                                            {...register("legal_representative.current_address", { required: true })}
                                        />
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label htmlFor="owner.citizen_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Số CCCD *
                                        </label>
                                        <InputText
                                            id="owner.citizen_id"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.citizen_id}
                                            {...register("owner.citizen_id", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="owner.name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên *
                                        </label>
                                        <InputText
                                            id="owner.name"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.name}
                                            {...register("owner.name", { required: true })}
                                        />
                                    </div>
                                    <div  className="col-span-1">
                                        <label htmlFor="owner.birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày sinh *
                                        </label>
                                        <InputText
                                            id="owner.birth_date"
                                            type="date text-sm"
                                            className="w-full p-3"
                                            defaultValue={dataBusiness?.data?.owner.birth_date}
                                            {...register("owner.birth_date", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="owner.gender" className="block text-sm font-medium text-gray-700 mb-1">
                                            Giới tính *
                                        </label>
                                        <select
                                            id="owner.gender"
                                            className="w-full p-3 border rounded-md"
                                            defaultValue={dataBusiness?.data?.owner.gender}
                                            {...register("owner.gender", { required: true })}
                                        >
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="owner.nationality" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quốc tịch *
                                        </label>
                                        <InputText
                                            id="owner.nationality"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.nationality}
                                            {...register("owner.nationality", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="owner.religion" className="block text-sm font-medium text-gray-700 mb-1">
                                            Tôn giáo
                                        </label>
                                        <InputText
                                            id="owner.religion"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.religion}
                                            {...register("owner.religion")}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="owner.hometown" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quê quán *
                                        </label>
                                        <InputText
                                            id="owner.hometown"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.hometown}
                                            {...register("owner.hometown", { required: true })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="owner.current_address" className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ hiện tại *
                                        </label>
                                        <InputText
                                            id="owner.current_address"
                                            className="w-full p-3 text-sm"
                                            defaultValue={dataBusiness?.data?.owner.current_address}
                                            {...register("owner.current_address", { required: true })}
                                        />
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã doanh nghiệp *
                                </label>
                                <InputText
                                    id="code"
                                    readOnly
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
                                    Tên tiếng việt
                                </label>
                                <InputText
                                    id="name_vietnamese"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    defaultValue={
                                        dataBusiness?.data?.name_vietnamese
                                    }
                                    {...register("name_vietnamese")}
                                />
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
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    defaultValue={dataBusiness?.data?.name_english}
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
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    defaultValue={dataBusiness?.data?.name_acronym}
                                    {...register("name_acronym")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-1">
                                <label
                                    htmlFor="chartered_capital"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Vốn điều lệ
                                </label>
                                <InputText
                                    type="number"
                                    id="chartered_capital text-sm"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={
                                        dataBusiness?.data?.chartered_capital
                                    }
                                    {...register("chartered_capital")}
                                />
                            </div>
                            <div className="md:col-span-3 col-span-2">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Địa chỉ
                                </label>
                                <InputText
                                    id="address"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    defaultValue={dataBusiness?.data?.address}
                                    {...register("address")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-1">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số điện thoại
                                </label>
                                <InputText
                                    type="tel"
                                    id="phone text-sm"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={dataBusiness?.data?.phone}
                                    {...register("phone")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email
                                </label>
                                <InputText
                                    type="email"
                                    id="email text-sm"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={dataBusiness?.data?.email}
                                    {...register("email")}
                                />
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
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    defaultValue={dataBusiness?.data?.website}
                                    {...register("website")}
                                />
                            </div>
                            <div className="md:col-span-1 col-span-1">
                                <label
                                    htmlFor="created_at"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày đăng ký
                                </label>
                                <InputText
                                    type="date"
                                    id="created_at text-sm"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={dataBusiness?.data?.created_at ? new Date(dataBusiness.data.created_at).toISOString().split('T')[0] : ''}
                                    {...register("created_at")}
                                />
                            </div>
                            <div className="md:col-span-2 col-span-1">
                                <label
                                    htmlFor="type_of_organization"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Loại hình doanh nghiệp
                                </label>
                                <select
                                    id="type_of_organization"
                                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={
                                        dataBusiness?.data?.type_of_organization
                                    }
                                    {...register("type_of_organization")}
                                >
                                    <option value="">
                                        Chọn loại hình doanh nghiệp
                                    </option>
                                    {dataTypeOfOrganization?.data.map(
                                        (type: { name: string; id: string }) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div className="md:col-span-1 col-span-1">
                                <label
                                    htmlFor="created_at"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số nhân viên
                                </label>
                                <div className="relative">
                                    <InputText
                                        type="number"
                                        id="number_of_employees"
                                        className="w-full p-3 pr-16 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        defaultValue={dataBusiness?.data?.number_of_employees}
                                        disabled
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-3">
                                        <FaEye className="text-gray-600 size-4 hover:text-blue-600 cursor-pointer" onClick={handleOpenEmployeeModal} />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 col-span-1">
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
                                            defaultChecked={dataBusiness?.data?.status === "active"}
                                            {...register("status")}
                                        />
                                        <label htmlFor="status_active" className="ml-2 text-sm">Đang HĐ</label>
                                    </div>
                                    <div className="flex items-center h-16">
                                        <input
                                            type="radio"
                                            id="status_inactive"
                                            className="size-6 hover:cursor-pointer"
                                            value="inactive"
                                            defaultChecked={dataBusiness?.data?.status !== "active"}
                                            {...register("status")}
                                        />
                                        <label htmlFor="status_inactive" className="ml-2 text-sm">Ngừng HĐ</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <button
                            type="submit"
                            className="md:w-1/6 w-full float-end px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {isPendingUpdateBusiness ? <LoadingMini /> : "Cập nhật thông tin"}
                        </button>
                    </div>
                </form>
            </div>
            <EmployeeModal
                show={showEmployeeModal}
                onHide={() => setShowEmployeeModal(false)}
                businessCode={code as string}
            />
        </>
    );
}

export default EditBusiness;
