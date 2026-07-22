import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

// sandbox-scoped theming: variables are applied inline on <html> so radix
// portals inherit them, and everything is restored when the page unmounts.
// default theme is served from /schema-form-default.css; imported themes
// (tweakcn.com / ui.shadcn.com/create exports) are persisted as raw css.

const MODE_KEY = "schema-form-theme";
const CSS_KEY = "schema-form-theme-css";
const DEFAULT_THEME_URL = "/schema-form-default.css";

type Mode = "light" | "dark";
type ThemeVars = { light: Record<string, string>; dark: Record<string, string> };

export function parseThemeCss(css: string): ThemeVars | null {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");

    const grab = (selector: RegExp): Record<string, string> => {
        const block = stripped.match(selector);
        if (!block) return {};
        const vars: Record<string, string> = {};
        for (const decl of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
            vars[decl[1]] = decl[2].trim();
        }
        return vars;
    };

    const light = grab(/(?:^|\s):root\s*\{([^}]*)\}/);
    const dark = grab(/\.dark\s*\{([^}]*)\}/);
    if (!Object.keys(light).length && !Object.keys(dark).length) return null;
    return { light, dark };
}

type SandboxThemeContextValue = {
    mode: Mode;
    setMode: (mode: Mode) => void;
    isCustomTheme: boolean;
    importTheme: (css: string) => boolean;
    resetTheme: () => void;
};

const SandboxThemeContext = createContext<SandboxThemeContextValue | null>(null);

export function useSandboxTheme() {
    const context = useContext(SandboxThemeContext);
    if (!context) throw new Error("useSandboxTheme must be used within SandboxThemeProvider");
    return context;
}

export function SandboxThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<Mode>("dark");
    const [vars, setVars] = useState<ThemeVars | null>(null);
    const [isCustomTheme, setIsCustomTheme] = useState(false);
    const defaultVarsRef = useRef<ThemeVars | null>(null);
    const appliedRef = useRef<string[]>([]);

    useEffect(() => {
        const savedMode = localStorage.getItem(MODE_KEY);
        setModeState(savedMode === "light" ? "light" : "dark");

        const customCss = localStorage.getItem(CSS_KEY);
        const custom = customCss ? parseThemeCss(customCss) : null;
        if (custom) {
            setVars(custom);
            setIsCustomTheme(true);
        }

        let cancelled = false;
        fetch(DEFAULT_THEME_URL)
            .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
            .then((css) => {
                if (cancelled) return;
                defaultVarsRef.current = parseThemeCss(css);
                if (!custom) setVars(defaultVarsRef.current);
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", mode === "dark");

        appliedRef.current.forEach((name) => root.style.removeProperty(name));
        const modeVars = vars?.[mode] ?? {};
        const active = Object.keys(modeVars).length ? modeVars : vars?.light ?? {};
        Object.entries(active).forEach(([name, value]) => root.style.setProperty(name, value));
        appliedRef.current = Object.keys(active);
    }, [mode, vars]);

    // the portfolio is always dark and defines its tokens in globals.css
    useEffect(() => {
        return () => {
            const root = document.documentElement;
            appliedRef.current.forEach((name) => root.style.removeProperty(name));
            root.classList.add("dark");
        };
    }, []);

    const setMode = (next: Mode) => {
        setModeState(next);
        localStorage.setItem(MODE_KEY, next);
    };

    const importTheme = (css: string): boolean => {
        const parsed = parseThemeCss(css);
        if (!parsed) return false;
        localStorage.setItem(CSS_KEY, css);
        setVars(parsed);
        setIsCustomTheme(true);
        return true;
    };

    const resetTheme = () => {
        localStorage.removeItem(CSS_KEY);
        setVars(defaultVarsRef.current);
        setIsCustomTheme(false);
    };

    return (
        <SandboxThemeContext.Provider value={{ mode, setMode, isCustomTheme, importTheme, resetTheme }}>
            {children}
        </SandboxThemeContext.Provider>
    );
}
