import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", visible: false });

    const showToast = (message) => {
        setToast({ message, visible: true });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, visible: false }));
    };

    useEffect(() => {
        if (toast.visible) {
            const timer = setTimeout(() => {
                hideToast();
            }, 3000); // Auto-dismiss after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [toast.visible]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Global Toast UI */}
            <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${toast.visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="bg-white rounded-full shadow-lg border border-green-100 py-3 px-6 flex items-center gap-3 min-w-[300px] justify-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{toast.message}</p>
                    <button
                        onClick={hideToast}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </ToastContext.Provider>
    );
};
