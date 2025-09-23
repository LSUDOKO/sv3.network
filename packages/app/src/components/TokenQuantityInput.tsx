'use client'
import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface TokenQuantityInputProps {
  onChange: (amount: string) => void
  quantity: string
  maxValue?: string
  displayRangeInput?: boolean
  displayMaxClearButtons?: boolean
}
export function TokenQuantityInput({
  onChange,
  quantity,
  maxValue,
  displayMaxClearButtons = true,
}: TokenQuantityInputProps) {
  const [amount, setAmount] = useState('0.00')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only allow numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(e.target.value)) {
      return
    }
    setAmount(e.target.value)
    onChange(e.target.value)
  }

  const handleSetMax = () => {
    setAmount(maxValue ?? '0.00')
    onChange(maxValue ?? '0.00')
  }

  const handleClear = () => {
    setAmount('0.00')
    onChange('0.00')
  }

  useEffect(() => {
    setAmount(quantity)
  }, [quantity])

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 p-4'>
        <Input type='text' placeholder='0.01' value={amount} onChange={(e) => handleChange(e)} />

        <div className={`${displayMaxClearButtons ? 'flex' : 'hidden'}  flex-row gap-2 w-full`}>
          <Button onClick={handleSetMax} variant='outline' size='sm'>
            Max
          </Button>
          <Button onClick={handleClear} variant='outline' size='sm'>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
