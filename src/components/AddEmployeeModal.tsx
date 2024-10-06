import { AddEmployeeModalProps } from "../interfaces";

function AddEmployeeModal(props: AddEmployeeModalProps) {
    const { show, onHide } = props;

    return (
        <>
            {show && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Thêm nhân viên mới</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="nameEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên nhân viên
                                </label>
                                <input
                                    type="text"
                                    id="nameEmployee"
                                    name="nameEmployee"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                                    Vị trí
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emailEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="emailEmployee"
                                    name="emailEmployee"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phoneEmployee"
                                    name="phoneEmployee"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
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
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Thêm nhân viên
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddEmployeeModal;
