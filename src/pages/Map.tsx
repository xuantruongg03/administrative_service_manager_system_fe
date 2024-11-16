import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import LoadingMini from "../components/LoadingMini";
import MapRenderLeaflet from "../components/MapRenderLeaflet";
import { BusinessMap } from "../interfaces";
import businessService from "../services/business";
import { CONSTANTS } from "../utils/constants";
import Loading from "./Loading";

const getListBusinessReq = async (params: { page: number; limit: number }) => {
    const res = await businessService.getBusinessMap(params);
    return res.data;
};

const getMapMarker = async () => {
    const res = await businessService.getMapMarker();
    return res;
};

function Map() {
    const [listBusiness, setListBusiness] = useState<BusinessMap[]>([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const dispatch = useDispatch();
    const [selectedStreet, setSelectedStreet] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [filteredMarkers, setFilteredMarkers] = useState<BusinessMap[]>([]);
    const [filteredList, setFilteredList] = useState<BusinessMap[]>([]);

    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ["business-map"],
        queryFn: ({ pageParam = 1 }) =>
            getListBusinessReq({
                page: pageParam,
                limit: CONSTANTS.LIMIT_BUSINESS,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.isLastPage) {
                return undefined;
            }
            return lastPage.currentPage + 1;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
    });

    const { isLoading: isLoadingMapMarker, data: dataMapMarker } = useQuery({
        queryKey: ["map-marker"],
        queryFn: () => getMapMarker(),
    });

    const markerMemo = useMemo(() => {
        return dataMapMarker?.data;
    }, [dataMapMarker]);

    const uniqueStreets = useMemo(() => {
        if (!dataMapMarker?.data) return [];
        const streets = dataMapMarker.data.map((item: { address: string }) => {
            const addressParts = item.address.split(",");
            return addressParts[0].split(" ").slice(1).join(" ");
        });
        return Array.from(new Set(streets)).sort() as string[];
    }, [dataMapMarker]);

    useEffect(() => {
        if (data) {
            setListBusiness(data.pages.flatMap((page) => page.data));
            setIsLastPage(data.pages[data.pages.length - 1].isLastPage);
        }
    }, [data, dataMapMarker]);

    useEffect(() => {
        if (!listBusiness || !markerMemo) return;
        
        let filtered = [...listBusiness];
        let filteredMarker = [...markerMemo];

        if (selectedStatus) {
            filtered = filtered.filter(item => item.status === selectedStatus);
            filteredMarker = filteredMarker.filter(item => item.status === selectedStatus);
        }

        if (selectedStreet) {
            filtered = filtered.filter(item => {
                const addressParts = item.address.split(',');
                const street = addressParts[0].split(' ').slice(1).join(' ');
                return street === selectedStreet;
            });
            filteredMarker = filteredMarker.filter(item => {
                const addressParts = item.address.split(',');
                const street = addressParts[0].split(' ').slice(1).join(' ');
                return street === selectedStreet;
            });
        }

        setFilteredList(filtered);
        setFilteredMarkers(filteredMarker);
    }, [listBusiness, markerMemo, selectedStatus, selectedStreet]);

    const handleMouseEnter = useCallback(
        (code: string) => {
            dispatch({ type: "SET_HOVERMAP", payload: code });
        },
        [dispatch],
    );

    const handleChangeStatus = (status: string) => {
        setSelectedStatus(status);
    };

    const handleChangeStreet = (street: string) => {
        setSelectedStreet(street);
    };

    const handleMouseLeave = useCallback(() => {
        dispatch({ type: "RESET_HOVERMAP" });
    }, [dispatch]);

    if (isLoading || isLoadingMapMarker) {
        return <Loading />;
    }

    return (
        <div className="px-2 sm:px-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
                <h1 className="text-2xl font-bold">Bản đồ</h1>
                <div className="flex flex-wrap items-center gap-4 sm:ml-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#2ECC40]"></div>
                            <span className="text-sm text-gray-600">
                                Đầy đủ giấy phép
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF851B]"></div>
                            <span className="text-sm text-gray-600">
                                Thiếu 1 - 2 giấy phép
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF4136]"></div>
                            <span className="text-sm text-gray-600">
                                Thiếu 3 giấy phép bắt buộc
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full lg:w-2/3 h-[400px] sm:h-[500px] xl:h-[550px] 3xl:h-[700px]">
                    <MapRenderLeaflet data={selectedStatus || selectedStreet ? filteredMarkers : markerMemo} />
                </div>
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                    <div className="lg:ml-4">
                        <h2 className="text-xl font-bold mb-2">
                            Danh sách doanh nghiệp
                        </h2>
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <select
                                    className="form-select p-2 w-full rounded-lg text-sm focus:outline-none"
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        handleChangeStatus(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Trạng thái hoạt động
                                    </option>
                                    <option value="active">
                                        Đang hoạt động
                                    </option>
                                    <option value="inactive">
                                        Không hoạt động
                                    </option>
                                </select>
                                <select
                                    className="form-select p-2 w-full rounded-lg text-sm focus:outline-none"
                                    value={selectedStreet}
                                    onChange={(e) =>
                                        handleChangeStreet(e.target.value)
                                    }
                                >
                                    <option value="">Tất cả đường</option>
                                    {uniqueStreets
                                        .filter((street) => street !== "")
                                        .map(
                                            (street: string, index: number) => (
                                                <option
                                                    key={index}
                                                    value={street}
                                                >
                                                    {street}
                                                </option>
                                            ),
                                        )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={listBusiness.length}
                        next={fetchNextPage}
                        hasMore={!isLastPage}
                        loader={<LoadingMini />}
                        height="calc(100vh - 300px)"
                        className="overflow-y-auto custom-scrollbar px-0 sm:px-4"
                    >
                        <div>
                            <ul className="space-y-2">
                                {(selectedStatus || selectedStreet ? filteredList : listBusiness).map((item) => (
                                    <li
                                        key={item.code}
                                        onMouseEnter={() =>
                                            handleMouseEnter(item.code)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        className="border p-3 sm:p-4 rounded-lg cursor-default shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-400 h-auto mb-2 mx-0"
                                    >
                                        <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800 line-clamp-2">
                                            {item.name_vietnamese}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                                            <i className="fas fa-map-marker-alt"></i>
                                            {item.address}
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-between items-center">
                                            <p className="text-xs sm:text-sm">
                                                Trạng thái:{" "}
                                                <span
                                                    className={`font-medium px-2 py-1 rounded-full ${
                                                        item.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {item.status === "active"
                                                        ? "Đang hoạt động"
                                                        : "Không hoạt động"}
                                                </span>
                                            </p>
                                            {item.license_status.length > 0 && (
                                                <p className="text-xs sm:text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                                    Số vấn đề:{" "}
                                                    {item.license_status.length}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

export default Map;
