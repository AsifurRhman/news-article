import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div  className="flex justify-between pb-4 border-b mb-4">

            <div>
                <Link href={"/"}>
                    <h1 className="text-dark text-4xl font-bold tracking-tighter">Next News</h1>
                </Link>

                <p className="text-sm">

                    Unveiling Tomorrow&apos;s Breakthroughs,<br /> Byte by Byte.
                </p>

            </div>

            <div className='flex items-center'>
                <Link className="btn"href={"/sign-in"}>
                    SignIn
                </Link>
            </div>

        </div>
    )
}
