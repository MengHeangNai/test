'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { hashStorage } from '@/store/hashStorage'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

function NavBar() {
    const { getUser } = useKindeBrowserClient()
    const user = getUser()
    const pathname = usePathname()

    const links = user?.id === 'kp_587d35e65fe94c499a40430a2e79bce8'
        ? [
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/my-leaning', label: 'My Learning' },
            { href: '/home', label: 'Country' },
            { href: '/my-portfolio', label: 'My Portfolio' },
            { href: '/my-app', label: 'My App Build' },
        ]
        : [
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/my-leaning', label: 'My Learning' },
            { href: '/home', label: 'Country' },
        ]

    return (
        <nav className='flex justify-between items-center py-5'>
            <div className='flex gap-6 items-center'>
                <Link href='/'>
                    <h1 className='text-3xl font-semibold'>
                        Blog<span className='text-blue-500'>{user?.family_name ? user.family_name : ''}{user?.given_name ? user.given_name : ''} </span>
                    </h1>
                </Link>
                {
                    links.map(({ href, label }) => (
                        <div key={href} className='hidden sm:flex items-center gap-6'>
                            <Link
                                href={href}
                                className={clsx(
                                    'text-sm font-medium transition-colors',
                                    pathname === href
                                        ? 'text-blue-500 underline underline-offset-4'
                                        : 'hover:text-blue-500'
                                )}
                            >
                                {label}
                            </Link>
                        </div>
                    ))
                }
            </div>
            {user ? (
                <div className='flex gap-6 items-center'>
                    <p className='text-sm font-medium'>{user.family_name} {user.given_name}</p>
                    <LogoutLink
                        onClick={() => {
                            hashStorage.clear()
                            window.location.reload()
                        }}
                        className={buttonVariants({ variant: 'secondary' })}
                    >
                        Logout
                    </LogoutLink>
                </div>
            ) : (
                <div className='flex gap-6 items-center'>
                    <LoginLink>
                        <Button className={buttonVariants()}>Login</Button>
                    </LoginLink>
                    <RegisterLink>
                        <Button className={buttonVariants()}>Register</Button>
                    </RegisterLink>
                </div>
            )}
        </nav>
    )
}

export default NavBar
