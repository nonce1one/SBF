import Link from 'next/link';
import styles from '../styles/Header.module.css';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import useRouter from 'next/router';
import { useState, useEffect } from 'react';
import router from 'next/router';

export default function Header({}) {
  const { connectors, connect } = useConnect();
  const { isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [showStatus, setShowStatus] = useState('disconnected');

  useEffect(() => {
    setShowDisconnect(true);
    setShowStatus(status);
  }, [isConnected, status]);

  const handleStartPainting = () => {
    router.push('/canvas');
  };

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        Painting App
      </Link>
      <div>
        {!isConnected ? (
          connectors.map((connector) => (
            <button
              className={styles.btn}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          ))
        ) : (
          <div>
            <button
              className={styles.btn}
              onClick={() => handleStartPainting()}
            >
              Starting Painting
            </button>
            <button className={styles.btn} onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
