import ENV from "./env.js";

const corsOptions = {
    origin: [
        `${ENV.CLIENT_URL}`,
        'https://mobileapp.tunehub.com'
    ],
    credentials: true
}

export default corsOptions;