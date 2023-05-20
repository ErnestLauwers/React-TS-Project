import Head from 'next/head'
import Header from '@/components/Header'
import UserService from '@/services/UserService'
import styles from '../styles/register.module.css'
import { Error } from '../../types'
import { useState } from 'react'
import { useRouter } from 'next/router'
import UserRegisterForm from '@/components/user/UserRegisterForm'

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Header/>
            <main>
                <UserRegisterForm/>
            </main>
        </>
    )
}

export default Register