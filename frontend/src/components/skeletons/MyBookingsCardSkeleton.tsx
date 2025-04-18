const MyBookingsCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-y-3">
        {/* Heading section */}
        <div className="w-1/2 bg-slate-300 h-[25px]"/>

        {/* Main section */}
        {
            [1,2,3].map((_,ind) => (
                <div key={ind} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] rounded-lg p-2 gap-3 border border-slate-500">

                    <div className="w-full h-[200px] bg-slate-300 md:h-[250px]"/>
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                      <p className="w-full h-[40px] bg-slate-300 md:w-1/2"/>
                      <p className="w-2/4 h-[20px] bg-slate-300 md:w-1/3"/>
                      <p className="w-3/4 h-[30px] bg-slate-300 md:w-2/3"/>
                    </div>

                </div>
            ))
        }

    </div>
  )
}

export default MyBookingsCardSkeleton