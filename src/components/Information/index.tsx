import { fromNano } from 'ton-core'

import { useMainContract } from '../../hooks/useMainContract'

import styles from './Informatinn.module.css'

const Information = () => {
  const { contract_address, counter_value, contract_balance } = useMainContract()

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p>Contract Address:</p>
        <p className={styles.contract}>{contract_address}</p>
      </div>

      <div className={styles.card}>
        <p>Contract Balance:</p>
        <p>{contract_balance ? fromNano(contract_balance) : 0} TON</p>
      </div>

      <div className={styles.card}>
        <p>Counter Value:</p>
        <p>{counter_value ?? 'Loading...'}</p>
      </div>
    </div>
  )
}

export { Information }
