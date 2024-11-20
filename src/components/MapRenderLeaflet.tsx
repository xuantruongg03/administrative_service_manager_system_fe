import L from "leaflet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { MapData, MapRenderProps } from "../interfaces/props";

const iconDefault = L.icon({
    iconUrl: "src/assets/map_default.png",
    iconSize: [35, 35],
    iconAnchor: [17.5, 17.5],
    popupAnchor: [0, -35],
});

const iconHeadquater = L.icon({
    iconUrl: "src/assets/map_headquater.png",
    iconSize: [25, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -30],
});

function createCustomIcon(numberProblems: number, size: number) {
    const color = numberProblems >= 3 ? "#FF4136" : numberProblems >= 1 ? "#FF851B" : "#2ECC40";
    const iconSize = size;

    const svgIcon = `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 42 55" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0C32.598 0 42 9.40202 42 21C42 22.4157 41.8599 23.7986 41.5929 25.1358C39.7394 39.1032 21.1104 55 21.1104 55C21.1104 55 5.25689 41.4717 1.34456 28.4096C0.475507 26.1054 0 23.6083 0 21C0 9.40202 9.40202 0 21 0Z" fill="${color}"/>
            <circle cx="21" cy="21" r="10" fill="white"/>
            ${
                numberProblems > 0
                    ? `<text x="21" y="25" font-family="Arial" font-size="12" fill="${color}" text-anchor="middle" dy=".3em"></text>`
                    : ""
            }
        </svg>
    `;

    return L.divIcon({
        html: svgIcon,
        className: "custom-marker",
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize],
        popupAnchor: [0, -iconSize],
    });
}

const MarkerWithSmoothTransition = React.memo(function MarkerWithSmoothTransition({
    item,
    offset,
    hoveredItem
}: {
    item: MapData;
    offset: [number, number];
    hoveredItem: string | null;
}) {
    const markerRef = useRef<L.Marker | null>(null);
    const [currentSize, setCurrentSize] = useState(30);
    const animationRef = useRef<number>();
    
    const targetSize = useMemo(() => hoveredItem === item.code ? 37 : 30, [hoveredItem, item.code]);

    useEffect(() => {
        if (currentSize !== targetSize) {
            const animate = () => {
                setCurrentSize(current => {
                    const newSize = current + (targetSize > current ? 2 : -2);
                    
                    if ((targetSize > current && newSize >= targetSize) || 
                        (targetSize < current && newSize <= targetSize)) {
                        return targetSize;
                    }
                    
                    animationRef.current = requestAnimationFrame(animate);
                    return newSize;
                });
            };
            
            animationRef.current = requestAnimationFrame(animate);
            
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [targetSize]);

    const icon = useMemo(
        () => createCustomIcon(item.number_of_problem, currentSize),
        [item.number_of_problem, currentSize],
    );

    return (
        <Marker
            ref={markerRef}
            position={[
                Number(item.lat) + offset[0],
                Number(item.lng) + offset[1],
            ]}
            icon={icon}
        >
            <Popup closeButton={false}>
                <div className="text-black rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <Link
                            to={`/business/edit/${item.id}`}
                            className="flex items-center gap-2"
                        >
                            <BiSolidEditAlt className="size-5" />
                        </Link>
                    </div>
                    <p className="text-sm">{item.address}</p>
                    <p
                        className={`text-sm ${
                            item.status === "active"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        Trạng thái:{" "}
                        {item.status === "active"
                            ? "Đang hoạt động"
                            : "Ngừng hoạt động"}
                    </p>
                    <p className="text-sm">
                        Số lỗi:{" "}
                        <span className="font-semibold">
                            {item.number_of_problem}
                        </span>
                    </p>
                    {item.license_status.length > 0 ? (
                        <p className="text-sm">
                            {item.license_status.map((license, index) => (
                                <span key={index} className="text-sm">
                                    {license}
                                    {index < item.license_status.length - 1
                                        ? ", "
                                        : ""}
                                </span>
                            ))}
                        </p>
                    ) : null}
                </div>
            </Popup>
        </Marker>
    );
});

const MultipleMarkers = React.memo(function MultipleMarkers(props: { data: MapData[], hoveredItem: string | null }) {
    const memoizedData = useMemo(() => props.data, [props.data]);
    const coordinateGroups = useMemo(() => {
        const groups = new Map<string, MapData[]>();
        memoizedData.forEach(item => {
            const key = `${item.lat},${item.lng}`;
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key)!.push(item);
        });
        return groups;
    }, [memoizedData]);

    const calculateOffset = useCallback((index: number, total: number): [number, number] => {
        if (total === 1) return [0, 0];
        
        const angle = (index * (2 * Math.PI)) / total;
        const radius = 0.00015;
        return [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
        ];
    }, []);

    return (
        <>
            {Array.from(coordinateGroups.entries()).map(([, items]) => (
                items.map((item, index) => (
                    <MarkerWithSmoothTransition
                        key={item.code}
                        item={item}
                        offset={calculateOffset(index, items.length)}
                        hoveredItem={props.hoveredItem}
                    />
                ))
            ))}
        </>
    );
});

const MapRenderLeaflet = React.memo(function MapRenderLeaflet(props: MapRenderProps) {
    const { data } = props;
    const [center, setCenter] = useState<[number, number]>([13.756459, 109.212256]);
    const [canGetLocation, setCanGetLocation] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter([position.coords.latitude, position.coords.longitude]);
                    setCanGetLocation(true);
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        }
    }, []);

    return (
        <div className="w-full h-full">
            <MapContainer
                center={center}
                zoom={16}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {canGetLocation && (
                    <Marker position={center} icon={iconDefault}>
                        <Popup>Vị trí hiện tại</Popup>
                    </Marker>
                )}
                <Marker position={[13.757004, 109.212351]} icon={iconHeadquater}>
                    <Popup>Trụ sở</Popup>
                </Marker>
                <MultipleMarkers hoveredItem={props.hoveredItem} data={data} />
            </MapContainer>
        </div>
    );
});

export default MapRenderLeaflet;
