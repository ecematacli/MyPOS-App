import Button from '@material-ui/core/Button';

import { withTheme, styled } from '@material-ui/core/styles';

export const StyledButton = styled(withTheme(Button))(
  ({ theme: { palette, spacing }, fullWidth }) => {
    return {
      background: palette.background.paper,
      color: palette.whiteColors[0],
      backgroundColor: palette.primary.main,
      height: fullWidth ? 60 : 40,
      paddingLeft: spacing(4),
      paddingRight: spacing(4),
      marginBottom: spacing(1),
      textShadow: '0px -1px 1px rgba(0, 0, 0, 0.5)',
      transition: 'all .9',
      '&:hover': {
        backgroundColor: palette.primary.light
      }
    };
  }
);
