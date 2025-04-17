const HomePageSkeleton = () => {
  return (
    <div className="space-y-2 animate-pulse">

        {/* Heading section */}
        <div className="flex flex-col gap-y-2">
              <h2 className="w-full h-[20px] bg-slate-300 lg:w-2/3"/>
              <p className="w-1/2 h-[10px] bg-slate-300 lg:w-1/3"/>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {
                [1,2,3,4].map((_, ind) => (
                    <div key={ind} className="rounded-md">
                        <div className="h-[300px]">
                            <div
                                className="w-full h-full bg-slate-300"
                            />
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default HomePageSkeleton