import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import { Footer } from "../footer/Footer"
import FilmSlider from "../ListFilmActive/ListFilmActive"

export const UserLayout = () => {
    return (
        <>
            <Header />
            <div className="">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}