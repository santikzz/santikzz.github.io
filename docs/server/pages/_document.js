const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_79ae27ad._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__53255d65._.js");
runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_document.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_document.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
