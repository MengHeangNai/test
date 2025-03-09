'use client';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {

    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} className='w-fit'>
            {pending ? 'Loading...' : 'Submit'}
        </Button>
    )
}

export default SubmitButton
