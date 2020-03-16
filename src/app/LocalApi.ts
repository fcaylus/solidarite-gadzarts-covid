import axios from "axios";

export interface ApiResult {
    error: boolean;
    data?: any;
}

const axiosInstance = axios.create({
    baseURL: "/api/",
});

export default () => {
    return {
        /**
         * GET request
         * @param endpoint The local API endpoint to get
         */
        get: async (endpoint: string): Promise<ApiResult> => {
            return axiosInstance.get(endpoint).then((res) => {
                return {
                    error: false,
                    data: res.data
                }
            }).catch(() => {
                return {
                    error: true
                }
            });
        }
    };
}
