import { useState } from "react";
import MapRender from "../components/MapRender";

const data = [
    {
        id: 1,
        name: "Công ty TNHH Thương Mại và Dịch Vụ Vận Tải Anh Tuấn",
        address: "170 An Dương Vương, Phường Nguyễn Văn Cừ, Tp. Quy Nhơn",
        lng: 109.212261,
        lat: 13.756787,
        status: "Thiếu giấy phép",
        number_of_problem: 2,
    },
    {
        id: 2,
        name: "Trường đại học Quy Nhơn",
        address: "170 An Dương Vương, Phường Nguyễn Văn Cừ, Tp. Quy Nhơn",
        lng: 109.21726386495172,
        lat: 13.75939655,
        status: "Bình thường",
        number_of_problem: 0,
    },
];

function Map() {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

    const handleItemHover = (id: number | null) => {
        setHoveredItemId(id);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Bản đồ</h1>
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full lg:w-2/3">
                    <MapRender data={data} hoveredItemId={hoveredItemId}/>
                </div>
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                    <div className="max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar px-4">
                        <h2 className="text-xl font-bold mb-2">
                            Danh sách doanh nghiệp
                        </h2>
                        <ul className="space-y-2">
                            {data.map((item) => (
                                <li
                                    key={item.id}
                                    onMouseEnter={() => handleItemHover(item.id)}
                                    onMouseLeave={() => handleItemHover(null)}
                                    className="border p-4 rounded-lg cursor-default shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-400 h-auto"
                                >
                                    <h3 className="font-bold text-lg mb-3 text-gray-800 line-clamp-2">{item.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        <i className="fas fa-map-marker-alt"></i>{item.address}
                                    </p>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <p className="text-sm mb-2">
                                            Trạng thái:{" "}
                                            <span
                                                className={`font-medium px-2 py-1 rounded-full ${
                                                    item.status === "Bình thường"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </p>
                                        {item.number_of_problem > 0 && (
                                            <p className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                                Số vấn đề: {item.number_of_problem}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;
