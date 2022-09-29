
import React from 'react'
import LoginForm from '../auth/LoginForm'

function Auth ({authRoute}) {
    console.log('1',authRoute);
  return (
    <div>
    {
        authRoute === 'login' && <LoginForm/>
    }
    </div>
  )
}

export default Auth