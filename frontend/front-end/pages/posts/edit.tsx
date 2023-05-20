import Header from "@/components/Header"
import Head from "next/head"
import PostEditForm from "@/components/post/PostEditForm"


const Edit: React.FC = () => {
    return (
        <>
            <Head>
                <title>Edit Post</title>
            </Head>
            <Header/>
            <main>
                <PostEditForm/>
            </main>
        </>
    )
}

export default Edit