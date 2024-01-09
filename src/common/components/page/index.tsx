import { Typography } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { Align } from '../Align'
import { Loading } from '../loading/loading'
import styles from './styles'

interface Props {
  loading: boolean
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export const Page: FC<Props> = ({
  loading,
  title,
  actions,
  description,
  children,
}) => {
  const classes = styles()
  return (
    <div className={classes.container}>
      <Align className={classes.titleContainer}>
        <Typography className={classes.title}>{title}</Typography>
      </Align>
      <Align
        justify='space-between'
        align='center'
        fullWidth
        className={classes.actionsBar}>
        <Align
          justify='space-between'
          align='center'
          className={classes.actionSectionWrapper}
          fullWidth>
          {description && (
            <Typography className={classes.infoText}>{description}</Typography>
          )}
          {actions}
        </Align>
      </Align>
      {loading && <Loading />}
      <Align vertical className={classes.content}>
        {children}
      </Align>
    </div>
  )
}
