import Button from '@material-ui/core/Button';

import { withTheme, styled, Theme } from '@material-ui/core/styles';
import { ButtonProps } from './index';

interface StyleProps extends ButtonProps {
  theme: Theme;
}

export const StyledButton = styled(withTheme(Button))(
  ({ theme: { palette, spacing }, fullWidth }: StyleProps) => ({
    color: '#fff',
    backgroundColor: palette.primary.main,
    height: fullWidth ? 60 : 40,
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    '@media (max-width:405px)': {
      paddingLeft: spacing(0.8),
      paddingRight: spacing(3),
    },
    textShadow: '0px -1px 1px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
    transition: 'all .9',
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
    ' &.disabled': {
      color: 'white !important',
    },
  })
);
