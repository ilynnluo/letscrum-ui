import React from 'react'
import { SignInForm } from '../../components'
import { SignInLayout } from '../../layout'

export const SignInPage: React.FunctionComponent = () => {
  return (
    <SignInLayout>
      <SignInForm />
    </SignInLayout>
  )
}
