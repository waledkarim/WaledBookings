import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header"


const Layout = ({ children } : {children: React.ReactNode}) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="h-20" />
            <div className="container flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;