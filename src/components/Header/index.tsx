import { TonConnectButton } from '@tonconnect/ui-react'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <p className={styles.text}>TON Dapp</p>
      <TonConnectButton />
    </header>
  )
}

export { Header }
