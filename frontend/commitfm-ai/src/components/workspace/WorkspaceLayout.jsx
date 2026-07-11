import React, { useState } from "react";
import WorkspaceNavigation from "./WorkspaceNavigation";

const WorkspaceLayout = ({ activeModule, onSelectModule, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex flex-col md:flex-row flex-1 min-h-0 border border-white/5 rounded-2xl overflow-hidden bg-brand-bg/40">
            {/* Sidebar Navigation */}
            <WorkspaceNavigation 
                activeModule={activeModule}
                onSelect={onSelectModule}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                {children}
            </div>
        </div>
    );
};

export default WorkspaceLayout;
