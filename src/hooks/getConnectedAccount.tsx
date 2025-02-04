import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useConnectedAccount = (): {
  connectedAddress: string;
  loadError: string;
} => {
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    const fetchAddress = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const provider = new ethers.BrowserProvider(window.ethereum);

          const signer = provider.getSigner();

          const userAddress = (await signer).getAddress();
          setConnectedAddress((await userAddress).toString());
          setLoadError("");
        } catch (err: any) {
          setLoadError(
            err.message || "An error occurred while connecting to MetaMask."
          );
          setConnectedAddress("");
        }
      } else {
        setLoadError("MetaMask is not installed.");
        setConnectedAddress("");
      }
    };

    fetchAddress();
  }, []);

  return { connectedAddress, loadError };
};

export default useConnectedAccount;
