import React from "react";

const Segmentos = () => {
    return (
        <div>
            <h1>Segmentos</h1>
            <p>Esta es una representación falsa de segmentos en geometría.</p>
            <svg width="200" height="200">
                <line x1="10" y1="50" x2="190" y2="50" stroke="black" strokeWidth="2" />
                <line x1="50" y1="10" x2="50" y2="190" stroke="red" strokeWidth="2" />
                <line x1="20" y1="20" x2="180" y2="180" stroke="blue" strokeWidth="2" />
            </svg>
        </div>
    );
};

export default Segmentos;