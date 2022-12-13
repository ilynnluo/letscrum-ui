import React from 'react'
import ReactDOM from 'react-dom'
import { OrganizationPage, SignInPage } from '../pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <OrganizationPage />
  },
  {
    path: '/signIn'
    element: <SignInPage />
  }
])