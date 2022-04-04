import { Fragment, useState, useEffect } from 'react'
import { useAddress, useNFTDrop } from '@thirdweb-dev/react'
import { useTheme } from 'next-themes'
import { Dialog, Transition } from '@headlessui/react'

import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'

import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

import Container from '../../layouts/Container'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  // Modal
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  // state
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useNFTDrop(collection.address)

  const { theme } = useTheme()
  const address = useAddress()

  useEffect(() => {
    if (!nftDrop) return

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()

      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }

    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)

      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoading(false)
    }

    fetchNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return

    const quantity = 1

    setLoading(true)

    const notification = toast.loading('Minting...', {
      style: {
        background: theme === 'dark' ? 'black' : 'white',
        color: 'green',
        fontSize: '17px',
        padding: '14px 28px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt // tx receipt
        const claimedTokenId = tx[0].id // the ID of the NFT claimed
        const claimedNFT = await tx[0].data() // (optional) get the claimed metadata - attributes etc.

        toast.success('Successfully minted!', {
          duration: 8000,
          style: {
            background: theme === 'dark' ? 'black' : 'white',
            color: 'green',
            fontSize: '17px',
            padding: '14px 28px',
          },
        })

        console.log(receipt)
        console.log(claimedTokenId)
        console.log(claimedNFT)

        setIsOpen(true)
      })
      .catch((err) => {
        console.log(err)

        toast.error('Something went wrong.', {
          style: {
            background: theme === 'dark' ? 'black' : 'white',
            color: 'red',
            fontSize: '17px',
            padding: '14px 28px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <Container>
      {/* MAIN */}
      <div className="mt-8 flex flex-grow items-center justify-center md:mt-0 md:pt-12">
        <Toaster position="bottom-center" />

        {/* MODAL */}

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all dark:bg-black">
                  <Dialog.Title
                    as="h3"
                    className="font-poppins text-2xl font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Payment successful!
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-md  font-poppins text-gray-500 dark:text-white/75">
                      Your payment has been successfully submitted.
                      Congratulations on your new{' '}
                      <span className="font-bold text-purple-500">
                        {collection.nftCollectionName}
                      </span>
                      .
                    </p>
                  </div>

                  <div className="mt-4 md:mt-8">
                    <button onClick={closeModal} className="outline-0">
                      <div className="group relative cursor-pointer">
                        <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-50 blur transition duration-1000 group-hover:opacity-100"></div>

                        <div className="relative flex items-center space-x-4 divide-gray-600 rounded-lg  bg-white px-5 py-2 leading-none text-black transition duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300">
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
                              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                            />
                          </svg>
                          <span className="text-md font-poppins capitalize tracking-wider text-black transition duration-200  group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-300">
                            Got it, thanks!
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        {/* /MODAL */}
        <section className="grid w-full grid-cols-2 items-center gap-0 rounded-xl bg-gradient-to-tr from-purple-400/[0.10] to-blue-400/[0.05] p-6 dark:from-purple-800/[0.10] dark:to-blue-800/[0.05] md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12">
          <div className="col-span-2">
            <div className="my-auto rounded-xl bg-gradient-to-bl from-pink-600/[0.3] to-blue-400/[0.3] p-1.5 transition duration-500 ease-in-out hover:rotate-1  dark:from-pink-600/[0.1] dark:to-blue-400/[0.1] md:p-3">
              {/* HERO IMAGES */}
              <Image
                src={urlFor(collection.mainImage).url()}
                width={400}
                height={400}
                layout="responsive"
                alt="bayc"
                className="rounded-lg pt-2"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-center md:col-span-2 lg:col-span-3">
            {/* HERO COPY */}
            <div className="flex flex-grow flex-col items-start justify-center px-1 pt-8 md:px-0 md:pt-0">
              <h1 className="font-poppins text-4xl font-medium dark:text-white lg:text-6xl">
                {collection.title}
              </h1>
              <p className="text-md mb-4 pt-1 font-poppins font-extralight uppercase tracking-wider text-amber-600 dark:text-amber-400 lg:text-lg">
                <span className="font-poppins font-semibold">THE</span>{' '}
                {collection.description}
              </p>
              <p className="mb-3 font-poppins text-black/75 dark:text-white/75 md:max-w-lg lg:mb-4">
                Discover, collect, and sell extraordinary NFTs and become an
                owner today. Connect your wallet to get started.
              </p>
              {loading ? (
                <p className="mb-6 mt-2 inline-block w-auto animate-pulse rounded-md bg-white py-3 px-4 font-poppins text-lg font-medium uppercase text-green-600 shadow-lg dark:bg-black dark:text-green-500 lg:mb-0">
                  Loading supply count ...
                </p>
              ) : (
                <p className="mb-6 mt-2 inline-block w-auto rounded-md bg-white py-3 px-4 font-poppins text-lg font-medium uppercase text-green-600 shadow-lg dark:bg-black dark:text-green-500 lg:mb-0">
                  {claimedSupply} / {totalSupply?.toString()} NFT's claimed
                </p>
              )}
            </div>
            <div className="space-between flex w-full flex-col items-center gap-3 md:gap-4 lg:flex-row lg:pb-2">
              <div className="group relative w-full cursor-pointer">
                {loading ? (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000"></div>
                ) : claimedSupply === totalSupply?.toNumber() ? (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000"></div>
                ) : !address ? (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000"></div>
                ) : (
                  <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
                )}

                <button
                  disabled={
                    loading ||
                    claimedSupply === totalSupply?.toNumber() ||
                    !address
                  }
                  onClick={mintNft}
                  className="relative flex w-full cursor-pointer items-center justify-between space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4  leading-none text-black transition duration-200 hover:text-purple-500 disabled:cursor-not-allowed disabled:bg-gray-400/50 disabled:hover:text-black dark:bg-black dark:text-white dark:hover:text-purple-300 dark:disabled:bg-gray-500/50 disabled:dark:hover:text-white lg:justify-start"
                >
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  ) : claimedSupply === totalSupply?.toNumber() ? (
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  ) : !address ? (
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}

                  <span className="font-poppins text-lg capitalize tracking-wider  transition  duration-200  ">
                    {loading ? (
                      <>Loading...</>
                    ) : claimedSupply === totalSupply?.toNumber() ? (
                      <>Sold Out</>
                    ) : !address ? (
                      <>Sign in to Mint</>
                    ) : (
                      <>Mint ({priceInEth} ETH)</>
                    )}
                  </span>
                </button>
              </div>

              <Link href="/">
                <div className="group relative w-full cursor-pointer">
                  <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

                  <div className="text-blacktransition relative flex items-center justify-between space-x-4 divide-gray-600 rounded-lg bg-white  px-7 py-4 leading-none duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300 lg:justify-start">
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="font-poppins text-lg capitalize tracking-wider text-black transition duration-200 group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-300">
                      Go Back
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage {
        asset
      },
      previewImage {
        asset
      },
      slug {
        current
      },
      creator-> {
        _id,
        name,
        address,
        slug {
        current
      },
    },
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
