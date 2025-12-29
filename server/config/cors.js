import { CLIENT_URL } from "./env.js";

const corsOptions = {
    origin: CLIENT_URL,
}

export default corsOptions;