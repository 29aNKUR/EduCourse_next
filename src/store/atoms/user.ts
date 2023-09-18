import {atom} from "recoil";

export const userState = atom<{isLoading: boolean , userEmail : null | string}>({
    key:'userState',
    default:{
        isLoading: true,
        userEmail: null
    }
})