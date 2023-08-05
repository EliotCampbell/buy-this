import React from "react";
import { observer } from "mobx-react-lite";
import classes from "./ShopSidebar.module.css";
import ReactSelect from "../../UI/ReactSelect/ReactSelect";
import ProductsStore from "@/store/productsStore";

const ShopSidebar = observer(({ searchQueryState, setSearchQueryState }) => {
  return (
    <div className={classes.shopNav}>
      {
        <>
          <p
            className={classes.categories}
            onClick={() =>
              setSearchQueryState({
                ...searchQueryState,
                queryParams: {
                  ...searchQueryState.queryParams,
                  categoryId: "",
                },
              })
            }
          >
            CATEGORIES
          </p>
          {ProductsStore.categories.map((el) => (
            <div
              className={classes.shopNavLink}
              key={el.id}
              onClick={() =>
                setSearchQueryState({
                  ...searchQueryState,
                  queryParams: {
                    ...searchQueryState.queryParams,
                    categoryId: el.id,
                  },
                })
              }
            >
              {el.name}
            </div>
          ))}
        </>
      }
      {
        <>
          <p className={classes.categories}>FILTER</p>
          <ReactSelect
            isMulti={true}
            label={"Select brands"}
            options={ProductsStore.brands.map((el) => ({
              value: el.id,
              label: el.name,
            }))}
            value={searchQueryState.select.brand}
            closeMenuOnSelect={false}
            onChange={(option) => {
              setSearchQueryState({
                ...searchQueryState,
                queryParams: {
                  ...searchQueryState.queryParams,
                  brandId: option.map((el) => el.value),
                },
                select: { ...searchQueryState.select, brand: option },
              });
            }}
          />
        </>
      }
    </div>
  );
});

export default ShopSidebar;
