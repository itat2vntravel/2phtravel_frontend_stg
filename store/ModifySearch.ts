
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
    departure: string,
    destination: string,
    departure_date: string,
    return_date: string,
    Passenger: {
        adults: number,
        Children: number,
        Infants: number
    },
    cabinclass: string,
    type: string,
    trips: string,
    departureTime?: string,
    modifyStatus: boolean,
}
const initialStore: StoreState = {
    departure: "",
    destination: "",
    departure_date: "",
    return_date: "",
    Passenger: {
        adults: 1,
        Children: 0,
        Infants: 0
    },
    cabinclass: "",
    type: "",
    trips: "",
    departureTime: "",
    modifyStatus: false,
}

const userStore = (set: (fn: (state: StoreState) => StoreState) => void) => ({
    ...initialStore,
    ModifySearchStore: (data: Partial<StoreState>) => set((state) => ({ ...state, ...data })),
});
const useModifySearch = create(
    persist(userStore, {
        name: "ModifySearch",
        storage: createJSONStorage(() => sessionStorage),
    })
)

export default useModifySearch
