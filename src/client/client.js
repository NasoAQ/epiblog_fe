import axios from "axios";

class AxiosClient {
	constructor() {
		const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
		this.axiosInstance = axios.create({
			baseUrl: baseUrl,
		});
	}

	async get(url, config) {
		const response = await this.axiosInstance.get(url, config);
		return response.data;
	}

	async post(url, config) {
		const response = await this.axiosInstance.post(url, config);
		return response.data;
	}
}

export default AxiosClient;
