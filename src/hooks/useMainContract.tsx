import { useEffect, useState } from 'react'
import { Address, OpenedContract } from 'ton-core'
import { toNano } from 'ton-core'

import { MainContract } from '../contracts/MainContract'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useTonConnect } from './useTonConnect'
import { useTonClient } from './useTonClient'

export function useMainContract() {
  const client = useTonClient()
  const { sender } = useTonConnect()

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

  const [contractData, setContractData] = useState<null | {
    counter_value: number
    recent_sender: Address
    owner_address: Address
  }>()

  const [balance, setBalance] = useState<null | number>(0)

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return

    const contract = new MainContract(
      Address.parse('EQBa0necmTh-gBu49z3UbyH8SdKM5X-oFJ_tq_pFee2luK0E'),
    )

    return client.open(contract) as OpenedContract<MainContract>
  }, [client])

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return

      setContractData(null)

      const val = await mainContract.getData()
      const { balance } = await mainContract.getBalance()

      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
      })
      setBalance(balance)
      await sleep(5000)
      getValue()
    }
    getValue()
  }, [mainContract])

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    sendIncrement: async () => {
      return mainContract?.sendIncrement(sender, toNano('0.05'), 1)
    },
    sendDeposit: async () => {
      return mainContract?.sendDeposit(sender, toNano('2'))
    },
    sendWithdrawalRequest: async () => {
      return mainContract?.sendWithdrawalRequest(sender, toNano('0.05'), toNano('1'))
    },
    ...contractData,
  }
}
