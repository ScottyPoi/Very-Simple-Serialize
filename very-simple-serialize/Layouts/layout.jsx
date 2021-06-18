import Head from 'next/head';

export default function Layout({children}) {
    return (
        <>
        <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossOrigin="anonymous" />
        </Head>
            <div>
                {children}
            </div>
        </>
    )
}