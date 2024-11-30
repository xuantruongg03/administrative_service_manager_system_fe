import L from "leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash/debounce";
import { forwardRef, useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
import useUpdateLatLon from "../hooks/useUpdateLatLon";

interface EditMapModalProps {
    isShow: boolean;
    lat: string;
    lon: string;
    idBusiness: string;
}

const svgIcon = `
        <svg width="25" height="25" viewBox="0 0 42 55" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0C32.598 0 42 9.40202 42 21C42 22.4157 41.8599 23.7986 41.5929 25.1358C39.7394 39.1032 21.1104 55 21.1104 55C21.1104 55 5.25689 41.4717 1.34456 28.4096C0.475507 26.1054 0 23.6083 0 21C0 9.40202 9.40202 0 21 0Z" fill="FF4136"/>
            <circle cx="21" cy="21" r="10" fill="white"/>
           <text x="21" y="25" font-family="Arial" font-size="12" fill="FF4136" text-anchor="middle" dy=".3em"></text>
        </svg>
    `;

const customIcon = L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -25],
});

// Custom marker icon
function DraggableMarker({
    position,
    onPositionChange,
}: {
    position: L.LatLng;
    onPositionChange: (lat: number, lng: number) => void;
}) {
    const [markerPosition, setMarkerPosition] = useState(position);

    const eventHandlers = {
        dragend(e: L.DragEndEvent) {
            const marker = e.target;
            const position = marker.getLatLng();
            setMarkerPosition(position);
            onPositionChange(position.lat, position.lng);
        },
    };

    return (
        <Marker
            position={markerPosition}
            draggable={true}
            eventHandlers={eventHandlers}
            icon={customIcon}
        />
    );
}

const EditMapModal = forwardRef<HTMLDivElement, EditMapModalProps>(({ 
    idBusiness, 
    lat, 
    lon, 
    isShow 
}, ref) => {
    const { updateLatLon } = useUpdateLatLon();

    const debouncedUpdate = useCallback(
        debounce((lat: number, lon: number) => {
            updateLatLon({ 
                latitude: lat, 
                longitude: lon, 
                businessId: idBusiness 
            }).then(() => {
                toast.success("Cập nhật vị trí thành công");
            });
        }, 1000),
        [updateLatLon, idBusiness]
    );

    if (!isShow) return null;
    
    const position = L.latLng(Number(lat), Number(lon));
    
    const onPositionChange = (lat: number, lon: number) => {
        debouncedUpdate(lat, lon);
    };

    return (
        <div 
            ref={ref}
            className="absolute z-[1000] md:w-[350px] md:h-[250px] w-full h-[300px] rounded-lg overflow-hidden border border-gray-300 bg-white shadow-lg bottom-14 right-0"
        >
            <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker
                    position={position}
                    onPositionChange={onPositionChange}
                />
            </MapContainer>
        </div>
    );
});

EditMapModal.displayName = 'EditMapModal';

export default EditMapModal;
