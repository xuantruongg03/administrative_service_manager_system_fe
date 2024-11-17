import SliderImages from "../components/SliderImages";

function Docs() {
    return (
        <div className=" pt-20 ">
            {/* Fixed Header */}
            <div className="fixed top-20 left-7 right-0 bg-white border-b z-20">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Hướng dẫn sử dụng
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                        Tìm hiểu cách sử dụng sản phẩm của chúng tôi
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Fixed Sidebar */}
                <div className="hidden md:block">
                    <div className="fixed pt-2 w-[240px]">
                        <nav className="space-y-1 bg-white rounded-lg shadow-sm">
                            <a
                                href="#upload-data"
                                className="block px-4 py-2 hover:bg-gray-50 rounded-md text-gray-700 hover:text-gray-900"
                            >
                                Tải dữ liệu lên
                            </a>
                            <a
                                href="#business-management"
                                className="block px-4 py-2 hover:bg-gray-50 rounded-md text-gray-700 hover:text-gray-900"
                            >
                                Quản lý doanh nghiệp
                            </a>
                            <a
                                href="#document-management"
                                className="block px-4 py-2 hover:bg-gray-50 rounded-md text-gray-700 hover:text-gray-900"
                            >
                                Quản lý tài liệu
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Mobile Sidebar */}
                <div className="md:hidden sticky top-20 bg-white p-4 rounded-lg shadow-sm mb-6 z-10">
                    <nav className="flex flex-wrap gap-2">
                        <a
                            href="#upload-data"
                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md text-sm"
                        >
                            Tải dữ liệu lên
                        </a>
                        <a
                            href="#features"
                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md text-sm"
                        >
                            Tính năng
                        </a>
                    </nav>
                </div>

                {/* Main Content */}
                <main className="min-w-0">
                    <div className="bg-white pt-2 rounded-lg shadow-sm">
                        {/* Upload Data Section */}
                        <section id="upload-data" className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">
                                Hướng dẫn tải dữ liệu doanh nghiệp lên
                            </h2>
                            <div className="space-y-8">
                                {/* Bước 1 */}
                                <div className="border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4">
                                        Bước 1: Chuẩn bị dữ liệu
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-700">
                                            Đảm bảo dữ liệu của bạn đáp ứng các
                                            yêu cầu sau:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                                            <li>
                                                File định dạng .xlsx, .csv hoặc
                                                .txt
                                            </li>
                                            <li>Kích thước tối đa: 10MB</li>
                                            <li>
                                                Đúng format template (tải
                                                template mẫu bên dưới)
                                            </li>
                                        </ul>
                                        <div className="mt-4">
                                            <a
                                                href="src/assets/template/template_upload_businesses.xlsx"
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    />
                                                </svg>
                                                Tải template mẫu
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Bước 2 */}
                                <div className="border rounded-lg p-6 flex flex-row justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium mb-4">
                                            Bước 2: Tải dữ liệu lên hệ thống
                                        </h3>
                                        <div className="space-y-4">
                                            <p className="text-gray-700">
                                                Thực hiện các bước sau để tải dữ
                                                liệu:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                                <li>
                                                    Nhấn vào nút "Nhập" ở góc
                                                    phải màn hình
                                                </li>
                                                <li>
                                                    Chọn file dữ liệu từ máy
                                                    tính của bạn
                                                </li>
                                                <li>
                                                    Hệ thống sẽ tự động xử lý và hiển thị kết quả
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="">
                                        <SliderImages
                                            images={[
                                                "src/assets/docs/upload_business/step_1.jpg",
                                                "src/assets/docs/upload_business/step_2.png",
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Lưu ý quan trọng */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium mb-3 text-yellow-800">
                                        Lưu ý quan trọng
                                    </h3>
                                    <ul className="list-disc list-inside text-yellow-700 space-y-2">
                                        <li>
                                            Đảm bảo không đóng trình duyệt trong
                                            quá trình tải lên
                                        </li>
                                        <li>
                                            Kiểm tra kỹ dữ liệu trước khi xác
                                            nhận
                                        </li>
                                        <li>
                                            Nếu gặp lỗi, vui lòng thử lại hoặc
                                            liên hệ hỗ trợ
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Business Management Section */}
                        <section id="business-management" className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">
                                Quản lý doanh nghiệp
                            </h2>

                            <div className="space-y-8">
                                {/* Chỉnh sửa thông tin */}
                                <div className="border rounded-lg p-6 flex flex-row justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium mb-4">
                                            Chỉnh sửa thông tin
                                        </h3>
                                        <div className="space-y-4">
                                            <p className="text-gray-700">
                                                Cập nhật thông tin doanh nghiệp:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                                <li>
                                                    Tìm doanh nghiệp cần chỉnh
                                                    sửa
                                                </li>
                                                <li>
                                                    Click vào biểu tượng "Chỉnh
                                                    sửa" (hình bút chì)
                                                </li>
                                                <li>
                                                    Cập nhật thông tin cần thiết
                                                </li>
                                                <li>
                                                    Nhấn "Lưu thay đổi" để hoàn
                                                    tất
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="">
                                        <SliderImages
                                            images={[
                                                "src/assets/docs/edit_business/step_1.png",
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Quản lý nhân viên */}
                                <div className="border rounded-lg p-6 flex flex-row justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium mb-4">
                                            Quản lý nhân viên
                                        </h3>
                                        <div className="space-y-4">
                                            <p className="text-gray-700">
                                                Thêm và quản lý nhân viên:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                                <li>
                                                    Mở chi tiết doanh nghiệp
                                                </li>
                                                <li>
                                                    Chuyển đến tab "Nhân viên"
                                                </li>
                                                <li>
                                                    Click "Thêm nhân viên" để
                                                    thêm mới
                                                </li>
                                                <li>
                                                    Nhập thông tin nhân viên:
                                                    <ul className="list-disc list-inside ml-4 mt-2">
                                                        <li>CCCD/CMND</li>
                                                        <li>Họ tên</li>
                                                        <li>Chức vụ</li>
                                                        <li>
                                                            Thông tin liên hệ
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ol>
                                            <h5 className="text-red-500 text-sm mt-2">
                                                * Bạn có thể tải file excel để
                                                nhập nhanh thông tin nhân viên
                                            </h5>
                                            <a
                                                href="src/assets/template/template_upload_employees.xlsx"
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    />
                                                </svg>
                                                Tải template mẫu
                                            </a>
                                        </div>
                                    </div>
                                    <div className="">
                                        <SliderImages
                                            images={[
                                                "src/assets/docs/edit_employees/step_1.png",
                                                "src/assets/docs/edit_employees/step_2.png",
                                                "src/assets/docs/edit_employees/step_3.png",
                                                "src/assets/docs/edit_employees/upload_employees.png",
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Document Management Section */}
                        <section id="document-management" className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">
                                Quản lý tài liệu
                            </h2>

                            <div className="space-y-8">
                                {/* Tải lên tài liệu */}
                                <div className="border rounded-lg p-6 flex flex-row justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium mb-4">
                                            Tải lên tài liệu
                                        </h3>
                                        <div className="space-y-4">
                                            <p className="text-gray-700">
                                                Các bước tải lên tài liệu mới:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                                <li>
                                                    Chọn loại tài liệu cần tải
                                                    lên
                                                </li>
                                                <li>Click vào nút "Tải lên"</li>
                                                <li>
                                                    Chọn file từ máy tính
                                                    <ul className="list-disc list-inside ml-4 mt-2">
                                                        <li>
                                                            Định dạng: PDF,
                                                            Word, hình ảnh
                                                        </li>
                                                        <li>
                                                            Kích thước tối đa:
                                                            10MB
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    Kiểm tra và xác nhận tải lên
                                                </li>
                                            </ol>
                                            <h5 className="text-red-500 text-sm mt-2">
                                                * Bạn có thể tải nhiều file cho cùng 1 tài liệu
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <SliderImages
                                            images={[
                                                "src/assets/docs/upload_license/upload_multiple.png",
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Docs;
