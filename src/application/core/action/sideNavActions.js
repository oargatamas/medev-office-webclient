export const OPEN_SIDE_DRAWER = "open-side-drawer";
export const CLOSE_SIDE_DRAWER = "close-side-drawer";


export const openDrawerAction = () => {
    return {
        type : OPEN_SIDE_DRAWER
    }
};


export const closeDrawerAction = () => {
    return {
        type : CLOSE_SIDE_DRAWER
    }
};