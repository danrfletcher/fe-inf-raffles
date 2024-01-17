import { useEffect } from "react";
import { NavPagesObject } from "../services/get-nav-pages"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNavPages } from "../features/NavBarSlice";

export const NavPages = () => {
    const pages = useSelector((state: RootState) => state.nav.navPages);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchNavPages());
    }, [dispatch])

    return (
        <ul>
            {pages ? pages.navPages.map((page, index) => (
                <li key={index}>{page.name}</li>
            )) : null}
        </ul>
    )
}