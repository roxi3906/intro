import { defineConfig } from "@solidjs/start/config";

declare const process: { env: { BASE_URL?: string } };

const baseURL = process.env.BASE_URL || "/";

export default defineConfig({
    server: {
        baseURL,
        preset: "static",
        prerender: {
            routes: ["/"]
        }
    },
    vite: {
        base: baseURL
    }
});
