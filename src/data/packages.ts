export type Package = {
    name: string;
    link: string;
    description: string;
};

export const packages: Package[] = [
    {
        name: "sonus-js",
        link: "https://www.npmjs.com/package/sonus-js",
        description:
            "Synthesized UI sounds for React - one hook, zero audio files, real-time pitch/rate/volume control.",
    },
    {
        name: "@santikzz/dokploy-cli",
        link: "https://www.npmjs.com/package/@santikzz/dokploy-cli",
        description: "Unofficial CLI for Dokploy: deployment status, poll, logs, apps.",
    },
];
