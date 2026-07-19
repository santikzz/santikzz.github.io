export type Tool = {
    slug: string;
    name: string;
    description: string;
};

// array order is sidenav order
export const tools: Tool[] = [
    {
        slug: "schema-form",
        name: "Schema Forms",
        description: "Build and preview forms from a JSON schema.",
    },
    {
        slug: "sonus",
        name: "Sonus",
        description: "Live audio playground.",
    },
];
