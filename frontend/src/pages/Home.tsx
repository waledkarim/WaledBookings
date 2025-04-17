import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";

const Home = () => {


  const { data: hotels, isFetching } = useQuery("fetchHotels",
    apiClient.fetchHotels
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="py-5">

      {
        isFetching ? <HomePageSkeleton /> :
          <>
            {/* Heading section */}
            <div className="flex flex-col py-2">
              <h2 className="text-3xl font-bold">Latest Destinations</h2>
              <p>Most recent desinations added by your favourite hotel managers</p>
            </div>

            {/* Main section */}
            <div className="grid gap-4">

                {/* Top row hotels */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  {
                    topRowHotels.map((hotel) => (
                      <LatestDestinationCard hotel={hotel} />
                    ))
                  }
                </div>

                {/* Bottom row hotels */}
                <div className="grid md:grid-cols-3 gap-4">
                  {
                    bottomRowHotels.map((hotel) => (
                      <LatestDestinationCard hotel={hotel} />
                    ))
                  }
                </div>
                
            </div>

          </>
      }

    </div>
  );
};

export default Home;