declare module '*.svg' {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGElement>>;
    export default SVG;
}

/// <reference types="vite/client" />
