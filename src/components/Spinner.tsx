"use client";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}


export function Spinner2({size}:{size?: string}) {
  return (
    <div className={`flex items-center justify-center w-${size || "10"} h-${size || "10"}`}>
      <div className={`w-[80%] h-[80%] border-4 border-gray-300 border-t-primary-1 rounded-full animate-spin`}></div>
    </div>
  );
}