import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  lastActivitiesPaper: {
    height: 570,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    marginLeft: 20,
    [breakpoints.down('sm')]: {
      marginTop: spacing(3),
      marginLeft: 0
    }
  },
  title: {
    padding: spacing(3, 2.5),
    color: palette.grayColors[3]
  },
  divider: {
    backgroundColor: palette.secondary.light
  },
  noDisplayMsg: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: spacing(3),
    color: palette.secondary.main
  },
  lastActivitiesContainer: {
    height: '88%',
    paddingTop: spacing(1.7)
  },
  activitiesContentDiv: {
    padding: spacing(1, 1)
  },
  eventContentDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  eventContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventText: {
    color: palette.grayColors[3]
  },
  createdContent: {
    padding: spacing(1, 1)
  },
  createdText: {
    fontSize: 15,
    color: palette.secondary.main
  },
  arrowIcon: {
    color: palette.secondary.main
  }
}));
