import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { FaMapMarker } from "react-icons/fa";
import TemplatePopupMap from "./TemplatePopupMap";
import { MapRenderProps } from "../interfaces/props";
import style_map from "../vendors/style_map.json";

function MapRender(props: MapRenderProps, className?: string) {
    const mapContainer = useRef(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markers = useRef<{ [key: number]: maplibregl.Marker }>({});
    const lng = import.meta.env.VITE_MAPS_CENTER_LNG;
    const lat = import.meta.env.VITE_MAPS_CENTER_LAT;
    const zoom = import.meta.env.VITE_MAPS_ZOOM;
    const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

    const renderMap = useCallback(() => {
        if (mapContainer.current) {
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: style_map as maplibregl.StyleSpecification,
                center: [lng, lat],
                zoom: Number(zoom),
            });
            map.current.addControl(new maplibregl.NavigationControl());

            props.data.forEach((point) => {
                if (map.current) {
                    const customMarker = document.createElement("div");
                    customMarker.innerHTML = ReactDOMServer.renderToString(
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <FaMapMarker size={30} color={point.status === "Bình thường" ? "#00FF00" : "#FF0000"} />
                            {point.status === "Bình thường" && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "39%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                    }}
                                />
                            )}
                            {point.status !== "Bình thường" && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "40%",
                                        left: "49%",
                                        transform: "translate(-50%, -50%)",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {point.number_of_problem}
                                </span>
                            )}
                        </div>
                    );

                    const marker = new maplibregl.Marker({
                        element: customMarker,
                    })
                        .setLngLat([point.lng, point.lat])
                        .addTo(map.current)
                        .setPopup(
                            new maplibregl.Popup({
                                offset: 25,
                                closeButton: false,
                            }).setHTML(
                                ReactDOMServer.renderToString(
                                    <TemplatePopupMap
                                        name={point.name}
                                        address={point.address}
                                        status={point.status}
                                    />
                                )
                            )
                        );
                    markers.current[point.id] = marker;
                }
            });
        }
    }, [API_KEY, lng, lat, zoom, props.data]);

    useEffect(() => {
        Object.values(markers.current).forEach((marker) => {
            const markerElement = marker.getElement();
            markerElement.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
            markerElement.style.transform = markerElement.style.transform.replace(/ scale\([^)]*\)/g, '');
            markerElement.style.zIndex = "0";
        });

        if (props.hoveredItemId) {
            const markerElement = markers.current[props.hoveredItemId].getElement();
            markerElement.style.transform += ' scale(1.3)';
            markerElement.style.zIndex = "1";
        }
    }, [props.hoveredItemId]);

    useEffect(() => {
        renderMap();
    }, [renderMap]);

    return (
        <div className={`position-relative w-full h-[550px] ${className}`}>
            <div
                ref={mapContainer}
                className="position-absolute w-full h-full"
            />
        </div>
    );
}

export default MapRender;
