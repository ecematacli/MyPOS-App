import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import { ButtonProps } from './custom-button'
import { Theme } from '@mui/material'

interface StyleProps extends ButtonProps {
  theme: Theme
}

export const StyledButton = styled(Button)(
  ({ theme, fullWidth }: StyleProps) => ({
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    height: fullWidth ? 60 : 40,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '@media (max-width:405px)': {
      paddingLeft: theme.spacing(0.8),
      paddingRight: theme.spacing(3),
    },
    textShadow: '0px -1px 1px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
    transition: 'all .9',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-disabled': {
      color: 'white !important',
    },
  })
)
