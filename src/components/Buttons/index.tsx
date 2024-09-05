import { useMainContract } from '../../hooks/useMainContract'
import { useTonConnect } from '../../hooks/useTonConnect'

import styles from './Buttons.module.css'

const Buttons = () => {
  const { sendIncrement, sendDeposit, sendWithdrawalRequest } = useMainContract()
  const { connected } = useTonConnect()

  if (!connected) return null
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={sendIncrement}>
        Increment by 1
      </button>
      <button className={styles.btn} onClick={sendDeposit}>
        Request deposit of 2 TON
      </button>
      <button className={styles.btn} onClick={sendWithdrawalRequest}>
        Request 1 TON withdrawal
      </button>
    </div>
  )
}

export { Buttons }
