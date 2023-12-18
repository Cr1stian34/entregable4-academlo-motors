import "dotenv/config";

import env from "env-var"

const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DB_URL: env.get("DB_URL").required().asString(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    SECRET_JWT_SEED: env.get("SECRET_JWT_SEED").required().asString(),
    JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString()
}

export default envs