import { IoIosMenu } from "react-icons/io"
import { CgProfile } from "react-icons/cg";
import { IoTicketSharp } from "react-icons/io5";
import styled from "styled-components"
import HeaderImage from '/nav-header.png'

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
const NavMiddleSection = styled.li``
const NavHeaderImage = styled.img`
    max-width: 75%;
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

export const Nav = () => {
    return (
        <nav>
            <NavList>
                <NavLeftSection><NavMobileMenu /></NavLeftSection>
                <NavMiddleSection><NavHeaderImage src={HeaderImage} /></NavMiddleSection>
                <NavRightSection>
                    <NavRightSectionElements>
                        <li><CgProfile /></li>
                        <li><IoTicketSharp /></li>
                    </NavRightSectionElements>
                </NavRightSection>
            </NavList>
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