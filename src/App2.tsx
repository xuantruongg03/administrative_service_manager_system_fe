import { Card, CardBody, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import Typography from "./ui/Typography";

const data = [
    {
        key: "1",
        data: {
            code: "0123456789",
            registerDate: "01/01/2020",
            name: "Công ty TNHH ABC",
            shortName: "ABC Co.",
            address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
            phoneNumber: "028 1234 5678",
            registeredCapital: "10.000.000.000 VNĐ",
            size: "50-100",
            type: "Hoạt động",
        },
        children: [
            {
                key: "1-1",
                data: {
                    code: "0123456789-001",
                    registerDate: "01/03/2020",
                    name: "Chi nhánh ABC Hà Nội",
                    shortName: "ABC Hanoi",
                    address: "456 Đường Bà Triệu, Quận Hoàn Kiếm, Hà Nội",
                    phoneNumber: "024 9876 5432",
                    registeredCapital: "2.000.000.000 VNĐ",
                    size: "20-50",
                    type: "Hoạt động",
                },
            },
        ],
    },
    {
        key: "2",
        data: {
            code: "9876543210",
            registerDate: "15/07/2019",
            name: "Công ty Cổ phần XYZ",
            shortName: "XYZ JSC",
            address: "789 Đường Nguyễn Huệ, Quận 3, TP.HCM",
            phoneNumber: "028 8765 4321",
            registeredCapital: "50.000.000.000 VNĐ",
            size: "100-200",
            type: "Hoạt động",
        },
        children: [
            {
                key: "2-1",
                data: {
                    code: "9876543210-001",
                    registerDate: "01/09/2019",
                    name: "Chi nhánh XYZ Đà Nẵng",
                    shortName: "XYZ Danang",
                    address: "101 Đường Trần Phú, Quận Hải Châu, Đà Nẵng",
                    phoneNumber: "0236 1234 5678",
                    registeredCapital: "5.000.000.000 VNĐ",
                    size: "20-50",
                    type: "Hoạt động",
                },
            },
        ],
    },
    {
        key: "3",
        data: {
            code: "1357924680",
            registerDate: "30/11/2021",
            name: "Công ty TNHH DEF",
            shortName: "DEF Co.",
            address: "246 Đường Võ Văn Tần, Quận 10, TP.HCM",
            phoneNumber: "028 2468 1357",
            registeredCapital: "15.000.000.000 VNĐ",
            size: "10-50",
            type: "Tạm ngừng hoạt động",
        },
    },
];

function App() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="m-4 ">
            <Card
                className="!rounded-lg overflow-x-scroll overflow-y-hidden table-scroll custom-scrollbar"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <CardBody
                    className="p-0 h-100 rounded-xl w-90"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="h-16">
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-32">
                                    <Typography
                                        children="Mã số DN"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-28">
                                    <Typography
                                        children="Ngày ĐK"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-64">
                                    <Typography
                                        children="Tên doanh nghiệp"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-32">
                                    <Typography
                                        children="Tên viết tắt"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-80">
                                    <Typography
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                        children=" Địa chỉ"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-36">
                                    <Typography
                                        children="Số điện thoại"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-48">
                                    <Typography
                                        children="Vốn điều lệ (VNĐ)"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-24">
                                    <Typography
                                        children="Quy mô"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                                <th className="border-y text-black bg-medhealth-blue-350 p-4 border w-32">
                                    <Typography
                                        children="Trạng thái"
                                        className="font-semibold leading-none opacity-70 whitespace-nowrap"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        rowSpan={4}
                                        className="text-center"
                                    >
                                        <div className="h-80 w-full flex flex-col justify-center items-center">
                                            <div className="h-80 w-full flex flex-col justify-center items-center">
                                                <Spinner
                                                    color="blue"
                                                    className="size-10"
                                                    onPointerEnterCapture={
                                                        undefined
                                                    }
                                                    onPointerLeaveCapture={
                                                        undefined
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : data && data.length > 0 ? (
                                data.map(
                                    (
                                        {
                                            data: {
                                                code,
                                                registerDate,
                                                name,
                                                shortName,
                                                address,
                                                phoneNumber,
                                                registeredCapital,
                                                size,
                                                type,
                                            },
                                        },
                                        index,
                                    ) => {
                                        const isLast =
                                            index === data?.length - 1;
                                        const classes = isLast
                                            ? "px-4"
                                            : "px-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={index}>
                                                <td
                                                    className={`${classes} w-28`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="flex flex-col my-5">
                                                            <Typography
                                                                children={code}
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`${classes} w-28 font-normal`}
                                                >
                                                    <Typography
                                                        children={registerDate}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-64`}
                                                >
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            children={name}
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        />
                                                    </div>
                                                </td>
                                                <td
                                                    className={`${classes} w-32 font-normal`}
                                                >
                                                    <Typography
                                                        children={shortName}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-80 font-normal`}
                                                >
                                                    <Typography
                                                        children={address}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-36`}
                                                >
                                                    <Typography
                                                        children={phoneNumber}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-48`}
                                                >
                                                    <Typography
                                                        children={registeredCapital.replace(
                                                            " VNĐ",
                                                            "",
                                                        )}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-24`}
                                                >
                                                    <Typography
                                                        children={size}
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    />
                                                </td>
                                                <td
                                                    className={`${classes} w-32`}
                                                >
                                                    <div className="flex items-center">
                                                        <span
                                                            className={`w-2 h-2 rounded-full mr-2 ${
                                                                type ===
                                                                "Hoạt động"
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        ></span>
                                                        <Typography
                                                            color="blue-gray"
                                                            className="font-normal"
                                                            children={type}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        rowSpan={4}
                                        className="text-center"
                                    >
                                        <div className="h-80 w-full flex flex-col justify-center items-center">
                                            <BsDatabaseFillX className="size-16 text-blue-gray" />
                                            <div className="mt-2 font-semibold">
                                                No data
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default App;
