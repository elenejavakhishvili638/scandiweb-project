import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";

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
    <div>
      <div className="cart-page">
        <h1>Cart</h1>
        <hr />
        {itemQuantity === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
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
                <hr />
              </li>
            ))}
          </ul>
        )}

        <div>
          <p className="cartText">
            tax21%:
            <span className="span">
              {symbol}
              {Math.round((total * 21) / 100).toFixed(2)}
            </span>
          </p>
          <p className="cartText">
            quantity:<span className="span">{quantity}</span>
          </p>
          <p className="cartText">
            total:
            <span className="span">
              {symbol}
              {total.toFixed(2)}
            </span>
          </p>
          <button className="orderBtn">order</button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
