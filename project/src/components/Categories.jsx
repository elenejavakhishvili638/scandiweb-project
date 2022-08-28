import React, { useState, useEffect } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import icon from "../images/icon.png";
import cartIcon from "../images/cart-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { chooseCurrency } from "../store/currencySlice";
import { useNavigate } from "react-router-dom";
import { cartOverlay } from "../store/cartOverlaySlice";
import { chooseCategory } from "../store/navbarSlice";
import CartOverlay from "./CartOverlay";

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      name
      products {
        name
        gallery
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }
`;

const GET_ALL_CURRENCIES = gql`
  query GetAllCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
const GET_CATEGORIES_BY_TITLE = gql`
  query CategoryResolver($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        name
        inStock
        category
        gallery
        description
        brand
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          name
          items {
            value
          }
        }
      }
    }
  }
`;

function Categories() {
  const { data } = useQuery(GET_ALL_CATEGORIES);
  const { data: currencyData } = useQuery(GET_ALL_CURRENCIES);
  const [fetchCategory, { data: eachCategory }] = useLazyQuery(
    GET_CATEGORIES_BY_TITLE
  );

  const [value, setValue] = useState(0);

  const currencySelector = useSelector((state) => state.currency.value);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const showCartOverlay = useSelector((state) => state.cartOverlay.overlay);
  const category = useSelector((state) => state.navbar.value);

  let navigate = useNavigate();

  useEffect(() => {
    fetchCategory({
      variables: {
        input: {
          title: "all",
        },
      },
    }).then((res) => {
      navigate("/category", {
        state: {
          category: res.data.category.products,
          name: category,
        },
      });
    });
  }, []);

  const displayCartOverlay = () => {
    dispatch(cartOverlay());
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="categories">
          {data &&
            data.categories.map((category, index) => {
              return (
                <ul key={index}>
                  <li>
                    <button
                      onClick={() => {
                        setValue(index);
                        dispatch(chooseCategory(category.name));

                        fetchCategory({
                          variables: {
                            input: {
                              title: category.name,
                            },
                          },
                        }).then((res) => {
                          navigate("/category", {
                            state: {
                              category: res.data.category.products,
                              name: category.name,
                            },
                          });
                        });
                      }}
                      className={`btn ${index === value && "active-btn"}`}
                    >
                      {category.name}
                    </button>
                  </li>
                </ul>
              );
            })}
        </div>
        <img alt="pic" src={icon} className="bag-icon" />
        <div className="right-container">
          <div className="dropdown">
            <div
              onClick={() => setIsActive(!isActive)}
              className="dropdown-btn"
            >
              {currencySelector}
              <i className={isActive ? "arrow down" : "arrow up"} />
            </div>
            {isActive && (
              <div className="dropdown-content">
                {currencyData &&
                  currencyData.currencies.map((currency, index) => {
                    return (
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(chooseCurrency(currency.symbol));
                        }}
                        key={index}
                      >
                        {currency.symbol} {currency.label}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="item-container">
            <button className="cart" onMouseEnter={displayCartOverlay}>
              <img alt="cart-icon" src={cartIcon} className="cart" />
            </button>
            <div className="item-amount">
              <span>{quantity}</span>
            </div>
            {showCartOverlay && <CartOverlay />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Categories;
