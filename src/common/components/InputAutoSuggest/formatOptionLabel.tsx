import { AutoSuggestProduct } from '.'
import { FormatOptionLabelMeta } from 'react-select'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { productNameWithVariation, currencyFormatter } from '../../utils'

import React from 'react'
import { Align } from '../Align'

export const formatOptionLabel = (classes: any) => (
  { name, variation, sku, price, barcode }: AutoSuggestProduct,
  { inputValue, context }: FormatOptionLabelMeta<any>
): React.ReactNode => {
  if (context === 'value') {
    return productNameWithVariation(name, variation)
  }

  const renderParts = (field: string) => {
    const matches = match(field, inputValue)
    const parts = parse(field, matches)

    return parts.map((part: { text: string; highlight: boolean }, index: number) => (
      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
        {part.text}
      </span>
    ))
  }

  return (
    <div className={classes.suggestionContainer}>
      <div>
        <div className={classes.suggestionGroup}>
          {renderParts(name)}
          {variation && <span> / {variation}</span>}
        </div>
        <Align vertical>
          <span>{renderParts(sku)}</span>
          <span>{renderParts(barcode)}</span>
        </Align>
      </div>
      <div>
        <span>{price ? currencyFormatter(price) : '-'}</span>
      </div>
    </div>
  )
}
