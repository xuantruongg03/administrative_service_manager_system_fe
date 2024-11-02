import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUpdateEmployee from "../hooks/useUpdateEmployee";
import { EmployeeModalProps } from "../interfaces";
import RootState from "../interfaces/rootState";
import { CONSTANTS } from "../utils/constants";
import { REGEX } from "../utils/regex";

function EditEmployeeModal(props: EmployeeModalProps) {
    const { show, onHide, businessId } = props;
    const { citizen_id, name, position, phone, start_date } = useSelector((state: RootState) => state.editEmployee);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const queryClient = useQueryClient();

    const { updateEmployee, isPending } = useUpdateEmployee();

    const onSubmit = handleSubmit(async (data) => {
        const formattedData = {
            start_date: dayjs(data.start_date).format(
                CONSTANTS.DATE_DEFAULT_FORMAT,
            ),
            citizen_id: citizen_id,
            name: data.name,
            position: data.position,
            phone: data.phone,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        try {
            await updateEmployee({ data: formattedData, citizen_id, businessId });
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            onHide();
            toast.success("Cập nhật nhân viên thành công");
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        reset();
    }, [reset, show]);

    return (
        <>
            {show && (
                <div className="fixed inset-0 z-10001 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative animate-zoom-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Chỉnh sửa nhân viên
                        </h2>
                        <form className="" onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="citizen_id"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Căn cước công dân
                                </label>
                                <input
                                    type="text"
                                    id="citizen_id"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-not-allowed bg-gray-100"
                                    disabled
                                    defaultValue={citizen_id}
                                />
                                {/* {errors.citizen_id && (
                                    <p className="mt-1 text-xs text-red-600 font-semibold">
                                        {errors.citizen_id.message?.toString()}
                                    </p>
                                )} */}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên nhân viên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                                        errors.name
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    {...register("name", {
                                        required: "Vui lòng nhập tên nhân viên",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Tên phải có ít nhất 2 ký tự",
                                        },
                                    })}
                                    placeholder="Nhập tên nhân viên"
                                    defaultValue={name}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-600 font-semibold">
                                        {errors.name.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Vị trí
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                                        errors.position
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    {...register("position", {
                                        required: "Vui lòng nhập vị trí",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Vị trí phải có ít nhất 2 ký tự",
                                        },
                                    })}
                                    placeholder="Nhập vị trí"
                                    defaultValue={position}
                                />
                                {errors.position && (
                                    <p className="mt-1 text-xs text-red-600 font-semibold">
                                        {errors.position.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                                        errors.phone
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    {...register("phone", {
                                        required: "Vui lòng nhập số điện thoại",
                                        pattern: {
                                            value: REGEX.PHONE,
                                            message:
                                                "Số điện thoại phải có 10 chữ số",
                                        },
                                    })}
                                    placeholder="Nhập số điện thoại"
                                    defaultValue={phone}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-600 font-semibold">
                                        {errors.phone.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày bắt đầu
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                                        errors.start_date
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    {...register("start_date", {
                                        required: "Vui lòng nhập ngày bắt đầu",
                                    })}
                                    placeholder="Nhập ngày bắt đầu"
                                    defaultValue={dayjs(start_date).format('YYYY-MM-DD')}
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-xs text-red-600 font-semibold">
                                        {errors.start_date.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onHide}
                                    className="mr-2 px-4 py-2 text-sm font-medium focus:border-none text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                        isPending
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {isPending
                                        ? "Đang cập nhật..."
                                        : "Cập nhật"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditEmployeeModal;