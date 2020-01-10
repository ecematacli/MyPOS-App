import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  salesDetailsContainer: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflowY: 'auto',
    overflowX: 'auto',
    marginTop: '-14.8px',
    paddingTop: spacing(3),
    paddingBottom: spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: ({ rowIndex }) => (rowIndex % 2 ? '#fff' : '#f8fdf8')
  },
  detailsPaper: {
    width: '80%',
    height: '80%',
    boxShadow: 'none',
    backgroundColor: 'inherit',
    paddingLeft: 120,
    paddingRight: 120
  },
  productDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    margin: spacing(1),
    color: palette.secondary.main
    // borderBottom: '1px solid #eee'
  },
  detailAction: {
    display: 'flex'
  },
  editIcon: {
    marginLeft: spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: palette.secondary.dark,
    cursor: 'pointer'
  },
  editFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  editIcons: {
    marginLeft: spacing(1)
  },
  closeIcon: {
    fontSize: spacing(3.5),
    marginLeft: 5
  },
  doneIcon: {
    fontSize: spacing(3.5),
    marginLeft: 3
  },
  editInput: {
    width: spacing(20),
    height: spacing(5),
    fontWeight: 400,
    fontSize: spacing(2),
    color: palette.textColor,
    borderColor: palette.secondary.dark
  }
}));
