import { Collector, CollectorSource, CollectorType, VLogs, VLogsOptions } from '../src';

const APP_ID = '72bd14c306a91fa8a590330e3898ddcc';
const API_KEY = 'vlogs_gX9WwSdKatMNdpUClLU0IfCx575tvdoeQ'

const sdk = VLogs.create(
    VLogsOptions.builder()
        .appId(APP_ID)
        .apiKey(API_KEY)
        // .target(Target.withTelegram("xxx"))
        .build()
)

test('VLogs sdk should be defined', () => {
    expect(sdk).toBeDefined();
});

test('VLogs sdk should be able to collect logs', async () => {
    const request = Collector.builder()
        .message('Hello from vlogs-ts-sdk')
        .type(CollectorType.Log)
        .source(CollectorSource.Web)
        .build();

    const response = await sdk.collect(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.getId()).toBeDefined();
    expect(request.getId()).not.toBeNull();
    expect(request.getId()).toEqual(response.id);

    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.id).not.toBeNull();
    expect(response.id).not.toBe('');
})

test('VLogs sdk should be able to collect logs with target', async () => {
    const request = Collector.builder()
        .message('Hello from vlogs-ts-sdk')
        .type(CollectorType.Log)
        .source(CollectorSource.Web)
        // .target(Target.withTelegram("xxx"))
        .build();

    const response = await sdk.collect(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.getId()).toBeDefined();
    expect(request.getId()).not.toBeNull();
    expect(request.getId()).toEqual(response.id);

    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.id).not.toBeNull();
    expect(response.id).not.toBe('');
})