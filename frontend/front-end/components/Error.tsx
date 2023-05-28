import styles from '../styles/createRecipe.module.css'

type Props = {
    error: string
}

const Error: React.FC<Props> = ({error}: Props) => {
    return (
        <>
            <p className={styles.error}>An error ocurred: {error}</p>
        </>
    )
}

export default Error
