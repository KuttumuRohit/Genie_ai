import React from 'react'
import Robot from './Robot'

function HomePublic() {
  return (

    <div className="flex flex-row h-screen bg-black text-white">
      <div className="w-1/2 flex  justify-center p-6 m-8 ">
        <p className="w-fit [font-family:'Manrope-ExtraBold',Helvetica] font-extrabold text-[64px] leading-[1.1]">
          <span>
            All Your Creative Tools,&nbsp;&nbsp;<br />
            Powered by AI.&nbsp;&nbsp;<br />
            Tailored for Creators.
            <br />
          </span>
          <span className="text-4xl font-normal leading-[1.2]">
            
            Powerful AI agents to help content 
            creators write, design, and grow — all in one place.
          </span>
        </p>
      </div>

      {/* Right Side - Robot */}
      <div className="w-1/2 h-4/5 ">
        <div className="w-full h-full p-0">
            <br />  
          <Robot />
        </div>
      </div>

    </div>
  )
}

export default HomePublic
