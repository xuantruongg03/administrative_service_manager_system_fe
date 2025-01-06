import { useQuery } from "@tanstack/react-query";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import Loading from "./pages/Loading";
import statisticService from "./services/statistic";
import { CONSTANTS } from "./utils/constants";
import dayjs from "dayjs";

const statisticReq = async (params: { timeRange: string; value: string }) => {
    const response = await statisticService.getStatistic(params);
    return response;
};

const valueOptions = [
    {
        label: "month",
        value: `${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`,
        labelDisplay: "Tháng",
    },
    {
        label: "quarter",
        value: `${Math.ceil(
            (new Date().getMonth() + 1) / 3,
        )}/${new Date().getFullYear()}`,
        labelDisplay: "Quý",
    },
    {
        label: "year",
        value: `${new Date().getFullYear()}`,
        labelDisplay: "Năm",
    },
];

function App() {
    const [timeRange, setTimeRange] = useState("month");
    const [selectedDate, setSelectedDate] = useState<Nullable<(Date | null)[]>>(
        [CONSTANTS.DATE_YESTERDAY, CONSTANTS.DATE_NOW],
    );

    const { data: statisticData, isLoading } = useQuery({
        queryKey: ["statistic", selectedDate, timeRange],
        queryFn: () =>
            statisticReq({
                timeRange,
                value:
                    timeRange === "custom"
                    ? `${dayjs(selectedDate?.[0]).format(
                        CONSTANTS.DATE_FORMAT,
                    )} - ${dayjs(selectedDate?.[1]).format(
                        CONSTANTS.DATE_FORMAT,
                    )}`
                        : valueOptions.find(
                              (option) => option.label === timeRange,
                          )?.value || "month",
            }),
        enabled:
            timeRange === "custom"
                ? !!selectedDate?.[0] && !!selectedDate?.[1]
                : ["month", "year", "quarter"].includes(timeRange),
    });

    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Thống kê</h1>
                <div className="flex gap-4 w-full md:w-auto">
                    <Dropdown
                        value={timeRange}
                        options={[
                            { label: "Tháng này", value: "month" },
                            { label: "Quý này", value: "quarter" },
                            { label: "Năm nay", value: "year" },
                            { label: "Tùy chọn", value: "custom" },
                        ]}
                        onChange={(e) => setTimeRange(e.value)}
                        placeholder="Chọn khoảng thời gian"
                        className="w-full md:w-56"
                    />
                    {timeRange === "custom" && (
                        <Calendar
                            selectionMode="range"
                            hideOnRangeSelection
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.value);
                            }}
                            className="w-full md:w-56"
                        />
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="mt-8">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="p-1">
                            <div className="text-sm font-medium text-gray-500 mb-2">
                                Tổng số doanh nghiệp
                            </div>
                            <div className="text-3xl font-bold">
                                {statisticData?.total_businesses || "-"}
                            </div>
                        </Card>
                        <Card className="p-1">
                            <div className="text-sm font-medium text-gray-500 mb-2">
                                Tổng số tài liệu
                            </div>
                            <div className="text-3xl font-bold">
                                {statisticData?.total_business_licenses || "-"}
                            </div>
                        </Card>
                        <Card className="p-1">
                            <div className="text-sm font-medium text-gray-500 mb-2">
                                Doanh nghiệp mới trong kỳ
                            </div>
                            <div className="text-3xl font-bold">
                                {statisticData?.new_businesses || "-"}
                            </div>
                        </Card>
                        <Card className="p-1">
                            <div className="text-sm font-medium text-gray-500 mb-2">
                                Doanh nghiệp thiếu giấy phép
                            </div>
                            <div className="text-3xl font-bold">
                                {statisticData?.violated_businesses || "-"}
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <Card
                            title="Doanh nghiệp theo loại hình"
                            className="p-4 flex flex-col"
                        >
                            {statisticData?.business_type_statistics?.datasets?.[0]?.data?.every(
                                (value: number) => value === 0,
                            ) ? (
                                <div className="h-[300px] flex items-center justify-center text-gray-500">
                                    Chưa có dữ liệu
                                </div>
                            ) : (
                                <Chart
                                    type="pie"
                                    data={statisticData?.business_type_statistics}
                                    className="w-full h-[300px]"
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "right",
                                                align: "center",
                                                labels: {
                                                    boxWidth: 15,
                                                    boxHeight: 15,
                                                    padding: 10,
                                                    font: {
                                                        size: 12,
                                                    },
                                                },
                                            },
                                        },
                                        layout: {
                                            padding: {
                                                left: 20,
                                                right: 15,
                                            },
                                        },
                                        aspectRatio: 1,
                                    }}
                                />
                            )}
                        </Card>
                        <Card title="Xu hướng đăng ký doanh nghiệp" className="p-4">
                            {statisticData?.business_trend?.datasets?.[0]?.data?.every(
                                (value: number) => value === 0,
                            ) ? (
                                <div className="h-[400px] flex items-center justify-center text-gray-500">
                                    Chưa có dữ liệu
                                </div>
                            ) : (
                                <Chart
                                    type="line"
                                    data={statisticData?.business_trend}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: valueOptions.find(
                                                        (option) =>
                                                            option.label === timeRange,
                                                    )?.labelDisplay,
                                                },
                                                grid: {
                                                    display: true,
                                                    drawBorder: true,
                                                },
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: "Số lượng doanh nghiệp",
                                                },
                                                beginAtZero: true,
                                            },
                                        },
                                        layout: {
                                            padding: {
                                                left: 20,
                                                right: 20,
                                                top: 20,
                                                bottom: 20,
                                            },
                                        },
                                    }}
                                    style={{ height: "400px", maxWidth: "100%" }}
                                />
                            )}
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <Card title="Số lượng tài liệu theo loại" className="p-4">
                            {statisticData?.business_license_type_statistics?.datasets?.[0]?.data?.every(
                                (value: number) => value === 0,
                            ) ? (
                                <div className="h-[300px] flex items-center justify-center text-gray-500">
                                    Chưa có dữ liệu
                                </div>
                            ) : (
                                <Chart
                                    type="bar"
                                    data={{
                                        labels: statisticData?.business_license_type_statistics?.labels,
                                        datasets: [{
                                            data: statisticData?.business_license_type_statistics?.datasets[0]?.data,
                                            backgroundColor: statisticData?.business_license_type_statistics?.datasets[0]?.backgroundColor,
                                            label: ''
                                        }]
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            )}
                        </Card>
                        <Card title="Trạng thái doanh nghiệp" className="p-4">
                            {statisticData?.business_license_status_statistics?.datasets?.[0]?.data?.every(
                                (value: number) => value === 0,
                            ) ? (
                                <div className="h-[300px] flex items-center justify-center text-gray-500">
                                    Chưa có dữ liệu
                                </div>
                            ) : (
                                <Chart
                                    type="doughnut"
                                    data={
                                        statisticData?.business_license_status_statistics
                                    }
                                    style={{ height: "300px" }}
                                />
                            )}
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
