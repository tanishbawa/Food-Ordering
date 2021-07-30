import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

import CartContext from '../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://custom-hooks-26f46-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}> {
        cartCtx.items.map((item) => {
            return <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        })
    } </ul>

    const closeCartHandler = () => {
        props.onCartOpen();
    }
    const orderhandler = () => {
        setIsCheckout(true);
    }

    const cartModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>

        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={closeCartHandler} />}

        {!isCheckout &&
            <div className={classes.actions}>
                <button onClick={closeCartHandler} className={classes['button--alt']}>Close</button>
                {hasItems && <button onClick={orderhandler} className={classes.button}>Order</button>}
            </div>
        }
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button onClick={closeCartHandler} className={classes.button}>Close</button>
            </div>
        </>
    );

    return (
        <Modal onCloseCart={closeCartHandler}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;