import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin una sola vez
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedContentProps {
    children: ReactNode;
    distance?: number;
    direction?: "vertical" | "horizontal";
    reverse?: boolean;
    duration?: number;
    ease?: string;
    initialOpacity?: number;
    animateOpacity?: boolean;
    scale?: number;
    threshold?: number;
    delay?: number;
    onComplete?: () => void;
}

const AnimatedContent = ({
    children,
    distance = 100,
    direction = "vertical",
    reverse = false,
    duration = 0.8,
    ease = "power3.out",
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    onComplete,
}: AnimatedContentProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            console.warn('AnimatedContent: Element ref is null');
            return;
        }

        // Determinar el eje de animación
        const axis = direction === "horizontal" ? "x" : "y";
        const offset = reverse ? -distance : distance;
        
        // Calcular el punto de inicio (más permisivo)
        const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100));

        console.log('AnimatedContent: Setting up animation', {
            element: el,
            axis,
            offset,
            startPct: `${startPct}%`
        });

        // Configurar estado inicial con will-change para mejor rendimiento
        gsap.set(el, {
            [axis]: offset,
            scale: scale,
            opacity: animateOpacity ? initialOpacity : 1,
            willChange: 'transform, opacity',
        });

        // Crear animación con ScrollTrigger
        const ctx = gsap.context(() => {
            const animation = gsap.to(el, {
                [axis]: 0,
                scale: 1,
                opacity: 1,
                duration,
                ease,
                delay,
                onComplete: () => {
                    console.log('AnimatedContent: Animation complete');
                    // Remover will-change después de la animación
                    gsap.set(el, { willChange: 'auto' });
                    onComplete?.();
                },
                scrollTrigger: {
                    trigger: el,
                    start: `top ${startPct}%`,
                    end: `bottom ${startPct}%`,
                    toggleActions: "play none none none",
                    once: true,
                    onEnter: () => console.log('AnimatedContent: ScrollTrigger activated'),
                    // Descomentar para debug:
                    // markers: true,
                },
            });

            console.log('AnimatedContent: ScrollTrigger created', animation.scrollTrigger);
        }, el);

        // Cleanup mejorado
        return () => {
            console.log('AnimatedContent: Cleaning up');
            ctx.revert();
        };
    }, [distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay, onComplete]);

    return (
        <div ref={ref} style={{ willChange: 'transform, opacity' }}>
            {children}
        </div>
    );
};

export default AnimatedContent;
