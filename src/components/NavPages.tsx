import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNavPages, setMobileBarState } from "../features/NavBarSlice";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";

interface NavPageStyles {
    MainList: string,
    NavPage: string,
    DividerMobileOnly?: string,
    NavPageContainer: string,
}

interface NavPageItemProps {
    customStyle?: string,
}

const MainList = styled.div.withConfig({
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
const DividerMobileOnly = styled.hr.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `
const CloseIconMobileOnly = styled(RxCross1)`
    font-size: 1.5em;
    `
const NavFooterMobileOnly = styled.div`
  margin-top: 10px;
    width: 100%;
    height: 10%;
    bottom: 0;
    & * {
        font-family: var(--primary-font);
        color: grey;
        line-height: 1.5em;
    }
    `
const NavPageContainer = styled.ul.withConfig({
    shouldForwardProp: (prop) => 
      !['customStyle'].includes(prop),
  })<NavPageItemProps>`
    ${props => props.customStyle || ''}
    `

export const NavPages= ({ styleFromParent}: { styleFromParent: NavPageStyles}) => {
    const isDesktop = useSelector((state: RootState) => state.device.isDesktop);
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
                {isDesktop ? null : (
                    <li key="close-icon">
                        <CloseIconMobileOnly onClick={handleMenuClose} />
                    </li>
                )}
                {pages ? pages.navPages.map((page, index) => (
                    <NavPage customStyle={styleFromParent.NavPage} key={index}>{page.name}</NavPage>
                )) : null}
            </NavPageContainer>
            {isDesktop ? null : (
                <>
                    <DividerMobileOnly customStyle={styleFromParent?.DividerMobileOnly}></DividerMobileOnly>
                    <NavFooterMobileOnly>
                        <p>© Scottyfairno 2024</p>
                    </NavFooterMobileOnly>
                </>
            )}
        </MainList>
    )
}