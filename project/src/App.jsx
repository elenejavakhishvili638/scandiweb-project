import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Categories from "./components/Categories";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Category from "./components/Category";
import CartItems from "./components/CartItems";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Categories />
      <Routes>
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cartItems" element={<CartItems />}></Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
