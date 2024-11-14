import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { MapData, MapRenderProps } from "../interfaces/props";
import RootState from "../interfaces/rootState";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";

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

function MarkerWithSmoothTransition({
    item,
    offset,
}: {
    item: MapData;
    offset: [number, number];
}) {
    const markerRef = useRef<L.Marker | null>(null);
    const [currentSize, setCurrentSize] = useState(30);
    const isHovered = useSelector((state: RootState) => state.hovermap);
    const targetSize = isHovered === item.code ? 37 : 30;
    const icon = useMemo(
        () => createCustomIcon(item.number_of_problem, currentSize),
        [item.number_of_problem, currentSize],
    );

    useEffect(() => {
        if (currentSize !== targetSize) {
            const animationFrame = requestAnimationFrame(() => {
                const newSize =
                    currentSize + (targetSize > currentSize ? 2 : -2); // Tăng step size
                setCurrentSize(newSize);
            });
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [currentSize, targetSize]);

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
}

function MultipleMarkers(props: { data: MapData[] }) {
    const memoizedData = useMemo(() => props.data, [props.data]);
    const coordinateMap = new Map<string, number>();

    const calculateOffset = useMemo(() => {
        const offsetMap = new Map<number, [number, number]>();
        return (index: number): [number, number] => {
            if (offsetMap.has(index)) {
                return offsetMap.get(index)!;
            }
            const angle = (index % 150) * (Math.PI / 4);
            const distance = 0.00005;
            const offset: [number, number] = [
                Math.cos(angle) * distance,
                Math.sin(angle) * distance,
            ];
            offsetMap.set(index, offset);
            return offset;
        };
    }, []);

    return (
        <>
            {memoizedData.map((item) => {
                const key = `${item.lat},${item.lng}`;
                const count = coordinateMap.get(key) || 0;
                coordinateMap.set(key, count + 1);

                return (
                    <MarkerWithSmoothTransition
                        key={item.code}
                        item={item}
                        offset={calculateOffset(count)}
                    />
                );
            })}
        </>
    );
}

function MapRenderLeaflet(props: MapRenderProps) {
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
                <MultipleMarkers data={data} />
            </MapContainer>
        </div>
    );
}

export default MapRenderLeaflet;
