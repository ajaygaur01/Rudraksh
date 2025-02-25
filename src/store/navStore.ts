import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";


interface NavState {
    isClosed: boolean;
    toggleNav: () => void;
}

const navStore = (set: (fn: (state: NavState) => NavState) => void): NavState => ({
    isClosed: false,
    toggleNav: () => set((state) => ({ ...state, isClosed: !state.isClosed })),
});


const useNavStore = create(persist(devtools(navStore), {name: "navStore"}));

export default useNavStore;