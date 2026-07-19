export default function SectionLabel({ label }: { label: string }) {
    return (
        <p className="text-xs text-muted-foreground mb-8 tracking-widest uppercase">{label}</p>
    );
}
