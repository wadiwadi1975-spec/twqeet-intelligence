import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../layouts/Layout'
import AuthLayout from '../layouts/AuthLayout'
import { LangProvider, useLang } from '../contexts/LangContext'

const authPages = ['/login', '/register'];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = authPages.includes(router.pathname);
  const { lang } = useLang();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
        })
        .catch((err) => {
          console.log('SW registration failed:', err);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{lang === 'ar' ? 'منصتي - ذكاء القرارات' : 'MINASATI - Smart Decisions'}</title>
        <meta name="description" content={lang === 'ar' ? 'ذكاء القرارات.. زيادة الربح وتقليل المخاطر' : 'Smart Decisions.. Increase profit and reduce risks'} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0a1628" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {isAuthPage ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}

export default function App(props: AppProps) {
  return (
    <LangProvider>
      <AppContent {...props} />
    </LangProvider>
  );
}
