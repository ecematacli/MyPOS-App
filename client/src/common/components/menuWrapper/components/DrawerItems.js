import React from 'react';
import clsx from 'clsx';
import {
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  List,
  ListItemIcon
} from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import history from '../../../../history/history';

const DrawerItems = props => {
  const classes = styles(props);
  const {
    label,
    icon,
    url,
    isOpened,
    subMenuItems,
    toggleOpenedItems,
    onSignOutClick
  } = props;
  let drawerIcon;

  if (icon === 'dashboard') drawerIcon = <DashboardIcon />;
  else if (icon === 'sales') drawerIcon = <MonetizationOnOutlinedIcon />;
  else if (icon === 'products') drawerIcon = <SportsTennisRoundedIcon />;
  else if (icon == 'signout') drawerIcon = <PowerSettingsNew />;

  const renderSubMenuItems = () => {
    return subMenuItems
      ? subMenuItems.map(({ subLabel, url }, i) => (
          <Collapse key={subLabel} in={isOpened()} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={clsx(
                  i === 0 && classes.subMenuFirstItem,
                  classes.subMenuItems
                )}
              >
                <ListItemIcon className={classes.subMenuIcons}>
                  {i === 0 ? <AddShoppingCartIcon /> : <HistoryIcon />}
                </ListItemIcon>
                <ListItemText primary={subLabel} />
              </ListItem>
            </List>
          </Collapse>
        ))
      : null;
  };

  return (
    <React.Fragment>
      <ListItem
        onClick={() => {
          toggleOpenedItems();
          history.push(url);
          icon === 'signout' && onSignOutClick();
        }}
        className={classes.drawerList}
        button
      >
        <IconButton className={classes.drawerIcon}>{drawerIcon}</IconButton>
        <ListItemText primary={label} />
        {subMenuItems ? isOpened() ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {isOpened() && renderSubMenuItems()}
    </React.Fragment>
  );
};

export default DrawerItems;

// {
//   drawerItemList.map(({ label, url, Icon, subMenuItems }, i) => (
//     <div key={url}>
//       <DrawerItems
//         url={url}
//         label={label}
//         Icon={Icon}
//         subMenuItems={subMenuItems}
//         isOpened={() => isOpened(label)}
//         toggleOpenedItems={() => {
//           toggleOpenedItems(label);
//         }}
//         // directedUrl={() => history.push(url)}
//         onSignOutClick={onSignOutClick}
//       />
//       <Icon />
//       {i === drawerItemList.length - 2 && (
//         <Divider className={classes.divider} />
//       )}
//     </div>
//   ));
// }
