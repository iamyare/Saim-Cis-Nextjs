import LogoSaimCis from '@/components/logo-saim-cis'

export default function Loading () {
  return (
    <div className="flex justify-center items-center h-screen -mt-[64px]">
      <div className="flex flex-col justify-center items-center">
        <div role="status">
          <LogoSaimCis className="h-16 w-16 animate-pulse" />
        </div>

        {/* <p>
    Cargando...
</p> */}
      </div>
    </div>
  )
}
