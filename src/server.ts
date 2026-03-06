import { Server } from "http";
import app from "./app";
import config from "./config";
import { getLocalIP } from "./shared/utils/local-ip";
import { initiateSuperAdmin } from "./app/setup/initiate-db";

let server: Server;

// Main function to start the server
async function main() {
    try {
        // Initialize database setup (like super admin)
        await initiateSuperAdmin();

        server = app.listen(config.port, () => {
            const ip = getLocalIP();
            console.log(`\nServer is running on:
    http://localhost:${config.port}
    http://${ip}:${config.port}\n`);
        });
    } catch (error) {
        console.log(error);
    }
}

// Start the server
main();

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log(`Uncaught Exception is detected , shutting down ...`);
    process.exit(1);
});
