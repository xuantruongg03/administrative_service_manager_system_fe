import { useQuery } from '@tanstack/react-query';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import statisticService from './services/statistic';

const statisticReq = async (params: { timeRange: string, value: string }) => {
    const response = await statisticService.getStatistic(params);
    return response;
}

const valueOptions = [
    { label: 'month', value: `${new Date().getMonth() + 1}/${new Date().getFullYear()}`, labelDisplay: 'Ngày' },
    { label: 'quarter', value: `${Math.ceil((new Date().getMonth() + 1) / 3)}/${new Date().getFullYear()}`, labelDisplay: 'Quý' },
    { label: 'year', value: `${new Date().getFullYear()}`, labelDisplay: 'Tháng' },
]

function App() {
    const [timeRange, setTimeRange] = useState('month');

    const { data: statisticData } = useQuery({
        queryKey: ['statistic', timeRange],
        queryFn: () => statisticReq({ timeRange, value: valueOptions.find(option => option.label === timeRange)?.value || 'month' })
    })
    
    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-center ">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Thống kê</h1>
                <Dropdown 
                    value={timeRange} 
                        options={[
                            {label: 'Tháng này', value: 'month'},
                            {label: 'Quý này', value: 'quarter'},
                            {label: 'Năm nay', value: 'year'}
                        ]} 
                    onChange={(e) => setTimeRange(e.value)} 
                    placeholder="Chọn khoảng thời gian"
                    className="w-full md:w-56"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className='p-1'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Tổng số doanh nghiệp</div>
                    <div className="text-3xl font-bold">{statisticData?.total_businesses}</div>
                </Card>
                <Card className='p-1'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Tổng số tài liệu</div>
                    <div className="text-3xl font-bold">{statisticData?.total_business_licenses}</div>
                </Card>
                <Card className='p-1'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Doanh nghiệp mới trong kỳ</div>
                    <div className="text-3xl font-bold">{statisticData?.new_businesses}</div>
                </Card>
                <Card className='p-1'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Doanh nghiệp thiếu giấy phép</div>
                    <div className="text-3xl font-bold">{statisticData?.violated_businesses}</div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card title="Doanh nghiệp theo loại hình" className="p-4 flex flex-col">
                    <Chart 
                        type="pie" 
                        data={statisticData?.business_type_statistics} 
                        className="w-full h-[300px]"
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                    align: 'center',
                                    labels: {
                                        boxWidth: 15,
                                        boxHeight: 15,
                                        padding: 10,
                                        font: {
                                            size: 12
                                        }
                                    }
                                }
                            },
                            layout: {
                                padding: {
                                    left: 20,
                                    right: 15
                                }
                            },
                            aspectRatio: 1
                        }}
                    />
                </Card>
                <Card title="Xu hướng đăng ký doanh nghiệp" className="p-4">
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
                                        text: valueOptions.find(option => option.label === timeRange)?.labelDisplay
                                    },
                                    grid: {
                                        display: true,
                                        drawBorder: true
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Số lượng doanh nghiệp'
                                    },
                                    beginAtZero: true
                                }
                            },
                            layout: {
                                padding: {
                                    left: 20,
                                    right: 20,
                                    top: 20,
                                    bottom: 20
                                }
                            }
                        }}
                        style={{ height: '400px', maxWidth: '100%' }} 
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card title="Tài liệu theo loại" className="p-4">
                    <Chart type="bar" data={statisticData?.business_license_type_statistics} style={{ height: '300px' }} />
                </Card>
                <Card title="Trạng thái doanh nghiệp" className="p-4">
                    <Chart type="doughnut" data={statisticData?.business_license_status_statistics} style={{ height: '300px' }} />
                </Card>
            </div>
        </div>
    );
}

export default App;