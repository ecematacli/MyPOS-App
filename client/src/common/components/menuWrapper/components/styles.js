import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  drawerList: {
    marginBottom: ({ icon }) => (icon === 'products' ? '3px' : '-5px')
  },
  drawerIcon: {
    color: palette.secondary.light
  },
  subMenuItems: {
    paddingLeft: spacing(4)
  },
  subMenuFirstItem: {
    marginBottom: spacing(1)
  },
  subMenuIcons: {
    color: palette.secondary.light,
    paddingLeft: spacing(3)
  }
}));
