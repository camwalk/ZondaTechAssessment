import React from 'react';
import classNames from 'classnames/bind';
import logo from './logo-scaled.png';

import styles from './Header.css';

const cn = classNames.bind(styles);

export const Header = () => {
    return (
        <header className={cn('toolbar')}>
            <img src={logo} className="logo-img"  alt="zonda logo"/>
        </header>
    );
};
