import React, { useEffect, useState } from 'react';
import './loading.css';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
    const { isLoading } = useSelector((state) => state.loadingState);
    return (
        isLoading ? (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        ) : <div />
    );
};

export default LoadingScreen;