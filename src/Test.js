import React, { useState } from 'react'
import { PickerOverlay } from 'filestack-react';


function Test() {
    const [isPicked, setIsPicked] = useState(false)
    const handlePicked = () =>{
        if (isPicked){
            setIsPicked(false)
        }
        else {
            setIsPicked(true)
        }
    }
  return (
    <div><button onClick={handlePicked}>upload file</button>
        {isPicked && <PickerOverlay
  apikey={'AGTWenryhQHG02DDUx8Jaz'}
  onSuccess={(res) => console.log(res)}
  onUploadDone={(res) => console.log(res)}
/>}
    </div>
  )
}

export default Test
//