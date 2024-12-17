import { Outlet } from "react-router-dom"
import Header from "../layout/header/Header"
import { Footer } from "../layout/footer/Footer"
import FilmSlider from "../ListFilmActive/ListFilmActive"

export const UserDashboard = () => {
    return (
        <>
            <FilmSlider />
        </>
    )
}