import FeatureCard from "./FeatureCard";
import { features } from "../data/dummyData";

const FeatureGrid = () => {
  return (
    <section id="features" className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Premium Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
