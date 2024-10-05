interface PaginationProps {
    totalRecords: number;
    recordsPerPage: number;
    currentPage: number;
    totalPage: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    isLast: boolean;
}

interface FilterProps {
    date: {
        startDate: string;
        endDate: string;
    };
    setDate: (date: { startDate: string; endDate: string }) => void;
    handleChangeSearch: (search: string) => void;
    onSubmitSearch: () => void;
}

interface TypographyProps {
    variant: string | undefined;
    className: string | undefined;
    placeholder: string | undefined;
    onPointerEnterCapture: (event: React.PointerEvent<HTMLDivElement>) => void | undefined;
    onPointerLeaveCapture: (event: React.PointerEvent<HTMLDivElement>) => void | undefined;
    children: React.ReactNode;
    color: string | undefined;
}

interface TemplatePopupMapProps {
    name: string;
    address: string;
    status: string;
}

interface MapData {
    name: string;
    address: string;
    status: string;
    number_of_problem: number;
    lng: number;
    lat: number;
    id: number;
}

interface MapRenderProps {
    data: MapData[];
    className?: string;
    hoveredItemId: number | null;
}

interface PreviewFileProps {
    file: string;
    type: string;
    typePreview: "mini" | "full";
    closePreview?: () => void;
}

interface ShareProps {
    isShowShare: boolean;
    setIsShowShare: (isShowShare: boolean) => void;
}

interface FileUploadButtonProps {
    onFileSelect: (file: File) => void;
    label?: string;
    icon?: React.ReactNode;
    accept?: string;
}

interface InforBusinessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
}


export type {
    PaginationProps,
    FilterProps,
    TypographyProps,
    TemplatePopupMapProps,
    MapRenderProps,
    PreviewFileProps,
    ShareProps,
    FileUploadButtonProps,
    InforBusinessPopupProps,
};
