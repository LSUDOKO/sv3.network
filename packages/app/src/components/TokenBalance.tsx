'use client'
import { useBalance, useReadContract } from 'wagmi'
import { useEffect } from 'react'
import { formatBalance } from '@/utils/format'
import { erc20Abi } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface TokenBalanceProps {
  readonly address: `0x${string}`
  readonly tokenAddress?: `0x${string}`
  readonly className?: string
  readonly toFixed?: number
  readonly onBalanceChange?: ({ balance, formattedBalance }: { balance: bigint; formattedBalance?: string }) => void
}

export const TokenBalance = ({ address, tokenAddress, toFixed, onBalanceChange, className }: TokenBalanceProps) => {
  const ETHBalance = useBalance({ address })

  const tokenBalance = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    // pass the value of the balance to the parent component on change
    if (tokenBalance.data && onBalanceChange) {
      onBalanceChange({
        balance: tokenBalance.data,
        formattedBalance: formatBalance(tokenBalance.data ?? BigInt(0), toFixed),
      })
      return
    } else if (ETHBalance.data && onBalanceChange) {
      onBalanceChange({
        balance: ETHBalance.data.value,
        formattedBalance: formatBalance(ETHBalance.data.value ?? BigInt(0), toFixed),
      })
      return
    }
  }, [ETHBalance.data, tokenBalance.data, onBalanceChange, toFixed])

  if (!ETHBalance.data && !tokenBalance.data) return null

  const balanceToShow = tokenAddress ? tokenBalance.data : ETHBalance.data?.value
  const formattedBalance = formatBalance(balanceToShow ?? BigInt(0), toFixed)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='text-base'>Token Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-lg font-semibold'>{formattedBalance}</div>
      </CardContent>
    </Card>
  )
}
