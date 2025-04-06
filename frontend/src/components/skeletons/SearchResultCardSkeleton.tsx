

const SearchResultCardSkeleton = () => {

  return (
    <div className="animate-pulse flex flex-col gap-y-4 lg:w-full">

        {/* Results heading */}
        <div className="flex justify-between items-center">

            <div className="w-full h-5 lg:w-1/2 bg-slate-300"></div>
            {/* todo: sort options */}
        </div>

        {/* Card section */}
        {
          [1,2,3].map((_, ind) => (
            
              <div key={ind} className="w-full border border-slate-300 rounded-lg p-2 flex flex-col gap-y-2 lg:flex-row lg:gap-x-4">

                  {/* Image section */}
                  <div className="w-full h-[250px] bg-slate-300 lg:flex-1"/>

                  {/* Details sections */}
                  <div className="flex flex-col gap-y-2 lg:flex-[2] lg:justify-between">
                    <p className="w-full h-10 bg-slate-300"/>
                    <p className="w-1/3 h-5 bg-slate-300"/>
                    <p className="w-1/2 h-10 bg-slate-300"/>

                    <div className="flex flex-col">
                        <div className="self-end h-5 bg-slate-300 w-40"/>
                        <div className="self-end h-5 bg-slate-300 w-40"/>
                    </div>

                  </div>

              </div>

          ))
        }

    </div>
  );

}


export default SearchResultCardSkeleton;
