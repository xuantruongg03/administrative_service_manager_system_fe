import { TemplatePopupMapProps } from "../interfaces/props";

function TemplatePopupMap(props: TemplatePopupMapProps) {
    return (
        <>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
            <p>Trạng thái: {props.status}</p>
        </>
    );
}

export default TemplatePopupMap;
