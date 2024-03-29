import { useCart } from "../../context/cart-context";
import { ProductCardHorizontal, Navbar, FinalPrice } from "../../components/";
import { Fragment } from "react";

export const Cart = () => {
  const { cart, saveLater } = useCart();

  return (
    <Fragment>
      <Navbar />
      {cart && cart.length > 0 ? (
        <h2 className="cart-title">Your Cart ({cart.length}) items</h2>
      ) : (
        <h2 className="cart-title">Your Cart is Empty</h2>
      )}
      <main className="main-cart d-flex gap">
        <div className="d-flex direction-column gap">
          {cart && cart.length > 0
            ? cart.map((product) => (
                <ProductCardHorizontal product={product} key={product._id} />
              ))
            : ""}
        </div>
        <div className="fp">{cart && cart.length > 0 && <FinalPrice />}</div>
      </main>
      <div className="main d-flex direction-column gap">
        {saveLater && saveLater.length > 0 && (
          <h2>Saved for Later ({saveLater.length} items)</h2>
        )}
        {saveLater &&
          saveLater.length > 0 &&
          saveLater.map((product) => (
            <ProductCardHorizontal product={product} key={product._id} />
          ))}
      </div>
    </Fragment>
  );
};
