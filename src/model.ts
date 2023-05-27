import { generateUUID } from "./util";

enum CollectorType {
    Error,
    Event,
    Metric,
    Trace,
    Log,
    Span,
}

enum CollectorSource {
    Web,
    Mobile,
    Server,
    Desktop,
    IoT,
    Other,
}

enum TelegramParseMode {
    Markdown,
    MarkdownV2,
    HTML,
}


interface TelegramOptions {
    token?: string;
    chatId?: string;
    parseMode?: TelegramParseMode;
    disabled?: boolean;
    extras?: any;
}

class Telegram {
    token?: string;
    chatId?: string;
    parseMode?: TelegramParseMode;
    disabled?: boolean;
    extras?: any;

    constructor(options: TelegramOptions = {}) {
        this.token = options.token;
        this.chatId = options.chatId;
        this.parseMode = options.parseMode;
        this.disabled = options.disabled;
        this.extras = options.extras;
    }

    toMap(): Record<string, any> {
        return {
            'token': this.token,
            'chat_id': this.chatId,
            'parse_mode': this.parseMode,
            'disabled': this.disabled,
            'extras': this.extras,
        };
    }

    static builder(): TelegramBuilder {
        return new TelegramBuilder();
    }
}

class TelegramBuilder {
    private _token?: string;
    private _chatId?: string;
    private _parseMode?: TelegramParseMode;
    private _disabled?: boolean;
    private _extras?: any;

    constructor() { }

    token(token?: string): TelegramBuilder {
        this._token = token;
        return this;
    }

    chatId(chatId?: string): TelegramBuilder {
        this._chatId = chatId;
        return this;
    }

    parseMode(parseMode?: TelegramParseMode): TelegramBuilder {
        this._parseMode = parseMode;
        return this;
    }

    disabled(disabled?: boolean): TelegramBuilder {
        this._disabled = disabled;
        return this;
    }

    extras(extras?: any): TelegramBuilder {
        this._extras = extras;
        return this;
    }

    build(): Telegram {
        return new Telegram({
            token: this._token,
            chatId: this._chatId,
            parseMode: this._parseMode,
            disabled: this._disabled,
            extras: this._extras,
        });
    }
}

class Discord {
    webhookId?: string;
    webhookToken?: string;
    webhookUrl?: string;
    disabled?: boolean;
    extras?: any;

    constructor({
        webhookId,
        webhookToken,
        webhookUrl,
        disabled,
        extras,
    }: {
        webhookId?: string;
        webhookToken?: string;
        webhookUrl?: string;
        disabled?: boolean;
        extras?: any;
    }) {
        this.webhookId = webhookId;
        this.webhookToken = webhookToken;
        this.webhookUrl = webhookUrl;
        this.disabled = disabled;
        this.extras = extras;
    }

    toMap(): Record<string, any> {
        return {
            webhook_id: this.webhookId,
            webhook_token: this.webhookToken,
            webhook_url: this.webhookUrl,
            disabled: this.disabled,
            extras: this.extras,
        };
    }

    static builder(): DiscordBuilder {
        return new DiscordBuilder();
    }
}

class DiscordBuilder {
    private _webhookId?: string;
    private _webhookToken?: string;
    private _webhookUrl?: string;
    private _disabled?: boolean;
    private _extras?: any;

    constructor() { }

    webhookId(webhookId: string | undefined): DiscordBuilder {
        this._webhookId = webhookId;
        return this;
    }

    webhookToken(webhookToken: string | undefined): DiscordBuilder {
        this._webhookToken = webhookToken;
        return this;
    }

    webhookUrl(webhookUrl: string | undefined): DiscordBuilder {
        this._webhookUrl = webhookUrl;
        return this;
    }

    disabled(disabled: boolean | undefined): DiscordBuilder {
        this._disabled = disabled;
        return this;
    }

    extras(extras: any): DiscordBuilder {
        this._extras = extras;
        return this;
    }

    build(): Discord {
        return new Discord({
            webhookId: this._webhookId,
            webhookToken: this._webhookToken,
            webhookUrl: this._webhookUrl,
            disabled: this._disabled,
            extras: this._extras,
        });
    }
}

class SDKInfo {
    name?: string;
    version?: string;
    versionCode?: string;
    hostname?: string;
    sender?: string;

    constructor({
        name,
        version,
        versionCode,
        hostname,
        sender,
    }: {
        name?: string;
        version?: string;
        versionCode?: string;
        hostname?: string;
        sender?: string;
    }) {
        this.name = name;
        this.version = version;
        this.versionCode = versionCode;
        this.hostname = hostname;
        this.sender = sender;
    }

    toMap(): Record<string, any> {
        return {
            name: this.name,
            version: this.version,
            version_code: this.versionCode,
            hostname: this.hostname,
            sender: this.sender,
        };
    }

    static builder(): SDKInfoBuilder {
        return new SDKInfoBuilder();
    }
}

class SDKInfoBuilder {
    private _name?: string;
    private _version?: string;
    private _versionCode?: string;
    private _hostname?: string;
    private _sender?: string;

    constructor() { }

    name(name: string | undefined): SDKInfoBuilder {
        this._name = name;
        return this;
    }

    version(version: string | undefined): SDKInfoBuilder {
        this._version = version;
        return this;
    }

    versionCode(versionCode: string | undefined): SDKInfoBuilder {
        this._versionCode = versionCode;
        return this;
    }

    hostname(hostname: string | undefined): SDKInfoBuilder {
        this._hostname = hostname;
        return this;
    }

    sender(sender: string | undefined): SDKInfoBuilder {
        this._sender = sender;
        return this;
    }

    build(): SDKInfo {
        return new SDKInfo({
            name: this._name,
            version: this._version,
            versionCode: this._versionCode,
            hostname: this._hostname,
            sender: this._sender,
        });
    }
}

class Target {
    telegram?: Telegram;
    discord?: Discord;
    sdkInfo?: SDKInfo;

    constructor({
        telegram,
        discord,
        sdkInfo,
    }: {
        telegram?: Telegram;
        discord?: Discord;
        sdkInfo?: SDKInfo;
    }) {
        this.telegram = telegram;
        this.discord = discord;
        this.sdkInfo = sdkInfo;
    }

    toMap(): Record<string, any> {
        return {
            telegram: this.telegram?.toMap(),
            discord: this.discord?.toMap(),
            sdk_info: this.sdkInfo?.toMap(),
        };
    }

    merge(defaultTarget?: Target): void {
        if (!defaultTarget) return;
        this.telegram ||= defaultTarget.telegram;
        this.discord ||= defaultTarget.discord;
    }

    static withTelegram(
        chatId: string,
        {
            token,
            parseMode,
            disabled,
            extras,
        }: {
            token?: string;
            parseMode?: TelegramParseMode;
            disabled?: boolean;
            extras?: any;
        } = {}
    ): Target {
        return new Target({
            telegram: new Telegram({
                chatId,
                token,
                parseMode,
                disabled,
                extras,
            }),
        });
    }

    static withDiscord(
        webhookUrl: string,
        {
            webhookId,
            webhookToken,
            disabled,
            extras,
        }: {
            webhookId?: string;
            webhookToken?: string;
            disabled?: boolean;
            extras?: any;
        }
    ): Target {
        return new Target({
            discord: new Discord({
                webhookUrl,
                webhookId,
                webhookToken,
                disabled,
                extras,
            }),
        });
    }

    static builder(): TargetBuilder {
        return new TargetBuilder();
    }
}

class TargetBuilder {
    private _telegram?: Telegram;
    private _discord?: Discord;
    private _sdkInfo?: SDKInfo;

    constructor() { }

    telegram(telegram?: Telegram): TargetBuilder {
        this._telegram = telegram;
        return this;
    }

    discord(discord?: Discord): TargetBuilder {
        this._discord = discord;
        return this;
    }

    sdkInfo(sdkInfo?: SDKInfo): TargetBuilder {
        this._sdkInfo = sdkInfo;
        return this;
    }

    build(): Target {
        return new Target({
            telegram: this._telegram,
            discord: this._discord,
            sdkInfo: this._sdkInfo,
        });
    }
}

class Collector {
    id?: string;
    type?: string;
    source?: string;
    message?: string;
    data?: any;
    userAgent?: string;
    timestamp?: number;
    target?: Target;
    tags?: string[];

    constructor({
        id,
        type,
        source,
        message,
        data,
        userAgent,
        timestamp,
        target,
        tags,
    }: {
        id?: string;
        type?: string;
        source?: string;
        message?: string;
        data?: any;
        userAgent?: string;
        timestamp?: number;
        target?: Target;
        tags?: string[];
    }) {
        this.id = id;
        this.type = type;
        this.source = source;
        this.message = message;
        this.data = data;
        this.userAgent = userAgent;
        this.timestamp = timestamp;
        this.target = target;
        this.tags = tags;
    }

    getId(): string | undefined {
        if (!this.id) {
            this.id = generateUUID();
        }
        return this.id;
    }

    getTimestamp(): number | undefined {
        if (!this.timestamp) {
            this.timestamp = Date.now();
        }
        return this.timestamp;
    }

    toMap(): Record<string, any> {
        return {
            id: this.getId(),
            type: this.type,
            source: this.source,
            message: this.message,
            data: this.data,
            user_agent: this.userAgent,
            timestamp: this.getTimestamp(),
            target: this.target?.toMap(),
            tags: this.tags,
        };
    }

    toJson(): string {
        return JSON.stringify(this.toMap());
    }

    static builder(): CollectorBuilder {
        return new CollectorBuilder();
    }
}

class CollectorBuilder {
    private _id?: string;
    private _type?: string;
    private _source?: string;
    private _message?: string;
    private _data?: any;
    private _userAgent?: string;
    private _timestamp?: number;
    private _target?: Target;
    private _tags?: string[];

    constructor() { }

    id(id: string): CollectorBuilder {
        this._id = id;
        return this;
    }

    type(type: string | CollectorType): CollectorBuilder {
        this._type = type?.toString();
        return this;
    }

    source(source: string | CollectorSource): CollectorBuilder {
        this._source = source?.toString();
        return this;
    }

    message(message: string): CollectorBuilder {
        this._message = message;
        return this;
    }

    data(data: any): CollectorBuilder {
        this._data = data;
        return this;
    }

    userAgent(userAgent: string): CollectorBuilder {
        this._userAgent = userAgent;
        return this;
    }

    timestamp(timestamp: number): CollectorBuilder {
        this._timestamp = timestamp;
        return this;
    }

    target(target: Target): CollectorBuilder {
        this._target = target;
        return this;
    }

    tags(tags: string[]): CollectorBuilder {
        this._tags = tags;
        return this;
    }

    build(): Collector {
        return new Collector({
            id: this._id,
            type: this._type,
            source: this._source,
            message: this._message,
            data: this._data,
            userAgent: this._userAgent,
            timestamp: this._timestamp,
            target: this._target,
            tags: this._tags,
        });
    }
}

class CollectorResponse {
    message?: string;
    id?: string;

    constructor({ message, id }: { message?: string; id?: string }) {
        this.message = message;
        this.id = id;
    }
}

class VLogsOptions {
    url?: string;
    appId?: string;
    apiKey?: string;
    connectionTimeout?: number;
    testConnection?: boolean;
    target?: Target;

    constructor({
        url,
        appId,
        apiKey,
        connectionTimeout,
        testConnection,
        target,
    }: {
        url?: string;
        appId?: string;
        apiKey?: string;
        connectionTimeout?: number;
        testConnection?: boolean;
        target?: Target;
    }) {
        this.url = url;
        this.appId = appId;
        this.apiKey = apiKey;
        this.connectionTimeout = connectionTimeout;
        this.testConnection = testConnection;
        this.target = target;
    }

    static builder(): VLogsOptionsBuilder {
        return new VLogsOptionsBuilder();
    }
}

class VLogsOptionsBuilder {
    private _url?: string;
    private _appId?: string;
    private _apiKey?: string;
    private _connectionTimeout?: number;
    private _testConnection?: boolean;
    private _target?: Target;

    constructor() { }

    url(url: string): VLogsOptionsBuilder {
        this._url = url;
        return this;
    }

    appId(appId: string): VLogsOptionsBuilder {
        this._appId = appId;
        return this;
    }

    apiKey(apiKey: string): VLogsOptionsBuilder {
        this._apiKey = apiKey;
        return this;
    }

    connectionTimeout(connectionTimeout: number): VLogsOptionsBuilder {
        this._connectionTimeout = connectionTimeout;
        return this;
    }

    testConnection(testConnection: boolean): VLogsOptionsBuilder {
        this._testConnection = testConnection;
        return this;
    }

    target(target: Target): VLogsOptionsBuilder {
        this._target = target;
        return this;
    }

    telegram(telegram: Telegram): VLogsOptionsBuilder {
        if (!this._target) {
            this._target = Target.builder().telegram(telegram).build();
        } else {
            this._target.telegram = telegram;
        }
        return this;
    }

    discord(discord: Discord): VLogsOptionsBuilder {
        if (!this._target) {
            this._target = Target.builder().discord(discord).build();
        } else {
            this._target.discord = discord;
        }
        return this;
    }

    build(): VLogsOptions {
        return new VLogsOptions({
            url: this._url,
            appId: this._appId,
            apiKey: this._apiKey,
            connectionTimeout: this._connectionTimeout,
            testConnection: this._testConnection,
            target: this._target,
        });
    }
}


export {
    Collector,
    // CollectorBuilder,
    CollectorResponse,
    Target,
    // TargetBuilder,
    Telegram,
    // TelegramBuilder,
    Discord,
    // DiscordBuilder,
    SDKInfo,
    // SDKInfoBuilder,
    VLogsOptions,
    // VLogsOptionsBuilder,

    CollectorSource,
    CollectorType,
    TelegramParseMode,
}