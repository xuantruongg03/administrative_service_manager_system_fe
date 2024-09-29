import { TypographyProps } from "../interfaces";


function Typography({
    variant = "small",
    className = "",
    placeholder,
    onPointerEnterCapture,
    onPointerLeaveCapture,
    children,
    color
}: Partial<TypographyProps>) {
    return (
        <>
            <Typography
                variant={variant}
                className={className}
                placeholder={placeholder}
                onPointerEnterCapture={onPointerEnterCapture}
                onPointerLeaveCapture={onPointerLeaveCapture}
                color={color}
            >
                {children}
            </Typography>
        </>
    );
}

export default Typography;
