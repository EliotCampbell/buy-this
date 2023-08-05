"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import classes from "./Shop.module.css";
import ShopSidebar from "./ShopSidebar/ShopSidebar";
import Products from "./Products/Products";
import BreadCrumbs from "../UI/BreadCrumbs/BreadCrumbs";
import { useRouter } from "next/navigation";

const Shop = observer(() => {
  const location = useRouter();

  const queryParams = {};
  const searchQuery = new URLSearchParams(location.search);
  for (let [key, value] of searchQuery.entries()) {
    queryParams[key] = value;
  }

  const initialState = { queryParams, select: { brand: null } };

  const [searchQueryState, setSearchQueryState] = useState(initialState);

  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        <BreadCrumbs
          initialState={initialState}
          setSearchQueryState={setSearchQueryState}
          searchQueryState={searchQueryState}
        />
        <ShopSidebar
          setSearchQueryState={setSearchQueryState}
          searchQueryState={searchQueryState}
        />
      </div>
      <Products
        setSearchQueryState={setSearchQueryState}
        searchQueryState={searchQueryState}
      />
    </div>
  );
});

export default Shop;
