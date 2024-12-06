import React from 'react'

const EmailCheck = () => {
  return (
    <div className='body'>
        <div className='container'>
            <div className='inputsContainer'>
                <label>Email:</label>
                <input type='email' placeholder='johndoe@example.com'/>

                <input type='submit' value='Next'/>
            </div>
        </div>
    </div>
  )
}

export default EmailCheck
