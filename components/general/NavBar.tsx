import { Button, buttonVariants } from '@/components/ui/button'
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import React from 'react'

async function NavBar() {

    const { getUser } = getKindeServerSession()

    const user = await getUser()

    return (
        <nav className='flex justify-between items-center py-5'>
            <div className='flex gap-6 items-center'>
                <Link href={'/'}>
                    <h1 className='text-3xl font-semibold'>
                        {'Blog'}<span className='text-blue-500'>{'Mengheang'}</span>
                    </h1>
                </Link>
                <div className='hidden sm:flex items-center gap-6'>
                    <Link href={'/'} className='text-sm font-medium hover:text-blue-500 transition-colors'>Home</Link>
                </div>
                <div className='hidden sm:flex items-center gap-6'>
                    <Link href={'/dashboard'} className='text-sm font-medium hover:text-blue-500 transition-colors'>Dashboard</Link>
                </div>
            </div>
            {
                user ? (
                    <div className='flex gap-6 items-center'>
                        <Link href={'/profile'}>
                            <Button variant={'link'} className='text-sm font-medium'>Profile</Button>
                        </Link>
                        <LogoutLink className={buttonVariants({ variant: 'secondary' })}>Logout</LogoutLink>
                    </div>
                ) : (
                    <div className='flex gap-6 items-center'>
                        <LoginLink>
                            <Button className={buttonVariants()}>Login</Button>
                        </LoginLink>
                        <RegisterLink>
                            <Button className={buttonVariants({ variant: 'secondary' })}>Register</Button>
                        </RegisterLink>
                    </div>
                )
            }
        </nav>
    )
}

export default NavBar
