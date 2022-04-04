import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'

import Button from '../components/Button'
import Footer from '../components/Footer'

interface Props {
  children: React.ReactNode
}

function Container({ children }: Props) {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] dark:from-purple-400/[0.15]">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-8">
            <header className="z-50 flex flex-col items-center justify-between border-b border-pink-400/[0.15] pb-8 md:flex-row md:pb-10">
              <Link href="/">
                <h1 className="cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-purple-800/75 dark:text-purple-300/50 md:text-xl">
                  The Best{' '}
                  <span className="font-medium text-purple-800 dark:text-purple-400">
                    NFTS
                  </span>
                </h1>
              </Link>

              <div className="mt-6 flex flex-col items-center space-y-4 md:mt-0 md:flex-row  md:space-y-0 md:space-x-5">
                {address && (
                  <p className="text-center text-sm text-amber-600 dark:text-amber-300">
                    You're logged in with wallet {address.substring(0, 5)}
                    ...
                    {address.substring(address.length - 5)}
                  </p>
                )}
                <div className="flex items-center space-x-5">
                  <button
                    onClick={() =>
                      address ? disconnect() : connectWithMetamask()
                    }
                  >
                    <Button
                      icon={
                        address ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                        )
                      }
                      text={address ? 'Sign Out' : 'Sign In'}
                    />
                  </button>

                  {mounted && (
                    <>
                      {theme === 'dark' ? (
                        <button onClick={() => setTheme('light')}>
                          <div className="group relative">
                            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

                            <div className="relative flex items-center space-x-4 divide-gray-600 rounded-full  bg-white p-4 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-black dark:text-blue-200 dark:hover:text-purple-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                className="h-6 w-6 text-yellow-500 dark:text-yellow-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <button onClick={() => setTheme('dark')}>
                          <div className="group relative">
                            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

                            <div className="relative flex items-center space-x-4 divide-gray-600 rounded-full  bg-white p-4 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-black dark:text-blue-200 dark:hover:text-purple-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                className="h-6 w-6 text-yellow-500 dark:text-yellow-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                              </svg>
                            </div>
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </header>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Container
