import React, { Fragment } from 'react'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { formatDistance } from 'date-fns'

import {
  AccordionDetailText,
  CountNumber,
  ImageContainer,
  LastCountedContainer,
  StyledDivider,
  Title,
} from './styles'
import inventoryImage from '../../../../../../assets/img/stocktake-emptylist-v1.png'
import { LastCountedProduct } from '../../types'
import { productNameWithVariation } from '../../../../../../common/utils'

export interface ILastCountedItemsProps {
  lastCountedItems: LastCountedProduct[]
}

export const LastCountedItems: React.FC<ILastCountedItemsProps> = ({
  lastCountedItems,
}) => {
  return (
    <LastCountedContainer>
      <Fragment>
        <Box sx={theme => ({ padding: theme.spacing(3.2, 2) })}>
          <Title>Last Counted Items</Title>
        </Box>
        <StyledDivider />
      </Fragment>
      {lastCountedItems.length > 0 ? (
        lastCountedItems
          .slice(0, 30)
          .map(({ id, name, counted, variation, sku, barcode, countedAt }) => (
            <Accordion key={id + countedAt}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box display='flex' alignItems='center'>
                  <CountNumber component='span'>{counted}</CountNumber>
                  <Typography variant='caption'>
                    {productNameWithVariation(name, variation)}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='caption'>
                    <AccordionDetailText component='span'>
                      Sku:
                    </AccordionDetailText>
                    {sku}
                  </Typography>
                  <Typography variant='caption'>
                    <AccordionDetailText component='span'>
                      Barcode:
                    </AccordionDetailText>
                    {barcode}
                  </Typography>
                  <Typography variant='caption'>
                    <AccordionDetailText component='span'>
                      Counted At:
                    </AccordionDetailText>
                    {formatDistance(new Date(countedAt), new Date(), {
                      includeSeconds: true,
                    })}{' '}
                    ago
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
      ) : (
        <ImageContainer>
          <Box component='img' src={inventoryImage} />
        </ImageContainer>
      )}
    </LastCountedContainer>
  )
}
