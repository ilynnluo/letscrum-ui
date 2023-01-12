import React from 'react'
import { Box, Stack, Avatar, Typography, Button, IconButton, Divider, Grid, Paper, Link } from '@mui/material'
import { StarOutline, Lock, GroupAdd } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import styled from '@emotion/styled'

const PrivateButton = styled(Button)({
  marginLeft: 'auto',
  height: '2rem',
  backgroundColor: grey[100],
  color: grey[900],
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: grey[200]
  }
})
const InviteButton = styled(Button)({
  marginLeft: '.5rem',
  height: '2rem',
  color: 'white',
  borderRadius: '2px'
})
const WelcomeNavButton = styled(Button)({
  margin: '.5rem',
  height: '2rem',
  backgroundColor: grey[100],
  color: grey[900],
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: grey[200]
  }
})
const ButtonText = styled(Typography)({
  marginLeft: '.5rem',
  color: grey[900],
  fontSize: '.875rem',
  fontWeight: '600'
})
const FavoriteButton = styled(IconButton)({
  marginLeft: '.5rem',
  height: '2rem',
  width: '2rem',
  '&:hover': {
    borderRadius: '2px'
  },
  '& .MuiButtonBase-root': {
    '& .MuiIconButton-root': {
      '&:hover': {
        borderRadius: '2px'
      }
    }
  }
})

export const ProjectSummaryPage: React.FunctionComponent = () => {
  return (
    <Box width='100%'>
      <Box width='calc(100wh - 16rem - 1px)'>
        <Stack direction='row' sx={{ position: 'sticky', top: 'calc(3rem + 1px)', padding: '1rem', backgroundColor: 'white' }}>
          <Avatar variant='rounded'>T</Avatar>
          <Typography variant='h6' sx={{ lineHeight: '40px', marginLeft: '.5rem' }} >test create project</Typography>
          <PrivateButton variant='contained' size='small' disableElevation >
            <Lock sx={{ fontSize: '1rem' }} />
            <Typography sx={{ marginLeft: '.5rem', fontSize: '.875rem' }}>
              Private
            </Typography></PrivateButton>
          <InviteButton variant='contained' size='small' disableElevation>
            <GroupAdd sx={{ fontSize: '1rem' }} />
            <Typography sx={{ marginLeft: '.5rem', fontSize: '.875rem' }}>
              Invite
            </Typography></InviteButton>
          <FavoriteButton>
            <StarOutline sx={{ fontSize: '1rem', color: 'brown' }} />
          </FavoriteButton>
        </Stack>
        <Divider sx={{ position: 'sticky', top: 'calc(7.5rem + 1px)', margin: 'auto', width: '98%' }} />
        <Box sx={{ flexGrow: 1, backgroundColor: grey[100], padding: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={8} >
              <Paper sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <Grid container sx={{ display: 'flex-column', margin: 'auto', justifyContent: 'center', alignItems: 'center', width: '24rem' }}>
                  <img src='project_overview_day_zero.IG7Dq6.png' alt='project_overview' style={{ width: '20rem' }} />
                  <Typography variant='h4' sx={{ marginTop: '2rem', fontWeight: 'bold' }}>
                    Welcome to the project!
                  </Typography>
                  <Typography variant='body2'>
                    What service would you like to start with?
                  </Typography>
                  <Grid container sx={{ display: 'flex', marginTop: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                    <WelcomeNavButton variant='contained' size='small' disableElevation>
                      <ButtonText>
                        Boards
                      </ButtonText>
                    </WelcomeNavButton>
                    <WelcomeNavButton variant='contained' size='small' disableElevation>
                      <ButtonText>
                        Repos
                      </ButtonText>
                    </WelcomeNavButton>
                    <WelcomeNavButton variant='contained' size='small' disableElevation>
                      <ButtonText>
                        Pipelines
                      </ButtonText>
                    </WelcomeNavButton>
                    <WelcomeNavButton variant='contained' size='small' disableElevation>
                      <ButtonText>
                        Test Plans
                      </ButtonText>
                    </WelcomeNavButton>
                    <WelcomeNavButton variant='contained' size='small' disableElevation>
                      <ButtonText>
                        Artifacts
                      </ButtonText>
                    </WelcomeNavButton>
                  </Grid>
                  <Link sx={{ marginTop: '1rem', textDecoration: 'none', cursor: 'pointer' }}>or manage your services</Link>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={12} lg={4}>
              <Paper>
                4
              </Paper>
              <Paper>
                4
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box >
  )
}
