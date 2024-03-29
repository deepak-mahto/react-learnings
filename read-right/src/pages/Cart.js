import { Fragment } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductCardHorizontal from "../components/ProductCard/ProductCardHorizontal";
import { useCart } from "../context/cart-context";

export const Cart = () => {
  const { cart } = useCart();
  console.log(cart);

  return (
    <Fragment>
      <Navbar />
      <main className="main">
        {cart && cart.length > 0 ? (
          <h2>Your Cart: ({cart.length}) items</h2>
        ) : (
          <h2>Your Cart is Empty</h2>
        )}
        <div className="main-cart d-flex direction-column gap">
          {cart && cart.length > 0
            ? cart.map((product) => (
                <ProductCardHorizontal key={product.id} product={product} />
              ))
            : ""}
        </div>
      </main>
    </Fragment>
  );
};
