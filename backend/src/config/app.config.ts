import { getEnv } from "../utils/get-env";

const appConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "8000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", "mongodb+srv://alaasad2003:Alaa2003@cluster0.onn4t.mongodb.net/FlowStride"),

    SESSION_SECRET: getEnv("SESSION_SECRET", "secret_key"),
    SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN", "1d"),

    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", "423536525070-apq5ov76db65ajmn0qa9gcj4p472htl7.apps.googleusercontent.com"),
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET", "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"),
    GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL", "http://localhost:8000/api/auth/google/callback"),

    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
    FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL", "http://localhost:5173/auth/google/callback"),
});

export const config = appConfig();