import Styled from 'styled-components'

interface Props {
  vertical?: boolean
  width?: number
  height?: number
  align?: string
  justify?: string
  padding?: number[]
  margin?: number[]
  fullWidth?: boolean
}

const merge = (a: number[]) => a.join('em ') + 'em'

export const Align = Styled.div<Props>`
  display: flex;
  ${({ vertical }) =>
    vertical &&
    `
    flex-direction: column;
  `}
  ${({ width }) => width && `width: ${width}em`};
  ${({ fullWidth }) => fullWidth && `width: 100%`};
  ${({ height }) => height && `height: ${height}%`};
  ${({ padding }) => padding && `padding: ${merge(padding)}`};
  ${({ margin }) => margin && `margin: ${merge(margin)}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
`
