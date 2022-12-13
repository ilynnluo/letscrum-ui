import React, { useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { Box, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { userSignIn, selectUserLoading, selectUserError, selectUserAccessToken } from '../../redux/reducers/userSlice'
import { useNavigate } from 'react-router-dom'

interface UserProps {
  inputName: string
  inputPwd: string
}

export const SignInForm: React.FunctionComponent = () => {
  const loading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)
  const jwt = useAppSelector(selectUserAccessToken)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const signIn: UserProps = {
    inputName: (document.getElementById('name') as HTMLInputElement).value,
    inputPwd: (document.getElementById('password') as HTMLInputElement).value
  }
  const handleSignIn = (): void => {
    void dispatch(userSignIn(signIn))
      .then(() => {
        useEffect(() => {
          navigate('/', { replace: true })
        }, [jwt])
      })
      .catch(() => alert(error))
  }
  return (
    <Box>
      <TextField
        required
        id="name"
        label="Enter your nanme"
        defaultValue="Enter your nanme"
        variant="standard"
      />
      <TextField
        required
        id="password"
        label="Enter password"
        type="password"
        defaultValue="Enter password"
        variant="standard"
      />
      {
        loading
          ? <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Submit
          </LoadingButton>
          : <Button variant="contained" onClick={handleSignIn}>
            Submit
          </Button>
      }
    </Box>
  )
}
