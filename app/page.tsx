import NavbarIndex from '@/components/navbar-index'
import ServicesSection from './components/services'
import DoctorsSection from './components/doctors'
import Carousel from './components/carousel'
import Footer from './components/footer'
import Nosotros from './components/nosotros'

export default function Home () {
  return (
    <>

      <NavbarIndex />
      <Carousel />
      <Nosotros/>
      <ServicesSection />
      <DoctorsSection />
      <Footer />
      {/* <div className="grid place-items-center h-screen">
      <h2 className="text-2xl">Landing Page 🚀</h2>
      </div> */}
    </>
  )
}
