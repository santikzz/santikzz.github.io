import axios, { type AxiosResponse } from "axios";

// the portfolio is a static export, so the select-api demo can't hit a real
// backend - this axios interceptor fakes the /api/categories endpoint the
// same way the schema-form demo's vite middleware does
const categories = [
    "Electronics", "Books", "Clothing", "Home & Garden", "Toys",
    "Sports", "Automotive", "Music", "Movies", "Games",
    "Health", "Beauty", "Grocery", "Office", "Pets",
].map((name, i) => ({ id: i + 1, name }));

axios.interceptors.request.use((config) => {
    if (config.url !== "/api/categories") return config;

    config.adapter = async () => {
        const q = String(config.params?.q ?? "").toLowerCase();
        const limit = Number(config.params?.limit ?? 10);
        const data = categories
            .filter((c) => c.name.toLowerCase().includes(q))
            .slice(0, limit);
        await new Promise((resolve) => setTimeout(resolve, 300));
        return { data, status: 200, statusText: "OK", headers: {}, config } as AxiosResponse;
    };
    return config;
});
