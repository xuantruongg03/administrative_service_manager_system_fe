
import { useState } from "react";
import { FilterProps } from "../interfaces";

function Filter({ date, setDate, handleChangeSearch, onSubmitSearch }: FilterProps) {
    const [active, setActive] = useState("7");

    const handleValueChange = (newValue: { startDate: string; endDate: string; }) => {
        setDate(newValue);
    };

    const handleChoose7Days = () => {
        const endDate = date.endDate;
        const dateObj = new Date(endDate);
        dateObj.setDate(dateObj.getDate() - 7);
        const startDate = dateObj.toISOString().split("T")[0];

        setActive("7");
        setDate({
            startDate: startDate,
            endDate: endDate,
        });
    };

    const handleChoose30Days = () => {
        const endDate = date.endDate;
        const dateObj = new Date(endDate);
        dateObj.setDate(dateObj.getDate() - 30);
        const startDate = dateObj.toISOString().split("T")[0];

        setActive("30");
        setDate({
            startDate: startDate,
            endDate: endDate,
        });
    };

    return (
        <div className="flex flex-col w-full items-center justify-between gap-4 md:flex-row bg-white py-2.5 mb-3 px-5 rounded-lg">
            <div className="w-1/4">
                <strong className="ml-2">All the posts</strong>
                {/* <InputField
                    id="search"
                    type="text"
                    placeholder="Search title, content or author"
                    icon={
                        <MagnifyingGlassIcon
                            onClick={onSubmitSearch}
                            className="h-5 w-5"
                        />
                    }
                    className="!rounded-full !h-9 !placeholder-gray-500 pl-8 w-full focus:!border-gray-500"
                    onChange={handleChangeSearch}
                    onKeyPress={(e: { key: string; }) => {
                        if (e.key === "Enter") {
                            onSubmitSearch();
                        }
                    }}
                /> */}
            </div>
            <div className="flex items-center w-2/5 justify-between">
                <div className="flex items-center  overflow-hidden rounded-full  shadow-custom border border-gray-300 relative">
                    <button
                        className={`${
                            active === "7" &&
                            "text-white transition-all duration-500 ease-in-out"
                        } w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex items-center text-center justify-center hover:opacity-75 right-20`}
                        onClick={handleChoose7Days}
                    >
                        Last 7 days
                    </button>
                    <button
                        className={`absolute transition-all duration-500 ease-in-out w-28 bg-gradient-to-r  shadow-sm h-8 rounded-full  ${
                            active === "7"
                                ? "left-0 from-medhealth-blue-search to-medhealth-blue"
                                : "left-28 from-medhealth-blue to-medhealth-blue-search"
                        }`}
                    ></button>
                    <button
                        className={`${
                            active === "30" &&
                            "text-white transition-all duration-500 ease-in-out"
                        } w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex items-center text-center justify-center hover:opacity-75 -right-20`}
                        onClick={handleChoose30Days}
                    >
                        Last 30 days
                    </button>
                </div>
                <div className="relative">
                    <span className="text-sm absolute bottom-full">
                        Posted date
                    </span>
                    <div className="flex items-center border border-gray-500 px-3 py-1 w-56 rounded-full">
                        {/* <Datepicker
                            onChange={handleValueChange}
                            inputClassName={`!h-5 text-sm w-full focus:outline-none`}
                            containerClassName={`${
                                date.startDate ? "non-picker" : "picker"
                            }`}
                            separator="-"
                            value={date}
                            displayFormat="DD/MM/YYYY"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
