import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import HexToRgbA from "./hexToRgbA";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { holdAttribute, chooseAttribute } from "../store/holdAttributeSlice";
import Attribute from "./Attribute";

function Product() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const [select, setSelect] = useState(false);

  const { id, name, gallery, description, brand, attributes, prices, inStock } =
    location.state;
  const currencySelector = useSelector((state) => state.currency.value);

  const holdAttributeItem = useSelector(
    (state) => state.holdAttribute.colorAttribute
  );
  const chooseAttributeItem = useSelector(
    (state) => state.holdAttribute.attribute
  );
  const [selected, setSelected] = useState(gallery[0]);
  const dispatch = useDispatch();

  let price = prices.amount;
  let priceSymbol = prices.currency.symbol;
  const itemAttributes = attributes.map((attribute) => attribute);

  console.log(chooseAttributeItem);
  const pictures = gallery.map((pic) => pic);
  const handleClick = (url) => {
    setSelected(url);
    setIsActive(true);
  };

  const addCart = () => {
    setSelect(true);
    if (inStock) {
      dispatch(
        addToCart({
          name,
          id,
          price,
          brand,
          priceSymbol,
          pictures,
          itemAttributes,
        })
      );
    }
  };

  return (
    <div>
      {/* <Link to='/'>Back</Link> */}
      <div className="each-product">
        <div className="picture-container">
          {gallery &&
            gallery.map((pic, index) => {
              return (
                <div key={index}>
                  <img
                    alt="pic"
                    className={"img"}
                    src={pic}
                    onClick={() => handleClick(pic)}
                  />
                </div>
              );
            })}
          <img alt="pic" src={selected} className="activeImg" />
        </div>
        <div className="description-container">
          <p className="name">{name}</p>
          <p className="brand">{brand}</p>
          {attributes &&
            attributes.map((attribute, index) => {
              return (
                <div className="attribute-container" key={index}>
                  <div className="attribute-name">
                    <p>{attribute.name}:</p>
                  </div>
                  <div className="attribute-items">
                    {attribute.items.map((item, index) => {
                      if (attribute.name === "Color") {
                        const bcg = HexToRgbA(item.value);
                        return (
                          <p
                            key={index}
                            onClick={() => {
                              dispatch(holdAttribute(item.value));
                            }}
                            style={{
                              backgroundColor: bcg,
                              width: 32,
                              height: 32,
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
                            dispatch(
                              chooseAttribute({
                                key: attribute.name,
                                value: item.value,
                              })
                            );
                          }}
                          className={
                            chooseAttributeItem.find(
                              (x) => x.key === attribute.name
                            )?.value === item.value
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
          <p className="attribute-name">price:</p>
          <p className="attribute-price">
            {prices.currency.symbol}
            {prices.amount}
          </p>
          <button onClick={() => addCart()} className="cartBtn">
            add to cart
          </button>
          {select && !inStock ? <p>Not in Stock</p> : null}
          <p className="description">{description.replace(/<[^>]+>/g, "")}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
