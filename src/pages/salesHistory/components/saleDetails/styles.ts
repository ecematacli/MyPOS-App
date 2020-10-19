import { makeStyles } from '@material-ui/core/styles';

interface StyleProps {
  rowIndex: number;
}

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  salesDetailsContainer: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflow: 'auto',
    marginTop: '-14.8px',
    paddingTop: spacing(3),
    paddingBottom: spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: ({ rowIndex }: StyleProps) =>
      rowIndex % 2 ? `${palette.whiteColors[0]}` : `${palette.greenColors[2]}`,
  },
  table: {
    marginBottom: 0,
    width: '95%',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: `1px solid ${palette.whiteColors[0]}`,
      paddingBottom: 6,
      fontSize: 14,
      fontWeight: 700,
      color: palette.grayColors[7],
      [breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
  },
  tableBodyRow: {
    height: spacing(3),
    '&:last-child': {
      '& > td': {
        borderBottom: 'none',
      },
    },
    '& > td': {
      fontWeight: 545,
      fontSize: 14,
      padding: spacing(2),
      borderBottom: `0.5px solid ${palette.secondary.light}`,
      color: 'inherit',
      [breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
  },
  detailTotal: {
    width: '90%',
    height: spacing(6),
    background: ({ rowIndex }: StyleProps) =>
      rowIndex % 2 ? `${palette.grayColors[8]}` : `${palette.greenColors[7]}`,
    margin: 'auto',
    marginTop: spacing(4),
    marginBottom: spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  total: {
    width: '100%',
    paddingRight: spacing(5),
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: 16,
  },
}));
