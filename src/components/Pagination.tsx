import Typography from "../ui/Typography";
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
        <div className="flex items-center justify-between p-4 mt-4">
            <div className="w-2/3">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    children={`Total record count: ${props.totalRecords}`}
                />
            </div>
            <div className="flex items-center w-1/3 justify-between">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    children={`Page 1: ${props.recordsPerPage} records`}
                />
                <div className="flex items-center">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        children={`Between ${props.currentPage} in ${props.totalPage} pages`}
                    />
                    <div className="flex ml-2">
                        <MdNavigateBefore
                            onClick={handlePrevPage}
                            className="h-7 w-7 hover:bg-medhealth-button-blue cursor-pointer"
                        />
                        <MdNavigateNext
                            onClick={handleNextPage}
                            className="h-7 w-7 hover:bg-medhealth-button-blue cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
