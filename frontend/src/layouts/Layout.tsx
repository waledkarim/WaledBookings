import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header"


const Layout = ({ children } : {children: React.ReactNode}) => {
    return(
        <>
            <Header />
            <div className="h-20" />
            <div className="container">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout;