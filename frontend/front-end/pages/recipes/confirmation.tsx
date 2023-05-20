import Header from '@/components/Header'
import Head from 'next/head'
import RecipeDeleteTable from '@/components/recipe/RecipeDeleteTable'

const Confirmation: React.FC = () => {
    return (
        <>
            <Head>
                <title>Confirmation</title>
            </Head>
            <Header/>
            <main>
                <RecipeDeleteTable/>
            </main>
        </>
    )
}

export default Confirmation