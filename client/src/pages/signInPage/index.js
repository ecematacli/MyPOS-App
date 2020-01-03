import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  TextField
} from '@material-ui/core';

import styles from './styles';
import image from '../../assets/img/accountant.jpg';
import CustomButton from '../../common/customButton/CustomButton';

const formFields = [
  {
    name: 'email',
    label: 'Email*'
  },
  {
    name: 'password',
    label: 'Password*'
  }
];

const SignInPage = () => {
  const classes = styles();
  return (
    <div className={classes.signInRoot}>
      <Card className={classes.signInCard}>
        <div className={classes.cardContainer}>
          <div className={classes.cardMediaImg}>
            <CardMedia className={classes.signInCardImg} image={image} />
          </div>
          <div>
            <CardContent>
              <div className={classes.signInFormContainer}>
                <Typography className={classes.signInText}>Sign In</Typography>
                {formFields.map(({ name, label }) => (
                  <TextField
                    key={name}
                    color="secondary"
                    label={label}
                    variant="outlined"
                    className={classes.signInFields}
                    name={name}
                    type={name}
                  />
                ))}
                <CustomButton>
                  <Typography className={classes.btnText}>Sign In</Typography>
                </CustomButton>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
