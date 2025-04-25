import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptoData } from "../features/cryptoSlice";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const { coins, status } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  if (status === "loading") return <div className="text-center mt-10">Loading...</div>;
  if (status === "failed") return <div className="text-center mt-10">Failed to load data</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Crypto Price Tracker</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">1h %</th>
              <th className="p-2">24h %</th>
              <th className="p-2">7d %</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">Volume(24h)</th>
              <th className="p-2">Circulating Supply</th>
              <th className="p-2">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="border-t hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2 flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" /> {/* 👈 control logo size */}
                  <div className="text-left">
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
                  </div>
                </td>
                <td className="p-2">${coin.current_price.toLocaleString()}</td>
                <td className={`p-2 ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td className={`p-2 ${coin.price_change_percentage_24h_in_currency > 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                </td>
                <td className={`p-2 ${coin.price_change_percentage_7d_in_currency > 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td className="p-2">${coin.market_cap.toLocaleString()}</td>
                <td className="p-2">${coin.total_volume.toLocaleString()}</td>
                <td className="p-2">{coin.circulating_supply.toLocaleString()}</td>
                <td className="p-2">
                  <Sparklines data={coin.sparkline_in_7d.price} width={100} height={30}>
                    <SparklinesLine color="green" />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTracker;
