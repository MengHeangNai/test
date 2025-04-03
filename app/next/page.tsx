import Head from 'next/head';
import styles from './Qr.module.css';
import QRGenerator from '@/components/general/QRGenerator';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>QR Code Generator</title>
                <meta name="description" content="Generate customizable QR codes" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>QR Code Generator</h1>
                <p className={styles.description}>
                    Create and customize your QR codes
                </p>

                <QRGenerator />
            </main>

            <footer className={styles.footer}>
                <p>QR Code Generator - Built with Next.js</p>
            </footer>
        </div>
    );
}
