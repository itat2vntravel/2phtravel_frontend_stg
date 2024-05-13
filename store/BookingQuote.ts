
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



interface StoreState {
    departure: string,
    destination: string,
    departure_date: string,
    return_date: string,
    expiration: string,
    fair: string,
    userId: string,
    trip_info: any
}
const initialStore: StoreState = {
    departure: "",
    destination: "",
    departure_date: "",
    return_date: "",
    expiration: "",
    fair: "",
    userId: "",
    trip_info: []
}

const userStore = (set: (fn: (state: StoreState) => StoreState) => void) => ({
    ...initialStore,
    updateBookingStore: (data: Partial<StoreState>) => set((state) => ({ ...state, ...data })),
});
const useBookingQuote = create(
    persist(userStore, {
        name: "BookingQuote",
        storage: createJSONStorage(() => sessionStorage),
    })
)

export default useBookingQuote
