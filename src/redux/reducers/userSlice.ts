import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: any
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  inSuperAdmin: boolean
  token: {
    accessToken: string | null
    refreshToken: string | null
  }
}

const initialState: UserState = {
  loading: false,
  error: null,
  id: null,
  name: null,
  email: null,
  password: null,
  inSuperAdmin: false,
  token: {
    accessToken: null,
    refreshToken: null
  }
}

export const userSignIn = createAsyncThunk(
  'user/signIn',
  async (param: { inputName: string, inputPwd: string }): Promise<UserState> => {
    try {
      const response = await axios.post('https://imoogoo.com/api/v1/signin', {
        name: param.inputName,
        password: param.inputPwd
      })
      return response.data.item
    } catch (e: any) {
      return e.message
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.pending, (state) => {
        state.loading = true
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.loading = false
        state.token.accessToken = action.payload.token.accessToken
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const selectUserLoading = (state: RootState): boolean => state.user.loading
export const selectUserError = (state: RootState): any => state.user.error
export const selectUserAccessToken = (state: RootState): string | null => state.user.token.accessToken
export default userSlice.reducer
