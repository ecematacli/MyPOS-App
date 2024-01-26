import React from 'react'
// import { Scrollbars } from 'react-custom-scrollbars'
import { Typography, Box } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import {
  StyledPaper,
  StyledTitle,
  StyledDivider,
  NoDisplayText,
  ActivitiesContentContainer,
  CreatedContentContainer,
} from './last-activity-styles'
import { LastActivitiesData } from '../../types'
import { Loading } from '../../../../common/components/loading/loading'

interface Props {
  loading: boolean
  lastActivities: LastActivitiesData | null
}

export const LastActivities: React.FC<Props> = ({
  loading,
  lastActivities,
}) => {
  const renderLastActivities = () => {
    if (loading) {
      return <Loading />
    }

    if (!lastActivities || !lastActivities.length) {
      return (
        <NoDisplayText data-testid='no-display'>
          No activities to display
        </NoDisplayText>
      )
    }

    return lastActivities.map(({ event, created }, i) => (
      <ActivitiesContentContainer key={i}>
        <Box display='flex' alignItems='center'>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <ArrowRightIcon
              sx={{
                color: theme => theme.palette.secondary.main,
              }}
            />
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Typography
              data-testid='activity'
              sx={{
                color: theme => theme.palette.grayColors[3],
              }}>
              {event}
            </Typography>
          </Box>
        </Box>
        <CreatedContentContainer>
          <Typography data-testid='date' className='createdText'>
            {created}
          </Typography>
        </CreatedContentContainer>
      </ActivitiesContentContainer>
    ))
  }

  return (
    <StyledPaper data-testid='activities-paper'>
      <StyledTitle>
        <Typography>Last Activities</Typography>
      </StyledTitle>
      {/* <StyledDivider /> */}
      {/* <Scrollbars
        renderTrackHorizontal={props => (
          <div {...props} style={{ display: 'none' }} />
        )}
        renderThumbHorizontal={props => (
          <div {...props} style={{ display: 'none' }} />
        )}
        style={{ width: 'auto', height: 498 }}>
        <div className={classes.lastActivitiesContainer}>
        </div>
      </Scrollbars> */}
      {renderLastActivities()}
    </StyledPaper>
  )
}
