import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";

type PageComponent = AppProps["Component"] & { standalone?: boolean };

export default function App({ Component, pageProps }: AppProps) {
    if ((Component as PageComponent).standalone) {
        return <Component {...pageProps} />;
    }

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
