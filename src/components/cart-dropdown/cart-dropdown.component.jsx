import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'; 

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';


import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      { cartItems.length ?
          cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
        :
        <span className="empty-message">Your cart is empty</span>
      }
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
      }}
    >GO TO CHECKOUT</CustomButton>
  </div>
);

// destructure state below for cart
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

// connect will pass our props down to cartDropdown , if we dont specify second argument next to mapstatetoprops below, so thats why we canuse dispatch above, try doing ...otherProps instead of dispatchandconsole.log it, youwil lsee youhave acess to other props.
export default withRouter(connect(mapStateToProps)(CartDropdown));
