const serverUrl = import.meta.env.VITE_SERVER_URL;

if (!serverUrl) {
    throw new Error(`serverUrl is not defined`);
}

export const ENV = {
    serverUrl
}