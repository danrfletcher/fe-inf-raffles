import { useEffect } from "react";
import { NavPagesObject } from "../services/get-nav-pages"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNavPages, setMobileBarState } from "../features/NavBarSlice";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";

interface NavPageStyles {
    MainList: string,
    NavPage: string,
    Divider?: string,
    NavPageContainer: string,
}

interface NavPageItemProps {
    customStyle?: string,
}

const MainList = styled.ul.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `
const NavPage = styled.li.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `
const Divider = styled.hr.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `
const MobileCloseIcon = styled(RxCross1)`
    font-size: 1.5em;
    `
const MobileNavFooter = styled.div`
  margin-top: 10px;
    width: 100%;
    height: 10%;
    bottom: 0;
    & * {
        font-family: Roboto, sand-serif;
        color: grey;
        line-height: 1.5em;
    }
    `
const NavPageContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `

export const NavPages= ({ styleFromParent, isDesktop }: { styleFromParent: NavPageStyles, isDesktop: boolean }) => {
    const pages = useSelector((state: RootState) => state.nav.navPages);
    const dispatchAsync = useDispatch<AppDispatch>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatchAsync(fetchNavPages());
    }, [dispatchAsync])

    const handleMenuClose = () => {
        dispatch(setMobileBarState());
    }

    return (
        <MainList customStyle={styleFromParent.MainList}>
            <NavPageContainer customStyle={styleFromParent.NavPageContainer}>
                {isDesktop ? null : <MobileCloseIcon onClick={handleMenuClose} />}
                {pages ? pages.navPages.map((page, index) => (
                    <NavPage customStyle={styleFromParent.NavPage} key={index}>{page.name}</NavPage>
                )) : null}
            </NavPageContainer>
            {isDesktop ? null : (
                <>
                    <Divider customStyle={styleFromParent?.Divider}></Divider>
                    <MobileNavFooter>
                        <p>© Scottyfairno 2024</p>
                    </MobileNavFooter>
                </>
            )}
        </MainList>
    )
}