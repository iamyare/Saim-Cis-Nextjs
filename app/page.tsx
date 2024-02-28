import NavbarIndex from '@/components/navbar-index'
import ServicesSection from './components/services'
import DoctorsSection from './components/doctors'
import Carousel from './components/carousel'
import Footer from './components/footer'

import 'react-loading-skeleton/dist/skeleton.css'
import Nosotros from './components/nosotros'

export default function Home () {
export default function Home () {
  return (
    <>

      <NavbarIndex />
      <Carousel />
      <Nosotros/>
      <ServicesSection />
      <DoctorsSection />
      <Footer />

    </>
  )
  )
}
