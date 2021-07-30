import React from 'react';

import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';

import mealsImage from '../assets/meals.jpg';

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onCartOpen={props.onCartOpen} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='mealsImage' />
            </div>
        </>
    );
}

export default Header;