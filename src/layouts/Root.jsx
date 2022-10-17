import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Root = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default Root;