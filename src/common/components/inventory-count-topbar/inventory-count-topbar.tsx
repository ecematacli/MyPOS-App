import React, { ReactNode } from 'react'

import {
  ActionSectionWrapper,
  InventoryCountActionsContainer,
  TitleContainer,
  TitleWrapper,
} from './styles'

export interface Props {
  title: ReactNode
  inventoryCountActionsPaper: ReactNode
  type?: string
}

export const InventoryCountTopBar: React.FC<Props> = props => {
  const { title, inventoryCountActionsPaper } = props

  return (
    <React.Fragment>
      <TitleContainer type={props.type}>
        <TitleWrapper>{title}</TitleWrapper>
      </TitleContainer>
      <InventoryCountActionsContainer>
        <ActionSectionWrapper>
          {inventoryCountActionsPaper}
        </ActionSectionWrapper>
      </InventoryCountActionsContainer>
    </React.Fragment>
  )
}
