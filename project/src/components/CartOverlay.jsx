import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { cartOverlay } from "../store/cartOverlaySlice";

function CartItems() {
  const cartItems = useSelector((state) => state.cart.itemsList);
  const itemQuantity = useSelector((state) => state.cart.totalQuantity);
  let total = 0;
  let symbol;
  let itemsList = useSelector((state) => state.cart.itemsList);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const showCartOverlay = useSelector((state) => state.cartOverlay.overlay);
  const dispatch = useDispatch();

  itemsList.forEach((item) => {
    total += item.totalPrice;
    symbol = item.priceSymbol;
  });

  return (
    <div className="main-cart-overlay">
      <div className="cart-overlay">
        <h1>{`${"My Bags, " + quantity + " items"}`}</h1>

        {itemQuantity === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul className="cart-overlay-ul">
            {cartItems.map((item, index) => (
              <li key={index}>
                <CartItem
                  id={item.id}
                  price={item.price}
                  quantity={item.quantity}
                  total={item.totalPrice}
                  name={item.name}
                  brand={item.brand}
                  priceSymbol={item.priceSymbol}
                  gallery={item.pictures}
                  attributes={item.itemAttributes}
                />
              </li>
            ))}
          </ul>
        )}

        <div>
          <div className="total-overlay">
            <p className="cartText-overlay">total:</p>
            <p className="span-overlay">
              {symbol}
              {total.toFixed(2)}
            </p>
          </div>
          <div className="btn-container-overlay">
            <Link to="/cartItems">
              <button
                className="viewBagBtn"
                onClick={() => {
                  dispatch(cartOverlay());
                }}
              >
                view bag
              </button>
            </Link>
            <button className="checkOutBtn">checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
