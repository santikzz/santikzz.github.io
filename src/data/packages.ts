export type PackageSource = "npm" | "pypi" | "github";

export type Package = {
    name: string;
    link: string;
    description: string;
    source: PackageSource;
    tags: string[];
};

export const packages: Package[] = [
    {
        name: "sonus-js",
        link: "https://www.npmjs.com/package/sonus-js",
        description:
            "Synthesized UI sounds for React - one hook, zero audio files, real-time pitch/rate/volume control.",
        source: "npm",
        tags: ["frontend", "react", "web", "audio"],
    },
    {
        name: "@santikzz/dokploy-cli",
        link: "https://www.npmjs.com/package/@santikzz/dokploy-cli",
        description: "Unofficial CLI for Dokploy: deployment status, poll, logs, apps.",
        source: "npm",
        tags: ["devops", "cli", "backend"],
    },
    {
        name: "pxtract",
        link: "https://github.com/santikzz/pxtract",
        description:
            "Extract commit author emails from a GitHub user's public repos by walking commit patch headers.",
        source: "github",
        tags: ["osint", "pentesting", "cli", "python"],
    },
];
