import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  booking_id: number;
  booking_code: string;
  status: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  return_date: string;
  trip_info: any;
  passenger: any;
  card: any;
  created_at: string;
  page: string;
  trip_type: string;
  airline_name: string;
  payment_type: string;
}
const initialStore: StoreState = {
  booking_id: 0,
  booking_code: "",
  status: "",
  contact_email: "",
  contact_name: "",
  contact_phone: "",
  from_location: "",
  to_location: "",
  departure_date: "",
  return_date: "",
  trip_info: [],
  created_at: "",
  page: "",
  trip_type: "",
  airline_name: "",
  card: [],
  passenger: [],
  payment_type: "",
};

const userStore = (set: (fn: (state: StoreState) => StoreState) => void) => ({
  ...initialStore,
  UserBookingData: (data: Partial<StoreState>) =>
    set((state) => ({ ...state, ...data })),
});
const useUserBookingData = create(
  persist(userStore, {
    name: "UserBookingDetails",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useUserBookingData;
