import { useEffect, useRef } from 'react';

export default function FloatBox({ children, delay }) {

    const fadeInRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.remove('opacity-25');
                            entry.target.classList.remove('translate-y-24');
                            entry.target.classList.add('opacity-100');
                        }, delay)
                    }
                });
            },
            { threshold: 0.25 }
        );

        if (fadeInRef.current) {
            observer.observe(fadeInRef.current);
        }

        return () => {
            if (fadeInRef.current) {
                observer.unobserve(fadeInRef.current);
            }
        };
    }, []);

    return (
        <div
            className="flex-1 md:border border-2 relative opacity-0 transition-all duration-1000 ease translate-y-24"
            ref={fadeInRef}
        >
            {children}
        </div>
    );
}