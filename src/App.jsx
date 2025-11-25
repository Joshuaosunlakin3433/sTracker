import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar, Footer, LandingPage, Dashboard } from "./components";
import {
  getSTXBalance,
  getSTXPrice,
  getTokenBalances,
} from "./services/stacksApi";

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [addressInput, setAddressInput] = useState("");

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (addressInput.startsWith("SP") || addressInput.startsWith("SM")) {
      setConnectedAddress(addressInput);
    }
  };

  const handleDemoClick = () => {
    setConnectedAddress("SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9");
  };

  // Fetch portfolio data when wallet is connected
  const { data: stxBalance } = useQuery({
    queryKey: ["stx-balance", connectedAddress],
    queryFn: () => getSTXBalance(connectedAddress),
    enabled: !!connectedAddress,
  });

  const { data: stxPrice } = useQuery({
    queryKey: ["stx-price"],
    queryFn: getSTXPrice,
    enabled: !!connectedAddress,
  });

  const { data: tokens } = useQuery({
    queryKey: ["tokens", connectedAddress],
    queryFn: () => getTokenBalances(connectedAddress),
    enabled: !!connectedAddress,
  });

  // Prepare portfolio data for health score
  const portfolioData = connectedAddress
    ? {
        stxBalance,
        tokens,
        stxPrice,
        totalValue: (stxBalance?.total || 0) * (stxPrice || 0),
      }
    : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-500 to-pink-500 flex flex-col">
      <Navbar onWalletConnected={setConnectedAddress} />

      <main className="flex-1 w-full">
        {!connectedAddress ? (
          <LandingPage
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            onManualSubmit={handleManualSubmit}
            onDemoClick={handleDemoClick}
          />
        ) : (
          <Dashboard
            connectedAddress={connectedAddress}
            portfolioData={portfolioData}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
