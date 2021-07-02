import { useEffect } from 'react';

import { login } from 'redux/ducks/bepro';
import { BeproService } from 'services';

import { MetaMaskIconSmall } from 'assets/icons';

import { useAppDispatch, useAppSelector } from 'hooks';
import useAlertNotification from 'hooks/useAlertNotification';
import useCurrency from 'hooks/useCurrency';
import useNetwork, { defaultNetwork } from 'hooks/useNetwork';

import { AlertInline } from '../Alert';
import { Button } from '../Button';
import Link from '../Link';
import NetworkInfo from '../NetworkInfo';
import WalletInfo from '../WalletInfo';

function NavBarActions() {
  const { show } = useAlertNotification();
  const { icon } = useCurrency();
  const dispatch = useAppDispatch();
  const network = useNetwork() || defaultNetwork();

  const beproService = new BeproService();

  const walletConnected = useAppSelector(state => state.bepro.isLoggedIn);
  const walletAddress = useAppSelector(state => state.bepro.ethAddress);
  const walletBalance = useAppSelector(state => state.bepro.ethBalance);

  // Example
  useEffect(() => {
    show('beta-testing');
  }, [show, walletConnected]);

  const handleConnectWallet = async () => {
    await beproService.login();
    await login(dispatch);
  };

  return (
    <div className="pm-l-navbar__actions">
      <AlertInline
        id="beta-testing"
        variant="warning"
        description={
          <>
            {`Welcome to Polkamarkets! You’re on ${network.name} and placing predictions with ${network.currency}. Your `}
            <Link
              title="feedback"
              target="_blank"
              href="//discord.gg/dfnvfHspe4"
              rel="noreferrer"
            />
            {` is highly appreciated 🎉`}
          </>
        }
      />
      {network ? <NetworkInfo name={network.name} slug={network.key} /> : null}
      {walletConnected ? (
        <WalletInfo
          balance={walletBalance}
          currencyIcon={icon}
          address={walletAddress}
        />
      ) : (
        <Button
          variant="outline"
          color="default"
          size="sm"
          aria-label="Connect MetaMask"
          onClick={handleConnectWallet}
        >
          <MetaMaskIconSmall />
          Connect MetaMask
        </Button>
      )}
    </div>
  );
}

export default NavBarActions;
