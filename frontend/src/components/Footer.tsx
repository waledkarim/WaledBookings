const Footer = () => {
    return (
      // The bleeding container
      <div className="absolute bottom-0 left-0 right-0 bg-gradient py-4">
        <div className="container h-20 flex flex-col items-center justify-between lg:flex-row">
          <div className="text-xl text-white font-bold tracking-tight">
            MernHolidays.com
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