import GlobalStyle from './globalStyle';

export default function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}