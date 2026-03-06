import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// Define the schema for environment variables
const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.string().default("5000").transform(Number),
    COMPANY_NAME: z.string().optional().default("Backend Starter Pack"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    // URL Configs
    FRONTEND_URL: z.string().url().optional(),
    BACKEND_URL: z.string().url().optional(),
    BACKEND_UPLOADS_URL: z.string().url().optional(),
    RESET_PASS_URL: z.string().url().optional(),

    // JWT Configs
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    JWT_SECRET_EXPIRES_IN: z.string().default("1d"),
    REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default("30d"),
    RESET_TOKEN_SECRET: z.string().min(1, "RESET_TOKEN_SECRET is required"),
    RESET_TOKEN_EXPIRES_IN: z.string().default("15m"),

    // SMTP Configs
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().default("587").transform(Number),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SENDER_EMAIL: z.string().email().optional(),

    // Payment Configs
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_CLIENT_ID: z.string().optional(),

    PAYPAL_CLIENT_ID: z.string().optional(),
    PAYPAL_CLIENT_SECRET: z.string().optional(),
    PAYPAL_MODE: z.enum(["sandbox", "live"]).optional().default("sandbox"),

    SENDGRID_API_KEY: z.string().optional(),
    SENDGRID_EMAIL: z.string().email().optional(),

    // AWS Configs
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_REGION: z.string().optional(),
    AWS_BUCKET_NAME: z.string().optional(),

    // Other
    PASSWORD_SALT: z.string().default("12").transform(Number),
});

// Parse and validate process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        "❌ Invalid environment variables:",
        parsedEnv.error.format(),
    );
    process.exit(1);
}

const env = parsedEnv.data;

export default {
    env: env.NODE_ENV,
    port: env.PORT,
    company_name: env.COMPANY_NAME,
    url: {
        frontend: env.FRONTEND_URL,
        backend: env.BACKEND_URL,
        uploads: env.BACKEND_UPLOADS_URL,
        reset_pass: env.RESET_PASS_URL,
    },
    stripe: {
        secret_key: env.STRIPE_SECRET_KEY,
        webhook_secret: env.STRIPE_WEBHOOK_SECRET,
        publishable_key: env.STRIPE_PUBLISHABLE_KEY,
        client_id: env.STRIPE_CLIENT_ID,
    },
    jwt: {
        jwt_secret: env.JWT_SECRET,
        jwt_secret_expires_in: env.JWT_SECRET_EXPIRES_IN,
        refresh_token_secret: env.REFRESH_TOKEN_SECRET,
        refresh_token_expires_in: env.REFRESH_TOKEN_EXPIRES_IN,
        reset_token_secret: env.RESET_TOKEN_SECRET,
        reset_token_expires_in: env.RESET_TOKEN_EXPIRES_IN,
    },
    smtp: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        sender: env.SENDER_EMAIL,
    },
    paypal: {
        client_id: env.PAYPAL_CLIENT_ID,
        client_secret: env.PAYPAL_CLIENT_SECRET,
        mode: env.PAYPAL_MODE,
    },
    sendGrid: {
        api_key: env.SENDGRID_API_KEY,
        email_from: env.SENDGRID_EMAIL,
    },
    aws: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
        bucketName: env.AWS_BUCKET_NAME,
    },
    password: {
        salt: env.PASSWORD_SALT,
    },
};
