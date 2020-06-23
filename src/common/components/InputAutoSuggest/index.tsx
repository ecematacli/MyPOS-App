import React, { FC, useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import { ActionMeta, OptionsType } from 'react-select'
import { useTheme } from '@material-ui/core'
import { debounce } from 'lodash'

import styles, { selectStyles } from './style'
import { formatOptionLabel } from './formatOptionLabel'

export interface AutoSuggestProduct {
  id: string
  value: string // id
  label: string // name + variation
  sku: string
  barcode: string
  name: string
  variation?: string
  price?: number
}

interface Props {
  loadOptions: (query: string, callback: (options: OptionsType<any>) => void) => Promise<void>
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
  const classes = styles()
  const [inputKey, setInputKey] = useState(1)

  const onChange = (v: any, { action }: ActionMeta<any>) => {
    switch (action) {
      case 'select-option':
        selectOption(v)
        if (isQuickScanMode) {
          setInputKey(inputKey + 1)
        }
    }
  }

  const isOptionSelected = (option: any, options: OptionsType<any>): boolean => {
    return options.find(o => o.id === option.id)
  }

  return (
    <AsyncSelect
      key={`select_key__${inputKey}`}
      // cacheOptions
      components={{
        ...animatedComponents,
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      loadOptions={debounce(loadOptions, 400)}
      onChange={onChange}
      formatOptionLabel={formatOptionLabel(classes)}
      placeholder='Search for products...'
      openMenuOnClick={false}
      noOptionsMessage={() => 'Not Found'}
      isClearable
      isOptionSelected={isOptionSelected}
      styles={selectStyles(theme)}
      theme={t => ({
        ...t,
        colors: {
          ...t.colors,
          primary: theme.palette.grayColors[1],
        },
      })}
    />
  )
}
