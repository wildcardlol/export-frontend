import './App.css'
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import getConfig from './config';

const REACT_APP_PIRVY_APP_ID = "clvdnjki00bvbzqjkecroowp3";

function App() {
  return (
    <PrivyProvider appId={REACT_APP_PIRVY_APP_ID} config={getConfig({ emailSupported: true })}>
      <img src="/logo.png" className="logo wild" alt="Wildcard recovery" />          
      <h1>Wildcard Wallet Recovery</h1>
      <PrivyHeader />
      <PrivyExport />
    </PrivyProvider>
  )
}

const PrivyHeader = () => {
  const { ready, authenticated, user } = usePrivy();

  if (!ready) {
    return <h2>Privy Loading...</h2>;
  }

  if (!authenticated) {
    return <h2>
      Please sign in to continue
    </h2>
  }

  const hasEmbeddedWallet = !!user?.linkedAccounts?.find(
    (account) => account.type === 'wallet' && account.walletClientType === 'privy',
  );
  if (!hasEmbeddedWallet) {
    return <h2>
      {"You don't have an embedded wallet connected to your account, no key available to export"}
    </h2>
  }
  const userIdentifier = user?.farcaster?.displayName ?? user?.email?.address;
  return <h2>
    Welcome {userIdentifier}
  </h2>
};

const PrivyExport = () => {
  const { ready, authenticated, user, exportWallet, login, logout } = usePrivy();
  const isAuthenticated = ready && authenticated;

  const hasEmbeddedWallet = !!user?.linkedAccounts?.find(
    (account) => account.type === 'wallet' && account.walletClientType === 'privy',
  );

  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
    {authenticated ?
      <button onClick={logout} disabled={!ready} className='loginlogout'>
        Logout
      </button>
      :
      (
        <button onClick={login} disabled={!ready} className='loginlogout'>
          Login
        </button>
      )}
    <button onClick={exportWallet} disabled={!isAuthenticated || !hasEmbeddedWallet} className='exportwallet'>
      Export my wallet
    </button>
  </div>
}

export default App
