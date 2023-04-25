import styles from '../styles/components/intro.module.css'

type Props = {
    text: string
}

const Intro: React.FC<Props> = ({ text }: Props) => {
    return (
        <>
            <h1 className={styles.h1}>{text}</h1>
            <hr className={styles.hr}/>
        </>
    )
}

export default Intro
