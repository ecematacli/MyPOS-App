import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  lastActivitiesPaper: {
    height: 570,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative',
    marginLeft: 20
  },
  title: {
    padding: spacing(3, 2.5),
    color: palette.grayColors[3]
  },
  divider: {
    backgroundColor: palette.secondary.light
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: `1px solid ${palette.secondary.light}`
    }
  },
  tableBodyRow: {
    height: 120,
    '& > td': {
      borderBottom: `1px solid ${palette.secondary.light}`
    },
    '&:last-child': {
      '& > td': {
        borderBottom: 'none'
      }
    }
  }
}));
