declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: string;
        MONGO_DB_URL: string;
    }
}