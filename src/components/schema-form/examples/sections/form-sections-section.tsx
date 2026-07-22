import { z } from "zod";
import { SchemaForm } from "../../index";
import { ExampleBlock } from "../example-block";
import { PropsTable } from "../props-table";

function onSubmit(data: unknown) {
    alert(JSON.stringify(data, null, 2));
}

export function FormSectionsSection() {
    return (
        <div className="flex flex-col gap-6">
        <ExampleBlock
            title="Sections"
            badge="sections"
            description="Group fields visually with titles, descriptions, and per-section grids. Validation still uses one flat schema."
            code={CODE}
        >
            <SchemaForm
                schema={z.object({
                    first_name: z.string().min(2, "Required"),
                    last_name:  z.string().min(2, "Required"),
                    email:      z.string().email("Invalid email"),
                    password:   z.string().min(8, "At least 8 characters"),
                    newsletter: z.boolean().optional(),
                })}
                sections={[
                    {
                        title: "User info",
                        description: "Name and contact details.",
                        fields: [
                            { name: "first_name", component: "input", label: "First name", required: true },
                            { name: "last_name",  component: "input", label: "Last name",  required: true },
                            { name: "email",      component: "input", label: "Email", type: "email", required: true, colSpan: 2 },
                        ],
                    },
                    {
                        title: "Security",
                        description: "Choose a strong password.",
                        separator: true,
                        columns: 1,
                        fields: [
                            { name: "password", component: "password", label: "Password", showStrength: true, required: true },
                        ],
                    },
                    {
                        separator: true,
                        fields: [
                            { name: "newsletter", component: "switch", label: "Subscribe to newsletter" },
                        ],
                    },
                ]}
                onSubmit={onSubmit}
                submitLabel="Create account"
            />
        </ExampleBlock>
        <PropsTable
            title="FormSection props"
            rows={[
                { name: "title", type: "string", description: "Section heading" },
                { name: "description", type: "string", description: "Muted text under the heading" },
                { name: "fields", type: "FieldConfig[]", description: "Fields rendered in this section's grid" },
                { name: "columns", type: "1 | 2 | 3", description: "Overrides the form-level columns for this section" },
                { name: "separator", type: "boolean", default: "false", description: "Top border above the section" },
                { name: "className", type: "string", description: "CSS classes on the section wrapper" },
            ]}
        />
        </div>
    );
}

const CODE = `\
<SchemaForm
    schema={schema}
    sections={[
        {
            title: "User info",
            description: "Name and contact details.",
            fields: [
                { name: "first_name", component: "input", label: "First name" },
                { name: "last_name",  component: "input", label: "Last name" },
                { name: "email",      component: "input", label: "Email", colSpan: 2 },
            ],
        },
        {
            title: "Security",
            separator: true,
            columns: 1,
            fields: [
                { name: "password", component: "password", showStrength: true },
            ],
        },
    ]}
    onSubmit={(data) => console.log(data)}
/>`;
