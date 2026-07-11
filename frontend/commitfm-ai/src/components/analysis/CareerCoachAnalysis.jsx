import CareerCoach from "../CareerCoach";

const CareerCoachAnalysis = () => {
    return (
        <div className="space-y-6 text-left">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Career Guidance</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">AI Career Coach</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <CareerCoach />
            </div>
        </div>
    );
};

export default CareerCoachAnalysis;
