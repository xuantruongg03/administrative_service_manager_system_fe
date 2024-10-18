import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { useParams } from "react-router-dom";
import AddEmployeeModal from "../components/AddEmployeeModal";
import LoadingMini from "../components/LoadingMini";
import useCreateEmployeeByExcel from "../hooks/useCreateEmployeeByExcel";
import businessService from "../services/business";
import typeOfOrganizationService from "../services/typeOfOrganization";
import Loading from "./Loading";
import useUpdateBusiness from "../hooks/useUpdateBusiness";
import { BusinessDataApiRequest } from "../interfaces/api";

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
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const { code } = useParams();
    const queryClient = useQueryClient();

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

    const { createEmployees, isPending: isPendingCreateEmployees } =
        useCreateEmployeeByExcel();

    const onSubmit = handleSubmit((data) => {
        updateBusiness({ businessCode: code as string, data });
    });

    const handleUploadEmployee = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await createEmployees({ file, businessCode: code as string });
            queryClient.invalidateQueries({ queryKey: ["getBusinessById", code] });
        }
    };

    if (isLoadingBusiness || isLoadingTypeOfOrganization) return <Loading />;

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* Edit business information */}
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                        Thông tin doanh nghiệp
                    </h2>
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={onSubmit}
                    >
                        <div>
                            <label
                                htmlFor="code"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mã số doanh nghiệp
                            </label>
                            <InputText
                                id="code"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.code}
                                {...register("code")}
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="name_vietnamese"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tên tiếng việt
                            </label>
                            <InputText
                                id="name_vietnamese"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={
                                    dataBusiness?.data?.name_vietnamese
                                }
                                {...register("name_vietnamese")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="name_english"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tên tiếng anh
                            </label>
                            <InputText
                                id="name_english"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.name_english}
                                {...register("name_english")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="name_acronym"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tên viết tắt
                            </label>
                            <InputText
                                id="name_acronym"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.name_acronym}
                                {...register("name_acronym")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="chartered_capital"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Vốn điều lệ
                            </label>
                            <InputText
                                type="number"
                                id="chartered_capital"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={
                                    dataBusiness?.data?.chartered_capital
                                }
                                {...register("chartered_capital")}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Địa chỉ
                            </label>
                            <InputText
                                id="address"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.address}
                                {...register("address")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Số điện thoại
                            </label>
                            <InputText
                                type="tel"
                                id="phone"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.phone}
                                {...register("phone")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <InputText
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.email}
                                {...register("email")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="website"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Website
                            </label>
                            <InputText
                                id="website"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.website}
                                {...register("website")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="legal_representative"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Người đại diện pháp luật
                            </label>
                            <InputText
                                id="legal_representative"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={
                                    dataBusiness?.data?.legal_representative
                                }
                                {...register("legal_representative")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="created_at"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Ngày đăng ký
                            </label>
                            <InputText
                                type="date"
                                id="created_at"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue={dataBusiness?.data?.created_at ? new Date(dataBusiness.data.created_at).toISOString().split('T')[0] : ''}
                                {...register("created_at")}
                            />
                        </div>
                        <div>
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

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                                {isPendingUpdateBusiness ? <LoadingMini /> : "Cập nhật thông tin"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Employee management */}
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-1/2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                            Nhân viên
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center"
                                onClick={() => setShowAddEmployeeModal(true)}
                            >
                                <FaPlus className="" />
                            </button>
                            {isPendingCreateEmployees ? (
                                <div className="flex items-center px-4 py-2">
                                    <LoadingMini />
                                </div>
                            ) : (
                                <label
                                    htmlFor="upload-employees"
                                    className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center cursor-pointer custom-tooltip-btn-upload"
                                >
                                    <LuUpload />
                                </label>
                            )}
                            <input
                                id="upload-employees"
                                type="file"
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleUploadEmployee}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left sm:text-sm text-xs font-medium text-gray-500 tracking-wider">
                                        Tên nhân viên
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left sm:text-sm text-xs font-medium text-gray-500 tracking-wider">
                                        Vị trí
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left sm:text-sm text-xs font-medium text-gray-500 tracking-wider">
                                        Căn cước
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left sm:text-sm text-xs font-medium text-gray-500 tracking-wider">
                                        SĐT
                                    </th>
                                    <th scope="col" className=" text-right sm:text-sm text-xs font-medium text-gray-500 tracking-wider">
                                       
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dataBusiness?.data?.employee.map((employee: any, index: number) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {employee.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {employee.position}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {employee.citizen_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {employee.phone}
                                        </td>
                                        <td className="pr-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddEmployeeModal
                show={showAddEmployeeModal}
                onHide={() => setShowAddEmployeeModal(false)}
            />
        </>
    );
}

export default EditBusiness;
