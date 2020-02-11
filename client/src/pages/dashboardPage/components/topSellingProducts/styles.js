import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default makeStyles(({ spacing, palette }) => ({
  topSellingPaper: {
    height: 570,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    marginRight: 10
  },
  divider: {
    backgroundColor: palette.secondary.light
  },
  title: {
    padding: spacing(3, 2.5),
    color: palette.grayColors[3]
  },
  topSellingContent: {
    height: 480,
    display: 'flex',
    flexDirection: 'column'
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
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginRight: spacing(1),
    marginBottom: spacing(1.5)
  },
  paginationItemsDiv: {
    ...centered
  },
  pageCount: {
    ...centered
  },
  arrowDiv: {
    ...centered,
    marginRight: spacing(0.8),
    marginLeft: spacing(0.8),
    cursor: 'pointer'
  },
  arrowIcon: {
    fontSize: spacing(3.5),
    color: palette.secondary.main
  }
}));
