import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { leftPicture, rightPicture } from "../store/cartGallerySlice";

function CartGallery({ gallery }) {
  const [index, setIndex] = React.useState(0);

  const showCartOverlay = useSelector((state) => state.cartOverlay.overlay);

  function checkIndex(number) {
    if (number > gallery.length - 1) {
      return 0;
    } else if (number < 0) {
      return gallery.length - 1;
    }
    return number;
  }

  const leftButton = () => {
    setIndex((prevValue) => {
      let newIndex = prevValue + 1;
      return checkIndex(newIndex);
    });
  };

  const rightButton = () => {
    setIndex((prevValue) => {
      let newIndex = prevValue - 1;
      return checkIndex(newIndex);
    });
  };

  return (
    <div className="cart-gallery">
      <img
        className={!showCartOverlay ? "cart-pictures" : "cart-pictures-overlay"}
        alt="pic"
        src={gallery[index]}
      />
      {!showCartOverlay && (
        <div className="cart-gallery-btn-container">
          <button className="cart-gallery-btn" onClick={leftButton}>
            <span className="arrows left" />
          </button>
          <button className="cart-gallery-btn" onClick={rightButton}>
            <span className="arrows right" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CartGallery;
