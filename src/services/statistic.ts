import axiosClient from "../apis/axiosClients";

const getStatistic = async (params: { timeRange: string, value: string }) => {
    const response = await axiosClient.get(`/statistics?timeRange=${params.timeRange}&value=${params.value}`);
    return response.data;
};

const statisticService = {
    getStatistic
}

export default statisticService;

