import { AutoSuggestProduct } from './input-auto-suggest'
import { FormatOptionLabelMeta } from 'react-select'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { productNameWithVariation, currencyFormatter } from '../../utils'

import React from 'react'
import { Align } from '../Align'
import { Grid } from '@material-ui/core'

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
        <Align justify='flex-start'>
          {renderParts(name)}
          {variation && <span> / {variation}</span>}
        </Align>
        <Align vertical align='flex-start'>
          <div>{renderParts(sku)}</div>
          <div>{renderParts(barcode)}</div>
        </Align>
      </Grid>
      <Grid item xs={1}>
        <div>{price ? currencyFormatter(price) : '-'}</div>
      </Grid>
    </Grid>
  )
}
