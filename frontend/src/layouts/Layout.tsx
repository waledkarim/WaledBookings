import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero";


const Layout = ({ children } : {children: React.ReactNode}) => {
    return(
        <div className="min-h-screen">
            <div className="bg-gradient">
                <Header />
                <Hero />
            </div>
            <div className="container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;