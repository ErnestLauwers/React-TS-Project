import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/home.module.css'
import Image from 'next/image'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <main>
                <p className={styles.header}>
                    !!in init-db.ts staan er meerdere users!!
                </p>
                <p>Admin : username: ernestlauwers password: password</p>
                <p>Admin : username: igorstefanovic password: password</p>
                <p>User1 : username: davidwalker password: password</p>
                <p>User2 : username: lorrainemasson password: password</p>
                <p>User3 : username: jennifershelby password: password</p>
                <Image className={styles.image1} src="/image1.webp" alt="Cooking Image" width={400} height={250}/>
                <section className={styles.post}>
                    <Image className={styles.postImage} src="/post.png" alt="Post" width={400} height={220}/>
                    <p className={styles.postText}>You want to empty your mind about your favorite cookies? Just go to the posts and add a post!</p>
                </section>

                <section className={styles.recipe}>
                    <Image className={styles.recipeImage} src="/recipe.png" alt="Recipe" width={400} height={280}/>
                    <p className={styles.recipeText}>Do you have the best recipe for scrambled eggs? Go to recipes and share it with everyone!</p>
                </section>
                <Image className={styles.image2} src="/image2.jpg" alt="Cooking Image" width={400} height={200}/>
                <p className={styles.header}>Welcome</p>
                <p className={styles.welcome}>Welcome to Cookbook Companion! If you are looking for a website where you can
                    get all sorts of recipes, share your favorite recipes, give opinions on food and much more, then you're at the right spot!
                    What you waiting for, register now or login if you already have an account!
                </p>
            </main>
        </>
    )
}