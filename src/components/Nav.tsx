import { IoIosMenu } from "react-icons/io"
import styled from "styled-components"

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 7.5vh;
    & > li {
        width: 33.3%;
        color: white;
    }
    `
const NavMobileMenu = styled(IoIosMenu)`
    font-size: 4em;
    `
const NavLeftSection = styled.li`

    `

export const Nav = () => {
    return (
        <nav>
            <NavList>
                <NavLeftSection><NavMobileMenu /></NavLeftSection>
                <li>Hi</li>
                <li>Hi</li>
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