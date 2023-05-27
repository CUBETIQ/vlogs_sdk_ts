# vLogs SDK for JS/TS

A simple way to collect logs and send to the server via simple SDK.

-   [x] Collect the logs
-   [ ] Support local retries

## Usages

```typescript
const APP_ID = 'xxx';
const API_KEY = 'vlogs_xxx';

const sdk = VLogs.create(
    VLogsOptions.builder().appId(APP_ID).apiKey(API_KEY).build()
);

const request = Collector.builder()
    .message('Hello from vlogs-ts-sdk')
    .type(CollectorType.Log)
    .source(CollectorSource.Web)
    .build();

const response = await sdk.collect(request);
console.log('Request: ', request);
console.log('Response: ', response);
```

### Contributors

-   Sambo Chea <sombochea@cubetiqs.com>
