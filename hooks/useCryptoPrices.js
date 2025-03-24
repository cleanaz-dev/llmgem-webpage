// hooks/useCryptoPrices.js
import { useState, useEffect } from "react";

export default function useCryptoPrices() {
  const [prices, setPrices] = useState({ BTC: null, ETH: null, USDT: null });
  const [gasFees, setGasFees] = useState({
    BTC: null,
    ETH: null,
    USDT: null,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      // Fetch crypto prices from CoinGecko
      const priceResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
      );
      const priceData = await priceResponse.json();

      // Simulate gas fees
      const simulatedGasFees = {
        BTC: Math.floor(Math.random() * (50 - 10 + 1)) + 10, // 10-50 satoshis/byte
        ETH: Math.floor(Math.random() * (100 - 20 + 1)) + 20, // 20-100 Gwei
        USDT: Math.floor(Math.random() * (100 - 20 + 1)) + 20, // Same as ETH for USDT on Ethereum
      };

      setPrices({
        BTC: priceData.bitcoin.usd,
        ETH: priceData.ethereum.usd,
        USDT: priceData.tether.usd,
      });

      setGasFees(simulatedGasFees);
    };

    fetchPrices();
  }, []);

  return { prices, gasFees };
}