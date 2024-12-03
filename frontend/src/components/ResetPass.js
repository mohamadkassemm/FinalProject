import React from 'react'

const ResetPass = () => {
   
  return (
    <div className='body'>
        <div className='container'>
            <h2>Reset Password</h2>
            <div className='inputsContainer'>
                <label>New Password:</label>
                <input type='password' placeholder='use strong password'/>
                
                <label>Confirm Password:</label>
                <input type='password' placeholder='retype the password'/>

                <input type='submit' value='Change Password'/>
            </div>
        </div>
    </div>
  )
}

export default ResetPass
