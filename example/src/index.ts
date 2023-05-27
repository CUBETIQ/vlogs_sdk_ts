import { Collector, VLogs, VLogsOptions } from "@cubetiq/vlogs";


const APP_ID = '72bd14c306a91fa8a590330e3898ddcc';
const API_KEY = 'vlogs_gX9WwSdKatMNdpUClLU0IfCx575tvdoeQ'

const sdk = VLogs.create(
    VLogsOptions.builder()
        .appId(APP_ID)
        .apiKey(API_KEY)
        .build()
)

const start = async () => {
    const request = Collector.builder()
        .message('Hello from vlogs-ts-sdk')
        .type("log")
        .source("web")
        .build();

    const response = await sdk.collect(request);

    console.log("Request: ", request);
    console.log("Response: ", response);
}


start().then(() => {
    console.log("Done");
}).catch((err) => {
    console.error(err);
})