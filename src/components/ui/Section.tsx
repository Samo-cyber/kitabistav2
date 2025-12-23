import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    withDivider?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ className, container = true, withDivider = false, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("py-16 md:py-24 relative overflow-hidden", className)}
                {...props}
            >
                {withDivider && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                )}

                {container ? (
                    <div className="container mx-auto px-4 md:px-6">{children}</div>
                ) : (
                    children
                )}

                {withDivider && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                )}
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
