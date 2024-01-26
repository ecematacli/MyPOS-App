import React, { FC, useState, useRef } from 'react'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import { ActionMeta, OptionsType } from 'react-select'
import { useTheme } from '@mui/material/styles'

import { selectStyles } from './style'
import { formatOptionLabel } from './format-option-label'
import { debounce } from 'lodash'

export interface AutoSuggestProduct {
  id: string
  sku: string
  barcode: string
  name: string
  variation?: string
  price?: number
}

interface Props {
  loadOptions: (query: string) => Promise<any[]>
  selectOption: (option: any) => void
  isQuickScanMode: boolean
}

const animatedComponents = makeAnimated()
export const InputAutoSuggest: FC<Props> = ({
  loadOptions,
  selectOption,
  isQuickScanMode,
}) => {
  const theme = useTheme()
  const [inputKey, setInputKey] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isBarcodeScannerRef = useRef(false)

  let lastKeyPressTime = 0
  const keysPressed: string[] = []

  const onChange = (v: any, { action }: ActionMeta<any>) => {
    switch (action) {
      case 'select-option':
        selectOption(v)
        if (isQuickScanMode) {
          setInputKey(inputKey + 1)
          // changing the key of the select input will force it to re-render and reset
        }
    }
  }

  const isOptionSelected = (
    option: any,
    options: OptionsType<any>
  ): boolean => {
    return options.find(o => o.id === option.id)
  }

  const debounced = debounce((searchTerm, callback) => {
    loadOptions(searchTerm)
      .then(result => {
        callback(result)
        if (isBarcodeScannerRef.current && result.length === 1) {
          selectOption(result[0])
          setIsMenuOpen(false)
          isBarcodeScannerRef.current = false
        }
      })
      .catch(error => {
        console.log(error)
        callback(null)
        isBarcodeScannerRef.current = false
      })
  }, 500)

  const handleKeypress = (e: KeyboardEvent) => {
    const timeBetweenKeypresses = e.timeStamp - lastKeyPressTime
    lastKeyPressTime = e.timeStamp
    keysPressed.push(e.key)

    if (e.key === 'Enter') {
      // keysPressed check is needed to cover the case where user
      // presses enter quick enough without typing anything
      if (timeBetweenKeypresses < 50 && keysPressed.length > 1) {
        console.log('This is barcode!!')
        isBarcodeScannerRef.current = true
      }
    }
  }

  React.useEffect(() => {
    window.addEventListener('keypress', handleKeypress)
    return () => {
      window.removeEventListener('keypress', handleKeypress)
    }
  }, [])

  return (
    <AsyncSelect
      className='input-auto-suggest'
      key={`select_key__${inputKey}_${isMenuOpen}`}
      // cacheOptions
      components={{
        ...animatedComponents,
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      isMenuOpen={isMenuOpen}
      loadOptions={debounced}
      onChange={onChange}
      formatOptionLabel={formatOptionLabel()}
      placeholder='Ürün ara...'
      openMenuOnClick={false}
      noOptionsMessage={() => 'Ürün Bulunamadı'}
      isClearable
      onInputChange={(_, { action }) => {
        if (action === 'input-change') {
          setIsMenuOpen(true)
        }
      }}
      isOptionSelected={isOptionSelected}
      styles={selectStyles(theme)}
      theme={t => ({
        ...t,
        colors: {
          ...t.colors,
          primary: theme.palette.grayColors[1],
        },
      })}
      autoFocus={isQuickScanMode}
      // onFocus={() => setIsMenuOpen(true)}
      onBlur={() => setIsMenuOpen(false)}
    />
  )
}
