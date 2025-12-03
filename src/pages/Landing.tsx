import type { ReactElement } from 'react'
import landing01 from '@/assets/landing-01.png'
import Features from '@/components/landing/Features'
import Headline from '@/components/landing/Headline'

const Landing = (): ReactElement => {
  return (
    <>
      <Headline />
      <img src={landing01} alt="Daisy Financial - Hero" className="w-full" />
      <Features />
    </>
  )
}

export default Landing
