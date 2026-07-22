import Head from "next/head";
import SchemaFormBuilder from "@/components/tools/schema-form/builder";

export default function SchemaFormBuilderPage() {
    return (
        <>
            <Head>
                <title>SchemaForm Builder - Santiago Bugnón</title>
                <meta
                    name="description"
                    content="Interactive form builder for SchemaForm. Compose fields visually, tweak every option, and copy the generated React Hook Form + Zod code."
                />
            </Head>
            <SchemaFormBuilder />
        </>
    );
}

SchemaFormBuilderPage.standalone = true;
