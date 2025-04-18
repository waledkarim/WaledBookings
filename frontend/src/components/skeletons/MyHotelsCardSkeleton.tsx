const MyHotelsCardSkeleton = () => {
  return (
    <div className="animate-pulse">

        {/* Heading section */}
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-y-2 mb-3 py-3">
        <div className="w-full h-[25px] bg-slate-300 lg:w-2/4"/>
        <div className="w-1/2 h-[25px] bg-slate-300 lg:w-1/4"/>
      </div>


        {/* Card section */}
        <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-1 lg:gap-8">
          {
              [1,2,3].map((_, ind) => (
                  <div key={ind} className="flex flex-col gap-y-2 border border-slate-600 rounded-lg p-4">
                      <div className="w-1/2 h-[25px] bg-slate-300"/>
                      <div className="w-full h-[200px] bg-slate-300"/>
                      <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-5 lg:gap-2">
                          <div className="bg-slate-300 w-full h-[50px] rounded-lg"/>
                          <div className="bg-slate-300 w-full h-[50px] rounded-lg"/>
                          <div className="bg-slate-300 w-full h-[50px] rounded-lg"/>
                          <div className="bg-slate-300 w-full h-[50px] rounded-lg"/>
                          <div className="bg-slate-300 w-full h-[50px] rounded-lg"/>
                      </div>
                  </div>
              ))
          }
        </div>

    </div>
  )
}

export default MyHotelsCardSkeleton