import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../features/cryptoSlice.js";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
export default store;
