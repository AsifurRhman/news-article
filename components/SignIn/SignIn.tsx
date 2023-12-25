import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react'
export default function SignIn() {
  return (
      <>
          <h1 className='text-center mt-8'>Sign In</h1>
          <div className='mt-4 p-4 flex flex-col items-center justify-center'>
              <button
              onClick={()=>signIn("google")}
              
                  className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-400/25 transition">
                  <span>
                      <Image src="/google-logo.svg" width={30} height={30} alt="google-logo" />
                  </span>
                  Sign In With Google
              </button>
              <button
               onClick={()=>signIn("github")}
              
                  className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-400/25 transition">
                  <span>
                      <Image src="/github-logo.svg" width={30} height={30} alt="github-logo" />
                  </span>
                  Sign In With GitHub
              </button>
          </div>
          
      </>
  )
}
