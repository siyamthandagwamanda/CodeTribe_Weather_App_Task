import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import '../Styles/Structure.css';

export const Structure = () => {
    return (
        <div className="Structure">
            <Header />
            <Navigation />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}