import { Collector, CollectorResponse, SDKInfo, Target, VLogsOptions } from "./model";
import { VLogsService } from "./service";
import { getSystemHostname, getSystemUsername } from "./util";

export class VLogs {
    private static readonly _logger = console;
    private static readonly NAME = 'vlogs';
    private static readonly VERSION = '0.0.2';
    private static readonly VERSION_CODE = '2';
    private static readonly DEFAULT_VLOGS_URL = 'https://hsg1-vlogs.ctdn.net';
    private static readonly APP_ID_HEADER_PREFIX = 'x-app-id';
    private static readonly API_KEY_HEADER_PREFIX = 'x-api-key';
    private static readonly DEFAULT_CONNECT_TIMEOUT = 60; // seconds

    private _options!: VLogsOptions;
    private _service!: VLogsService;

    constructor(options: VLogsOptions) {
        if (!options.appId || !options.apiKey) {
            throw new Error('AppID and ApiKey are required');
        }

        // Set default options
        this._options = options;
        this._options.url ??= VLogs.DEFAULT_VLOGS_URL;

        // Initialize service
        this._service = new VLogsService(this._options.url);

        VLogs._logger.log(`VLogs: Initialized AppID: ${this._options.appId} | SDK Version: ${VLogs.VERSION}-${VLogs.VERSION_CODE}`);
    }

    async collect(request: Collector): Promise<CollectorResponse> {
        VLogs._logger.info(`VLogs: Collecting logs for ${request.getId()}`);

        const headers: Record<string, string> = {
            [VLogs.APP_ID_HEADER_PREFIX]: this._options.appId!,
            [VLogs.API_KEY_HEADER_PREFIX]: this._options.apiKey!,
            'Content-Type': 'application/json',
        };

        const hostname = getSystemHostname();
        const sender = getSystemUsername();
        const sdkInfo = SDKInfo.builder()
            .hostname(hostname)
            .sender(sender)
            .name(VLogs.NAME)
            .version(VLogs.VERSION)
            .versionCode(VLogs.VERSION_CODE)
            .build();

        if (!request.target) {
            if (this._options.target) {
                request.target = this._options.target;
            } else {
                request.target = Target.builder().build();
            }
        } else {
            if (this._options.target) {
                request.target!.merge(this._options.target);
            }
        }

        // Set SDK info to request
        request.target!.sdkInfo = sdkInfo;

        // Append user agent to request
        request.userAgent ??= `vlogs-ts-sdk/${VLogs.VERSION}-${VLogs.VERSION_CODE} (${hostname})`;

        const response = await this._service.post(request.toMap(), headers, this._options.connectionTimeout ?? VLogs.DEFAULT_CONNECT_TIMEOUT);
        return response;
    }

    static create(options: VLogsOptions): VLogs {
        return new VLogs(options);
    }

    static createWith(appId: string, apiKey: string): VLogs {
        return VLogs.create(
            VLogsOptions.builder()
                .apiKey(apiKey)
                .appId(appId)
                .build()
        );
    }
}
