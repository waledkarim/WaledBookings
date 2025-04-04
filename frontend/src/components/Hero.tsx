const Hero = () => {
    return (
        // The bleed container
        <div className="pt-20 pb-10 bg-gradient">
            {/* The container container */}
            <div className="container flex flex-col gap-2">
                <h1 className="text-2xl text-white font-bold lg:text-3xl">Find your next stay</h1>
                <p className="text-lg text-white lg:text-2xl">
                    Search low prices on hotels for your dream vacation...
                </p>
            </div>
        </div>
    )
}

export default Hero;