import React, { ReactNode } from 'react'

import { Loading } from '../../../common/components/loading/loading'
import {
  ActionSectionWrapper,
  ActionsBar,
  InfoText,
  StyledContent,
  StyledTitle,
  TitleContainer,
} from './styles'
import { PageContainer } from 'common/components/page-container/page-container'

interface Props {
  loading: boolean
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export const Page: React.FC<Props> = ({
  loading,
  title,
  actions,
  description,
  children,
}) => {
  return (
    <PageContainer>
      <TitleContainer display='flex'>
        <StyledTitle>{title}</StyledTitle>
      </TitleContainer>
      <ActionsBar>
        <ActionSectionWrapper>
          {description && <InfoText>{description}</InfoText>}
          {actions}
        </ActionSectionWrapper>
      </ActionsBar>
      {loading && <Loading />}
      <StyledContent>{children}</StyledContent>
    </PageContainer>
  )
}
