import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  salesHistoryPage: {
    width: '90%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '50px auto 20px'
  },
  slHistoryHeader: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // textAlign: 'center',
    marginBottom: spacing(2),
    paddingLeft: spacing(1),
    paddingRight: spacing(2)
  },
  headerDate: {
    paddingLeft: spacing(1),
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  headerBlock: {
    textTransform: 'capitalize',
    width: '25%'
    // textAlign: 'center'
  },
  headerTotal: {
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  salesHistoryItem: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '80px',
    marginBottom: '20px',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    color: palette.secondary.dark,
    fontWeight: 600,
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)'
    // textAlign: 'center'
  },
  // historyContentDate: {
  //   display: 'flex',
  //   justifyContent: 'flex-start',
  //   width: '28%'
  // },
  historyContent: {
    // display: 'flex',
    // justifyContent: 'center',
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  saleDate: {
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  saleTotal: {
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  historyTotal: {
    // display: 'flex',
    // justifyContent: 'flex-end',
    // width: '23%'
    // paddingLeft: '12px'
  },
  greenRow: {
    background: '#f9fcf9'
  },
  whiteRow: {
    background: 'white'
  },

  ////////////////

  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 15px'
  },
  tableRoot: {
    '& > th > td': {
      borderBottomColor: 'red'
    }
  },

  /////////////////
  salesHistoryTable: {
    borderCollapse: 'separate',
    borderSpacing: '0 15px',
    width: '80%',
    display: 'table',
    // textAlign: 'justify'
    margin: 'auto auto'
  },
  slHistoryTableHeader: {
    display: 'table-header-group',
    // textAlign: 'right'
    textAlign: 'justify'

    // backgroundColor: 'gray',
    // fontWeight: 'bold'
  },
  slHistoryHeaderCell: {
    display: 'table-cell',
    paddingBottom: 10,
    textAlign: 'justify',
    marginBottom: spacing(2),
    paddingLeft: spacing(1),
    paddingRight: spacing(2)
    // borderBottom: '1px solid black'
  },
  tableBody: {
    display: 'table-row-group'
  },
  tableRow: {
    display: 'table-row'
  },

  tableCell: {
    display: 'table-cell',
    height: '100px',
    position: 'relative',
    top: '50%'
    // transform: 'translateY(-50%)'
    // margin: 'auto auto',
    // marginBottom: '20px',
    // textAlign: 'justify'
  }
}));
