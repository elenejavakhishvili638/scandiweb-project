import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import HexToRgbA from "./hexToRgbA";
import CartGallery from "./CartGallery";
import { holdAttribute, chooseAttribute } from "../store/holdAttributeSlice";

function CartItem({
  id,
  price,
  name,
  total,
  quantity,
  brand,
  priceSymbol,
  gallery,
  attributes,
  attribute,
}) {
  const dispatch = useDispatch();
  const showCartOverlay = useSelector((state) => state.cartOverlay.overlay);
  const chooseAttributeItem = useSelector(
    (state) => state.holdAttribute.attribute
  );
  const holdAttributeItem = useSelector(
    (state) => state.holdAttribute.colorAttribute
  );

  const addCart = () => {
    dispatch(
      addToCart({
        name,
        id,
        price,
        brand,
        priceSymbol,
        gallery,
        attributes,
        attribute,
      })
    );
  };

  const removeCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <div className="cartItem-container">
        <div className="cart-left-part">
          <p className={!showCartOverlay ? "itemName" : "itemName-overlay"}>
            {name}
          </p>
          <p className={!showCartOverlay ? "itemBrand" : "itemBrand-overlay"}>
            {brand}
          </p>
          <p className={!showCartOverlay ? "itemPrice" : "itemPrice-overlay"}>
            {priceSymbol}
            {price}
          </p>
          {attributes &&
            attributes.map((attr, index) => {
              return (
                <div key={index} className="attribute-container">
                  <div
                    className={
                      !showCartOverlay
                        ? "attribute-name"
                        : "attribute-name-overlay"
                    }
                  >
                    <p>{attr.name}:</p>
                  </div>
                  <div
                    className={
                      !showCartOverlay
                        ? "attribute-items"
                        : "attribute-items-overlay"
                    }
                  >
                    {attr.items.map((item, index) => {
                      if (attr.name === "Color") {
                        const bcg = HexToRgbA(item.value);
                        return (
                          <p
                            key={index}
                            onClick={() => {
                              console.log(item.value);
                              dispatch(holdAttribute(item.value));
                            }}
                            style={{
                              backgroundColor: bcg,
                              width: !showCartOverlay ? 32 : 16,
                              height: !showCartOverlay ? 32 : 16,
                              border:
                                holdAttributeItem === item.value
                                  ? "1.5px solid #59E391"
                                  : "#ffff",
                            }}
                          ></p>
                        );
                      }
                      return (
                        <p
                          key={index}
                          onClick={() => {
                            console.log(attr.name);
                            dispatch(
                              chooseAttribute({
                                key: attr.name,
                                value: item.value,
                              })
                            );
                          }}
                          className={
                            chooseAttributeItem.find((x) => x.key === attr.name)
                              ?.value === item.value
                              ? "hold-attribute"
                              : null
                          }
                        >
                          {item.value}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="cart-right-part">
          <div className="quantity-measure">
            <button
              className={!showCartOverlay ? "add" : "add-overlay"}
              onClick={addCart}
            >
              +
            </button>
            <p className="itemQuantity">{quantity}</p>
            <button
              className={!showCartOverlay ? "remove" : "remove-overlay"}
              onClick={removeCart}
            >
              -
            </button>
          </div>

          <div className="cart-middle-part">
            <CartGallery gallery={gallery} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
