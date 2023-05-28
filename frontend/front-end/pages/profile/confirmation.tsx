import Head from "next/head"
import Header from "@/components/Header"
import styles from '../../styles/profile.module.css'
import ProfileDeleteTable from "@/components/user/ProfileDeleteTable"

const Delete: React.FC = () => {
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header/>
            <main>
                <ProfileDeleteTable/>
            </main>
        </>
    )
}

export default Delete
