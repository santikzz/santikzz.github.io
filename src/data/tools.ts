export type Tool = {
    slug: string;
    name: string;
    description: string;
};

// array order is sidenav order
export const tools: Tool[] = [
    {
        slug: "schema-form/builder",
        name: "Schema Form Sandbox",
        description: "Build and preview forms from a JSON schema.",
    },
    {
        slug: "sonus",
        name: "Sonus Playground",
        description: "Live audio playground.",
    },
];
