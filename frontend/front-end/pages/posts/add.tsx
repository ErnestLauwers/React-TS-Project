import Header from "@/components/Header"
import Head from "next/head"
import PostAddForm from "@/components/post/PostAddForm"

const AddPost: React.FC = () => {
    return (
        <>
            <Head>
                <title>Create Post</title>
            </Head>
            <Header/>
            <main>
                <PostAddForm/>
            </main>
        </>
    )
}

export default AddPost