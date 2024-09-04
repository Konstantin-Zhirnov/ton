/* eslint-disable @typescript-eslint/no-unused-vars */
import { TonConnectButton } from '@tonconnect/ui-react'
import { fromNano } from 'ton-core'

import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect'

import './App.css'

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract()

  const { connected } = useTonConnect()
  return (
    <div className="App">
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + '...'}</div>

          {contract_balance && (
            <>
              <b>Our contract Balance</b>
              <div className="Hint">{fromNano(contract_balance)}</div>
            </>
          )}

          {/* <b>Recent Sender</b>
          <div className="Hint">{recent_sender}</div>
          <b>Owner address</b>
          <div className="Hint">{owner_address}</div> */}
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? 'Loading...'}</div>
        </div>

        {connected && <button onClick={sendIncrement}>Increment by 5</button>}
        {connected && <button onClick={sendDeposit}>Request deposit of 0.06 TON</button>}
        {connected && <button onClick={sendWithdrawalRequest}>Request 0.07 TON withdrawal</button>}
      </div>
    </div>
  )
}

export default App
