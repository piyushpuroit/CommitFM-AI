import React, { useState } from "react";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Analysis Completed", time: "Just now", read: false, type: "success", text: "Ingested active repository telemetry successfully." },
    { id: 2, title: "GitHub Session Active", time: "10m ago", read: true, type: "info", text: "OAuth session token refreshed for @piyushpuroit." },
    { id: 3, title: "Rate Limit Status", time: "1h ago", read: true, type: "warning", text: "5,000 requests / hour quota active." }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition cursor-pointer relative"
        title="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full animate-ping" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-brand-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden text-left space-y-2 p-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[9px] text-brand-accent hover:underline font-semibold"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl border transition ${
                    n.read ? "bg-brand-bg/30 border-white/5 opacity-70" : "bg-brand-primary/10 border-brand-primary/20"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-white">{n.title}</span>
                    <span className="text-brand-muted font-mono text-[8px]">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
