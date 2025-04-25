import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: true,
          price_change_percentage: "1h,24h,7d",
        }
      }
    );
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    coins: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.status = "success";
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cryptoSlice.reducer;
