import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {

    return (
        <LottieView
            source={require('../images/bowlanimation.json')} 
            autoPlay
            loop
            style={{
                width: 200,
                height: 200
            }}
        />
    );
};

export default Loading;
