import Map, { Marker, Popup } from '@goongmaps/goong-map-react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapData, MapRenderProps } from "../interfaces/props";
import RootState from "../interfaces/rootState";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import ReactMapGL from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';

const markerStyle = {
    default: {
        width: 35,
        height: 35,
        backgroundImage: "url('src/assets/map_default.png')",
        backgroundSize: 'contain',
    },
    headquarter: {
        width: 25,
        height: 30,
        backgroundImage: "url('src/assets/map_headquater.png')",
        backgroundSize: 'contain',
    }
};

function MarkerWithPopup({
    item,
    offset,
}: {
    item: MapData;
    offset: [number, number];
}) {
    const isHovered = useSelector((state: RootState) => state.hovermap);

    return (
        <Marker
            longitude={Number(item.lng) + offset[1]}
            latitude={Number(item.lat) + offset[0]}
        >
            <Popup
                longitude={Number(item.lng) + offset[1]}
                latitude={Number(item.lat) + offset[0]}
                closeButton={false}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">{item.name}</span>
                        <Link to={`/problems/${item.code}`}>
                            <BiSolidEditAlt className="w-5 h-5 text-blue-500" />
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <span>Số lượng sự cố: {item.number_of_problem}</span>
                        <span>Mã: {item.code}</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

function MultipleMarkers({ data }: { data: MapData[] }) {
    return (
        <>
            {data.map((item, index) => (
                <MarkerWithPopup
                    key={index}
                    item={item}
                    offset={[0, 0]}
                />
            ))}
        </>
    );
}

export default function MapGoong(props: MapRenderProps) {
    const { data } = props;
    const [viewport, setViewport] = useState({
        latitude: 13.756459,
        longitude: 109.212256,
        zoom: 16,
        height: '100%',
        width: '100%',
    });
    const [canGetLocation, setCanGetLocation] = useState(false);
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setViewport(v => ({
                        ...v,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
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
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                goongApiAccessToken={mapApiKey}
            >
                {canGetLocation && (
                    <Marker 
                        longitude={viewport.longitude}
                        latitude={viewport.latitude}
                    >
                        <Popup
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                        >Vị trí hiện tại</Popup>
                    </Marker>
                )}
                <Marker 
                    longitude={109.212351}
                    latitude={13.757004}
                >
                    <Popup
                        longitude={109.212351}
                        latitude={13.757004}
                    >Trụ sở</Popup>
                </Marker>
                <MultipleMarkers data={data} />
            </ReactMapGL>
        </div>
    );
}
