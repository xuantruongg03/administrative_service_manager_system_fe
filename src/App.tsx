import { useState } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

function App() {
    const [timeRange, setTimeRange] = useState('month');

    // Fake data
    const stats = {
        totalBusinesses: 1234,
        totalDocuments: 5678,
        newBusinesses: 56,
        businessTypeData: {
            labels: ['TNHH', 'Cổ phần', 'Tư nhân', 'Khác'],
            datasets: [{
                data: [300, 200, 100, 50],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        businessTrendData: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
            datasets: [{
                label: 'Doanh nghiệp mới',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#36A2EB'
            }]
        },
        geographicData: [
            { lat: 10.762622, lng: 106.660172, name: "TP.HCM", count: 500 },
            { lat: 21.028511, lng: 105.804817, name: "Hà Nội", count: 300 },
            { lat: 16.054407, lng: 108.202164, name: "Đà Nẵng", count: 150 }
        ],
        documentTypeData: {
            labels: ['PDF', 'Hình ảnh', 'Word', 'Excel', 'Khác'],
            datasets: [{
                label: 'Số lượng',
                data: [300, 200, 100, 50, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        complianceData: {
            labels: ['Đầy đủ', 'Thiếu', 'Quá hạn'],
            datasets: [{
                data: [700, 200, 100],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
            }]
        }
    };

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className='p-4'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Tổng số doanh nghiệp</div>
                    <div className="text-3xl font-bold">{stats.totalBusinesses}</div>
                </Card>
                <Card className='p-4'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Tổng số tài liệu</div>
                    <div className="text-3xl font-bold">{stats.totalDocuments}</div>
                </Card>
                <Card className='p-4'>
                    <div className="text-sm font-medium text-gray-500 mb-2">Doanh nghiệp mới trong kỳ</div>
                    <div className="text-3xl font-bold">{stats.newBusinesses}</div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card title="Doanh nghiệp theo loại hình" className="p-4">
                    <Chart type="pie" data={stats.businessTypeData} style={{ height: '300px' }} />
                </Card>
                <Card title="Xu hướng đăng ký doanh nghiệp" className="p-4">
                    <Chart type="line" data={stats.businessTrendData} style={{ height: '300px' }} />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card title="Tài liệu theo loại" className="p-4">
                    <Chart type="bar" data={stats.documentTypeData} style={{ height: '300px' }} />
                </Card>
                <Card title="Trạng thái tuân thủ" className="p-4">
                    <Chart type="doughnut" data={stats.complianceData} style={{ height: '300px' }} />
                </Card>
            </div>
        </div>
    );
}

export default App;