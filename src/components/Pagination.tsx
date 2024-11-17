import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { PaginationProps } from "../interfaces";

function Pagination(props: PaginationProps) {
    const handleNextPage = () => {
        if (props.isLast) return;
        props.onNextPage();
    };

    const handlePrevPage = () => {
        if (props.currentPage === 0) return;
        props.onPrevPage();
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4  bg-white shadow-sm rounded-lg">
            {props.totalRecords > props.recordsPerPage && (
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <span className="text-sm text-gray-700">
                        Hiển thị{" "}
                        <span className="font-medium">
                            {Math.min(
                                props.currentPage * props.recordsPerPage -
                                    props.recordsPerPage +
                                    1,
                                props.totalRecords,
                            )}
                        </span>{" "}
                        tới{" "}
                        <span className="font-medium">
                            {Math.min(
                                props.currentPage * props.recordsPerPage,
                                props.totalRecords,
                            )}
                        </span>{" "}
                        trong số{" "}
                        <span className="font-medium">
                            {props.totalRecords}
                        </span>{" "}
                        kết quả
                    </span>
                </div>
            )}
            {props.totalRecords > props.recordsPerPage && (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={props.currentPage === 1}
                        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <MdNavigateBefore className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-700">
                        Trang{" "}
                        <span className="font-medium">{props.currentPage}</span>{" "}
                        / <span className="font-medium">{props.totalPage}</span>
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={props.isLast}
                        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <MdNavigateNext className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pagination;
