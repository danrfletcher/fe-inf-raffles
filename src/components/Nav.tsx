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
import device from '../config/device-sizes.json';

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
    max-width: 100vw;
    height: 70px;
    & > * {
        color: white;
    }
    & > :not(:last-child) {
        margin-right: 10px;
    }
    @media ${device.tablet.landscape}, ${device.mobile.landscape} {
        height: 50px;
    }
    `
const NavMobileMenu = styled(IoIosMenu)`
    font-size: clamp(0.1em, 7.5vw, 48px);
    `
const NavLeftSection = styled.li`
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: left;
    margin-left: 10px;
    `
const NavMiddleSection = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    margin-left: 15%;
    `
const NavRightSection = styled.li`
    height: 100%;
    width: 25%;
    `
const NavRightSectionElements = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100%;
    margin-right: 10px;
    & > li {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 7.5vw;
    }
    & > :not(:last-child) {
        margin-right: 10px;
    }
    & > li > * {
        font-size: clamp(0.1em, 5vw, 36px);
    }
    `
const NavHeaderText = styled.h1`
    font-family: 'Graffiti';
    font-size: clamp(0.1em, 7.5vw, 3em);
    font-weight: normal;
    width: 100%;
    text-align: center;
    `

export const Nav = () => {
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
