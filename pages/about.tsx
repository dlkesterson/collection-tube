import Head from 'next/head';
import styles from '../styles/About.module.css';

export default function About() {
	return (
		<div className='container'>
			<Head>
				<title>About </title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='main'>
				<h1 className={styles.aboutTitle}>This is the About page</h1>
                <p><a href="/">return home</a></p>
			</main>
		</div>
	);
}
