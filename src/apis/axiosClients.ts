import axios from "axios";
import { stringify } from "qs";
import { toast } from "react-toastify";
import { CONSTANTS } from "../utils/constants";
import common from "../utils/errors";

const axiosClient = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: `http://${window.location.hostname}:6789/api/v1`,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => stringify(params, { encode: false }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hanldeError = (e: any) => {
    if (e.code === "ERR_NETWORK") {
        toast.error(common.error["network-error"]);
    }
    if (e.message === "Request failed with status code 500") {
        toast.error(common.error["500"]);
    }
    switch (e.response.status) {
        case 400:
            toast.error(e.response.data.message);
            break;

        default:
            break;
    }
    throw e;
};

export const uploadFile = async (file: File, url: string, method: string = "POST") => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axiosClient({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        hanldeError(error);
    }
};

export const downloadFile = async (url: string, defaultFileName: string) => {
    const response = await fetch(url, {
        method: 'GET',
    });
    const contentDisposition = response.headers.get('Content-Disposition');
    const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/i);
    const fileName = fileNameMatch && fileNameMatch[1] ? fileNameMatch[1] : defaultFileName;
    const buffer = await response.arrayBuffer();
    return { buffer, fileName };
  };


axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(CONSTANTS.NAME_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, hanldeError);

export default axiosClient;