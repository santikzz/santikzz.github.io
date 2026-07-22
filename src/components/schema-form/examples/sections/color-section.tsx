import { z } from "zod";
import { SchemaForm } from "../../index";
import { ExampleBlock } from "../example-block";
import { PropsTable } from "../props-table";

function onSubmit(data: unknown) {
    alert(JSON.stringify(data, null, 2));
}

export function ColorSection() {
    return (
        <div className="flex flex-col gap-6">
        <ExampleBlock
            title="Color"
            badge="color"
            description="Color picker in a popover with eyedropper and format output. Stores a hex string."
            code={CODE}
        >
            <SchemaForm
                schema={z.object({
                    brand_color:  z.string().min(1, "Pick a color"),
                    accent_color: z.string().optional(),
                })}
                defaultValues={{ brand_color: "#7c3aed" }}
                fields={[
                    {
                        name: "brand_color",
                        component: "color",
                        label: "Brand color",
                        required: true,
                        description: "Used for buttons and links.",
                    },
                    {
                        name: "accent_color",
                        component: "color",
                        label: "Accent color",
                        showAlpha: true,
                        description: "Optional - supports transparency.",
                    },
                ]}
                onSubmit={onSubmit}
                submitLabel="Save theme"
                columns={2}
            />
        </ExampleBlock>
        <PropsTable
            title="ColorFieldConfig props"
            rows={[
                { name: "component", type: '"color"', description: "Field type discriminator" },
                { name: "showAlpha", type: "boolean", default: "false", description: "Show the opacity slider - stored hex includes alpha" },
                { name: "inputClassName", type: "string", description: "CSS classes on the trigger button" },
            ]}
        />
        </div>
    );
}

const CODE = `\
const schema = z.object({
    brand_color:  z.string().min(1, "Pick a color"),
    accent_color: z.string().optional(),
});

<SchemaForm
    schema={schema}
    defaultValues={{ brand_color: "#7c3aed" }}
    fields={[
        { name: "brand_color",  component: "color", label: "Brand color", required: true },
        { name: "accent_color", component: "color", label: "Accent color", showAlpha: true },
    ]}
    onSubmit={(data) => console.log(data)}
    columns={2}
/>`;
