import ResumeReadinessCard from "../ResumeReadinessCard";

const ResumeGeneratorAnalysis = () => {
    return (
        <div className="space-y-6 text-left">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Resume Diagnostics</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">Resume Readiness & Builder</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <ResumeReadinessCard />
            </div>
        </div>
    );
};

export default ResumeGeneratorAnalysis;
