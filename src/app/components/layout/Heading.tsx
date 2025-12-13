'use client';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="max-w-3xl mb-12">
            <h2 className="heading text-text-color">{title}</h2>
            {subtitle && <p className="paragraph text-text-light mt-2">{subtitle}</p>}
        </div>
    );
};

export default SectionHeader;