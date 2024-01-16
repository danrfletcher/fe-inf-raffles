import { IoIosMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoTicketSharp } from "react-icons/io5";
import styled from "styled-components";
import '../fonts/fonts.css';
import { MobileNavBar } from "./MobileNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { setMobileBarState, setNotYetLoaded } from "../features/NavBarSlice";

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    background-color: #1b1d1c;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 9vh;
    & > li {
        width: 33.3%;
        color: white;
    }
    `
const NavMobileMenu = styled(IoIosMenu)`
    font-size: 4em;
    `
const NavLeftSection = styled.li``
const NavMiddleSection = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    `
const NavRightSection = styled.li``
const NavRightSectionElements = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    & > li {
        font-size: 2.5em;
        margin-right: 15px;
    }
    `
const NavHeaderText = styled.h1`
    font-family: 'Graffiti';
    font-size: 1.5em;
    font-weight: normal;
    `

    
export const Nav = () => {
        const displayMobileNavBar = useSelector((state: RootState) => state.nav.mobileBarIsOpen);
        const onFirstLoad = useSelector((state: RootState) => state.nav.notYetLoaded);
        const dispatch = useAppDispatch();
        
        const handleNavMobileMenuClick = () => {
            if (onFirstLoad) {
                dispatch(setNotYetLoaded());
            } else {
                dispatch(setMobileBarState());
            }
        }

    return (
        <nav>
            <NavList>
                <NavLeftSection>
                    <NavMobileMenu onClick={handleNavMobileMenuClick} />
                </NavLeftSection>
                <NavMiddleSection><NavHeaderText>vegoilraffles</NavHeaderText></NavMiddleSection>
                <NavRightSection>
                    <NavRightSectionElements>
                        <li><CgProfile /></li>
                        <li><IoTicketSharp /></li>
                    </NavRightSectionElements>
                </NavRightSection>
            </NavList>
            <MobileNavBar />
        </nav>
    )
}

/* NOTES

<li>Profile</li>
<li>Raffles</li>
<li>Help</li>
<li>Logo</li>
<li>Tickets</li>
<li>Winners</li>

*/