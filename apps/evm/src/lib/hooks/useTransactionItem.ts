import { useState } from "react"

export const useTransactionItem = () => {
  const [transaction, setTransaction] = useState({})
  return {
    transaction,
    setTransaction
  }
}