import Head from "next/head";
import SchemaFormDemo from "@/components/tools/schema-form";

export default function SchemaFormPage() {
    return (
        <>
            <Head>
                <title>SchemaForm - Santiago Bugnón</title>
                <meta
                    name="description"
                    content="Schema-driven React forms built on React Hook Form + Zod + shadcn/ui. Define fields once as a typed config, get a validated, accessible form."
                />
            </Head>
            <SchemaFormDemo />
        </>
    );
}

SchemaFormPage.standalone = true;
