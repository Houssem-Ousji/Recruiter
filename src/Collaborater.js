import React from 'react'

function Collaborater() {
    const companies = ['trust_icon_1','trust_icon_2','trust_icon_3','trust_icon_4','trust_icon_5']
  return (
    <div className='app-collaborater'>
        <h2>Trusted By</h2>
        <div className='app-companies'>
            {companies.map((company)=>{
                return <div key={Math.random()*100} className='company-box'> <img src={company + '.png'} alt="" /></div>
            })}
        </div>
        
    </div>
  )
}

export default Collaborater