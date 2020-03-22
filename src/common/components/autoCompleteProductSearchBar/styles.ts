import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps extends Theme {
  isUsedOnSalesPage?: boolean;
}

export default makeStyles(({ palette, spacing, breakpoints }) => ({
  autoSuggest: {
    width: ({ isUsedOnSalesPage }: StyleProps) =>
      isUsedOnSalesPage ? '100%' : '70%'
  },
  suggestionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(8),
    width: '100%',
    color: palette.grayColors[3],
    [breakpoints.down('sm')]: {
      ' & > * ': {
        fontSize: 13
      }
    }
  },
  suggestedCommon: {
    color: palette.grayColors[3]
  },
  suggestedItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestionGroup: {
    display: 'flex'
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      paddingRight: spacing(2)
    }
  },
  searchIconHolder: {
    marginRight: -spacing(5.5)
  },
  quickAddIcon: {
    fontSize: spacing(4.5),
    color: palette.primary.main,
    cursor: 'pointer',
    marginRight: -spacing(1)
  }
}));
