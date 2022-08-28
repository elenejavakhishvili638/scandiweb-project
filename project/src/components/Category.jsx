import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import cartIcon from "../images/product-cart.png";

function Category() {
  const currencySelector = useSelector((state) => state.currency.value);
  const location = useLocation();
  const dispatch = useDispatch();

  const { category, name } = location.state;

  return (
    <div className="main-product-container">
      <h2 className="category-name">{name}</h2>
      <div className="product-container">
        {category.map((cat, index) => {
          const currentPrice =
            cat &&
            cat.prices.find(
              (price) => price.currency.symbol === currencySelector
            );
          return (
            <div className="product" key={index}>
              <div>
                <li>
                  <Link
                    to="/product"
                    state={{
                      id: cat.id,
                      name: cat.name,
                      gallery: cat.gallery,
                      description: cat.description,
                      brand: cat.brand,
                      attributes: cat.attributes,
                      prices: currentPrice,
                      inStock: cat.inStock,
                    }}
                  >
                    <div className="wrap">
                      <img src={cat.gallery[0]} alt="pic" />
                      {cat.inStock ? null : (
                        <div className="outOfStock">
                          <p>out of stock</p>
                        </div>
                      )}
                    </div>
                  </Link>
                  <p
                    className={cat.inStock ? "product-text" : "outOfStockText"}
                  >
                    {cat.name}
                  </p>
                  <p className={cat.inStock ? "price-text" : "outOfStockPrice"}>
                    {currentPrice.currency.symbol}
                    {currentPrice.amount}
                  </p>
                  <div className="category-cart">
                    <button>
                      <img
                        alt="cart-icon"
                        src={cartIcon}
                        className="cart"
                        onClick={() => {
                          console.log(cat.inStock);
                          let name = cat.name;
                          let id = cat.id;
                          let price = currentPrice.amount;
                          let brand = cat.brand;
                          let pictures = cat.gallery;
                          let priceSymbol = currentPrice.currency.symbol;
                          let itemAttributes = cat.attributes;
                          if (cat.attributes.length !== 0) {
                            console.log("Choose attributes");
                          } else if (!cat.inStock) {
                            console.log("Not in stock");
                          } else {
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
                        }}
                      />
                    </button>
                  </div>
                </li>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
