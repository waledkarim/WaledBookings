const DetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">

        {/* Heading section */}
        <div className="flex flex-col space-y-2">
            <div className="bg-slate-300 h-[20px] w-1/2 lg:w-1/3"/>
            <div className="bg-slate-300 h-[30px] w-full lg:w-2/3"/>
        </div>

        {/* Image section in small screens */}
        <div className="bg-slate-300 w-full h-[300px] lg:hidden"/>

        {/* Image section in large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-x-3">
            {
                [1,2,3].map((_,ind) => (
                    <div key={ind} className="w-1/2 h-[300px] bg-slate-300"/>
                ))
            }
        </div>

        {/* Desc and Form section */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

                <div className="h-[250px] bg-slate-300 lg:h-[500px]"/>
                <div className="h-[200px] bg-slate-300 lg:h-[300px]"/>

        </div>

        {/* Facilities section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {
                [1,2,3,4].map((_,ind) => (
                    <div key={ind} className="w-3/3 h-[50px] bg-slate-300"/>
                ))
            }
        </div>

    </div>
  )
}

export default DetailSkeleton