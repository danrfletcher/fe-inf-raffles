import styled from "styled-components"

const MobileNavBarContainer = styled.div`
    width: 80vw;
    height: 100vh;
    background-color: black;
    `

export const MobileNavBar = () => {
    return (
        <MobileNavBarContainer>This is the mobile nav bar</MobileNavBarContainer>
    )
}