import { AutoSuggestProduct } from './input-auto-suggest'
import { FormatOptionLabelMeta } from 'react-select'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { productNameWithVariation, currencyFormatter } from '../../utils'

import React from 'react'
import { Box, Grid } from '@mui/material'

export const formatOptionLabel = () => (
  { name, variation, sku, price, barcode }: AutoSuggestProduct,
  { inputValue, context }: FormatOptionLabelMeta<AutoSuggestProduct, boolean>
): React.ReactNode => {
  if (context === 'value') {
    return productNameWithVariation(name, variation)
  }

  const renderParts = (field: string) => {
    const matches = match(field, inputValue)
    const parts = parse(field, matches)

    return parts.map(
      (part: { text: string; highlight: boolean }, index: number) => (
        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
          {part.text}
        </span>
      )
    )
  }

  return (
    <Grid container>
      <Grid item xs={11}>
        <Box display='flex' justifyContent='flex-start'>
          {renderParts(name)}
          {variation && <Box component='span'> / {variation}</Box>}
        </Box>
        <Box display='flex' flexDirection='column' alignItems='flex-start'>
          <Box>{renderParts(sku)}</Box>
          <Box>{renderParts(barcode)}</Box>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Box>{price ? currencyFormatter(price) : '-'}</Box>
      </Grid>
    </Grid>
  )
}
