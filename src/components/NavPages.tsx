import { useEffect } from "react";
import { NavPagesObject } from "../services/get-nav-pages"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNavPages } from "../features/NavBarSlice";
import styled from "styled-components";

interface NavPageStyles {
    MainList: string,
    NavPage: string,
    Divider?: string,
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

export const NavPages= ({ styleFromParent, isDesktop }: { styleFromParent: NavPageStyles, isDesktop: boolean }) => {
    const pages = useSelector((state: RootState) => state.nav.navPages);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchNavPages());
    }, [dispatch])

    return (
        <MainList customStyle={styleFromParent.MainList}>
            {pages ? pages.navPages.map((page, index) => (
                <>
                    <NavPage customStyle={styleFromParent.NavPage} key={index}>{page.name}</NavPage>
                    {isDesktop ? null : <Divider customStyle={styleFromParent?.Divider}></Divider>}
                </>
            )) : null}
        </MainList>
    )
}