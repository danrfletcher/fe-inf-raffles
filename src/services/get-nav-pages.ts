import pages from '../config/nav-pages.json'

interface NavPage {
    name: string;
    path: string;
    children: NavSubpage[];
}

interface NavSubpage {
    name: string;
    path: string;
}

export interface NavPagesObject {
    navPages: NavPage[];
}

export const getNavPages = async (): Promise<NavPagesObject> => {
    return pages;
}