
const Footer = () => {
    return (
      // The bleeding container
      <div className="bg-gradient py-4">
        {/* The container container */}
        <div className="container h-20 flex flex-col items-center justify-between lg:flex-row">
          <div className="text-xl text-white font-bold tracking-tight">
            WaledBookings.com
          </div>
          <div className="text-white font-bold tracking-tight flex flex-col text-center lg:flex-row lg: gap-x-5">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;