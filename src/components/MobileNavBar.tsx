import styled, { keyframes, css } from "styled-components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { setMobileBarState } from "../features/NavBarSlice";
import { NavPages } from "./NavPages";
import device from '../config/device-sizes.json';

interface MobileNavBarContainerProps {
    animationType: 'SlideIn' | 'SlideOut' | null;
}

const SlideIn = keyframes`
    from {
        transform: translateX(-80vw);
    }

    to {
        transform: translateX(0);
    }
    `
const SlideOut = keyframes`
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-80vw);
    }
    `
const MobileNavBarContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => 
      !['animationType'].includes(prop),
  })<MobileNavBarContainerProps>`
    min-height: 100vh;
    top: 0;
    left: 0;    
    position: absolute;
    z-index: 1;
    display: flex;
    width: 80vw;
    height: 100vh;
    background-color: #1f1f1f;
    color: #ffffff;
    transform: translateX(-80vw);
    animation: ${props => {
        switch(props.animationType) {
            case 'SlideIn':
              return css`${SlideIn} 0.5s forwards`;
            case 'SlideOut':
              return css`${SlideOut} 0.5s forwards`;
            default:
              return 'none';
        }
      }};
    @media ${device.tablet.portrait.mediaQuery} {
        width: 50vw;
    };
    @media ${device.mobile.landscape.mediaQuery}, ${device.tablet.landscape.mediaQuery} {
        width: 30vw;
    }
    `
const ClickToExitSection = styled.div.withConfig({
    shouldForwardProp: (prop) => 
      !['animationType'].includes(prop),
  })<MobileNavBarContainerProps>`
    position: absolute;
    top: 0;
    left: 80vw;
    z-index: 2;
    height: 100vh;
    width: 20vw;
    display: ${props => {
        switch(props.animationType) {
            case 'SlideIn':
              return 'block';
            case 'SlideOut':
              return 'none';
            default:
              return 'none';
        }
    }};
    @media ${device.tablet.portrait.mediaQuery} {
        left: 50vw;
        width: 50vw;
    };
    @media ${device.mobile.landscape.mediaQuery}, ${device.tablet.landscape.mediaQuery} {
        left: 30vw;
        width: 70vw;
    }
    `
const MobileNavPageStyles = {
    MainList: `
        width: 100%;
        margin: 15px 25px;
        line-height: 300%;
        font-size: 1em;
        text-align: left;
        `,
    NavPage: `
        letter-spacing: 1px;
        line-height: 3em;
        `,
    DividerMobileOnly: `
        opacity: 1;
        `,
    NavPageContainer: `
        height: 90%;
        list-style: none;
        `
}

export const MobileNavBar = () => {
    const dispatch = useAppDispatch();
    const onFirstLoad = useSelector((state: RootState) => state.nav.notYetLoaded);
    const nowOpen = useSelector((state: RootState) => state.nav.mobileBarIsOpen);

    const determineAnimation = (): 'SlideIn' | 'SlideOut' | null => {
        if (onFirstLoad) {
            return null;
        } else if (nowOpen) {
            return "SlideOut"
        } else if (!nowOpen) {
            return "SlideIn"
        }
        return null;
    }
    const animationType = determineAnimation();

    const clickToExit = () => {
        dispatch(setMobileBarState());
    }

    return (
        <>
            <MobileNavBarContainer animationType={animationType}>
                <NavPages styleFromParent={MobileNavPageStyles} />
            </MobileNavBarContainer>
            <ClickToExitSection onClick={clickToExit} animationType={animationType}></ClickToExitSection>
        </>
    )
}