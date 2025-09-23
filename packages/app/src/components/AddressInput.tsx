'use client'
import { useState } from 'react'
import { isAddress } from 'viem'
import Image from 'next/image'
import useEnsProfile from '@/app/hooks/useEnsProfile'
import { truncateAddress } from '../utils/helpers/formatTools'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface AddressInputProps extends React.HTMLProps<HTMLInputElement> {
  onRecipientChange: (address: string, isValid: boolean) => void
  onRawInputChange?: (address: string) => void
  disabled?: boolean
}

export const AddressInput = ({ onRecipientChange, onRawInputChange, disabled = false }: AddressInputProps) => {
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)
  const [rawTokenAddress, setRawTokenAddress] = useState<string>('')
  const { ensAddress: ensAddy, ensAvatar } = useEnsProfile({ ensName: rawTokenAddress })

  // Handle input change for recipient address
  const handleToAdressInput = (_to: string) => {
    const isValid = isAddress(_to)
    setIsValidToAddress(isValid)

    // Update raw token address and notify parent component
    onRecipientChange(_to, isValid)
    setRawTokenAddress(_to)

    // Invoke optional callback for raw input change
    if (onRawInputChange) {
      onRawInputChange(_to)
    }
  }

  return (
    <div className='relative flex flex-col gap-2'>
      <Input
        type='text'
        placeholder='0x... or ENS name'
        disabled={disabled}
        value={rawTokenAddress}
        onChange={(e) => handleToAdressInput(e.target.value)}
        className={`${!isValidToAddress && rawTokenAddress && !ensAddy ? 'border-destructive' : isValidToAddress ? 'border-success' : ''}`}
      />

      {ensAddy && (
        <Button
          variant='outline'
          onClick={() => {
            setRawTokenAddress(ensAddy ?? '')
            onRecipientChange(ensAddy ?? '', true)
            setIsValidToAddress(true)
          }}
          className='flex items-center justify-between w-full text-left h-auto px-4 py-2 mt-2'>
          <div className='flex items-center gap-2'>
            {ensAvatar ? (
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <Image width={32} height={32} src={ensAvatar ?? ''} alt='ENS Avatar' className='object-cover' />
              </div>
            ) : (
              <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
                <span className='text-lg font-bold'>{rawTokenAddress[0]}</span>
              </div>
            )}
            <span>{truncateAddress(ensAddy ?? '')}</span>
          </div>
          <span className='text-xs text-muted-foreground'>Select</span>
        </Button>
      )}
    </div>
  )
}
