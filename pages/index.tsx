import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

import Container from '../layouts/Container'

import bayc from '../public/bayc.png'
import mayc from '../public/mayc.png'
import punk from '../public/punk.png'
import doodle from '../public/doodle.png'
import azuki from '../public/azuki.png'
import something from '../public/something.png'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <Container>
      {/* TESTING */}
      <div className="grid flex-grow items-center gap-0 pb-12 md:grid-cols-2 md:gap-24 md:pb-48 md:pt-24">
        <div className="col-span-1 mb-12 mt-16 flex flex-col space-y-6 rounded-xl text-center md:mb-0 md:text-left  lg:justify-center lg:space-y-2">
          {/* HERO COPY */}
          <h1 className="font-poppins text-3xl font-extralight dark:text-white  md:max-w-md md:text-6xl">
            The best <span className="font-bold text-purple-500">NFTS</span> in
            one place
          </h1>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {/* HERO IMAGES */}
            <div className="flex flex-col gap-3 pt-24 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={bayc}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="bayc"
                  className="rounded-lg pt-2"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out  hover:-translate-y-1">
                <Image
                  src={punk}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="punk"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-12 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={mayc}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="mayc"
                  className="rounded-lg"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={doodle}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="doodle"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={azuki}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="mayc"
                  className="rounded-lg"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={something}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="doodle"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TESTING */}
      <div className="pt-12 pb-24 md:grid md:grid-cols-4">
        <div className="md:col-span-4 xl:col-span-3 xl:col-start-2">
          <section className="pb-12 lg:pb-16">
            <h1 className="text-center font-poppins text-3xl font-extralight dark:text-white md:text-left  md:text-4xl">
              <span className="font-bold text-purple-500">Explore</span> the
              collections:
            </h1>
          </section>
          <div className="flex flex-col items-stretch justify-center  space-y-8 md:space-y-24">
            <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
              {collections.map((collection, idx) => (
                <Link key={idx} href={`/nft/${collection.slug.current}`}>
                  <div className="group relative cursor-pointer  transition duration-500 ease-in-out hover:rotate-1 hover:scale-105">
                    <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>

                    <div className="relative flex items-center justify-between space-x-4 divide-gray-600 rounded-xl bg-white px-1.5 leading-none text-blue-200  transition duration-200 hover:text-purple-300 dark:bg-black sm:p-2">
                      <div className="duration-600 w-full origin-top-left rounded-2xl p-3 sm:w-auto md:w-full">
                        <div className="flex items-center gap-4 sm:flex-col md:flex-row md:gap-6">
                          <div className=" rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5">
                            <img
                              className="lg:w-38 h-auto w-16 flex-shrink rounded-lg object-cover sm:w-full md:w-32"
                              src={urlFor(collection.previewImage).url()}
                              alt=""
                            />
                          </div>

                          <div className="text-left sm:text-center md:text-left lg:py-8">
                            <h2 className="font-poppins text-xl text-amber-500 dark:text-amber-300 md:text-2xl xl:text-3xl">
                              {collection.title}
                            </h2>
                            <p className="mt-2 hidden font-poppins font-extralight text-black dark:text-white sm:block">
                              {collection.description}
                            </p>
                            <p className="mt-2 font-poppins font-medium text-purple-600 dark:text-purple-400">
                              {collection.nftCollectionName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    },
  }
}
