import FeatureCard from "./FeatureCard";
import { features } from "../data/dummyData";

const FeatureGrid = () => {
    return (
        <section id="features" className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 text-white">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        desc={feature.desc}
                        accent={feature.accent}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
