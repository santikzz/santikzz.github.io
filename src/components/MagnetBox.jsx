import { useEffect, useRef } from "react";

export default function MagnetBox({ children, className, force }) {

    const magnetRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (magnetRef.current) {
                const rect = magnetRef.current.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                const offsetX = (mouseX / rect.width - 0.5) * 2;
                const offsetY = (mouseY / rect.height - 0.5) * 2;

                magnetRef.current.style.transform = `translate(${offsetX * force}px, ${offsetY * force}px)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (

        <div className={className} ref={magnetRef}>
            {children}
        </div>

    );


}