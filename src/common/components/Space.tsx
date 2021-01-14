import Styled from 'styled-components'

export const Space = Styled.div<{ half?: boolean }>`
  margin: ${({ half }) => (half ? 8 : 16)}px;
`
