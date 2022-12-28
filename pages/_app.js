import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from '@wagmi/chains';
import '../styles/globals.css';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

const chains = [polygonMumbai];

const { provider, webSocketProvider } = configureChains(chains, [
  publicProvider(),
]);

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
  connectors: [
    new WalletConnectConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains }),
  ],
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
