import React, { useState } from "react";

import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Components/store/CartProvider";

const App = () => {

  const [openCart, setOpenCart] = useState(false);

  const cartOpenHandler = () => {
    setOpenCart(!openCart);
  }

  return (
    <CartProvider>
      {openCart && <Cart onCartOpen={cartOpenHandler} />}
      <Header onCartOpen={cartOpenHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;