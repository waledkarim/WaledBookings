import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import { RiLoaderLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SignOutButton from "./SignOut";



//todo: change the background after having scrolled to a certain amount.
const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();

    function handleHamburgerClick(): void{
        setOpen(!open);
    }

    return (
        // The container that bleeds
        <div className="fixed left-0 right-0 py-6 h-20 bg-gradient z-50">
            {/* The container container */}
            <div className="container flex justify-between items-center">
                {/* Brand Link */}
                <div className="text-white text-lg font-bold tracking-tight cursor-pointer lg:text-2xl">
                    <Link to={"/"}>WaledBookings</Link>
                </div>
                {/* Links */}
                <div className="">
                    {
                        isLoggedIn === "loading" ? 
                        (
                            <RiLoaderLine className="animate-spin"/>
                        ): 
                        (
                            isLoggedIn === "error" ? 
                            (
                                <button onClick={() => navigate("/sign-in")} className="btn">
                                    Sign in
                                </button>
                            ):
                            (
                                <>
                                    {/* In small screens */}
                                    <div className="relative">
                                        <GiHamburgerMenu size={20} className="text-white cursor-pointer lg:hidden" onClick={handleHamburgerClick}/>
                                        {
                                            open && <div onClick={() => setOpen(false)} className="w-[200px] absolute right-0 top-full flex flex-col gap-y-2 bg-white rounded-lg shadow-md py-2">
                                                <Link to={"/my-bookings"} className="link-btn">My Bookings</Link>
                                                <Link to={"/my-hotels"} className="link-btn">My Hotels</Link>
                                                <SignOutButton />
                                            </div>
                                        }
                                    </div>  
                                    {/* In large Screens */}
                                   <div className="hidden lg:flex lg:space-x-2">
                                        <Link to={"/my-bookings"} className="btn">My Bookings</Link>
                                        <Link to={"/my-hotels"} className="btn">My Hotels</Link>
                                        <SignOutButton />
                                    </div>
                               </>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;