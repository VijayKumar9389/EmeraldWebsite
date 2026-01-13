"use client";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    overline?: string;
    centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    overline,
    centered = false,
}) => {
    return (
        <div
            className={`max-w-3xl mb-12 md:mb-16 ${
                centered ? "mx-auto text-center" : ""
            }`}
        >
            {overline && (
                <span className="overline">{overline}</span>
            )}
            <h2 className={`heading ${overline ? "mt-3" : ""}`}>
                {title}
            </h2>
            {subtitle && (
                <p className="paragraph mt-4">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionHeader;
