import React from 'react'
import { Box, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

interface IPageContainerProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
  height?: string
}

export const StyledContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  flex: '1 0 auto',
  padding: theme.spacing(4),
  overflow: 'auto',

  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(4),
  },
}))

export const PageContainer = ({
  children,
  sx,
  height,
}: IPageContainerProps) => (
  <StyledContentContainer id='page-container' sx={sx} height={height}>
    {children}
  </StyledContentContainer>
)
