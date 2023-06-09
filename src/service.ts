import { Collector, CollectorResponse } from './model';
import axios, { AxiosRequestConfig } from 'axios';

class VLogsService {
    private url: string;

    constructor(baseUrl: string) {
        this.url = `${baseUrl}/api/v1/collector`;
    }

    async post(body: any, headers?: any, timeout?: number): Promise<CollectorResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: this.url,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        const response = await axios(config);

        if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202
        ) {
            return await response.data;
        } else {
            throw new Error(
                `Failed to post data to vlogs server with status code: ${response.status} and message: ${response.statusText}`
            );
        }
    }
}


export { VLogsService };