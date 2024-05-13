import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface StoreState {
  departure: string;
  destination: string;
  departure_date: string;
  return_date: string;
  fair: string;
  card_holder_name: string;
  contact_phone: string;
  contact_email: string;
  reservation_code: string;
  card_number: string;
  cvv: string;
  expiration: string;
  authorized_amount: number;
  billing_address: string;
  apt_unit: string;
  city: string;
  country: string;
  state: string;
  zip_code: string;
  customer_id: string;
  payment_method: string;
  Username?: string;
  Signature?: string | undefined;
  signatureText?: string | undefined;
  checked: boolean;
}
const initialStore: StoreState = {
  departure: "",
  destination: "",
  departure_date: "",
  return_date: "",
  expiration: "",
  fair: "",
  Username: "",
  card_holder_name: "",
  contact_phone: "",
  contact_email: "",
  reservation_code: "",
  card_number: "",
  cvv: "",
  authorized_amount: 0,
  billing_address: "",
  apt_unit: "",
  city: "",
  country: "",
  state: "",
  zip_code: "",
  customer_id: "",
  payment_method: "Credit/Debit",
  Signature: "",
  signatureText: "",
  checked: false,
};

const userStore = (set: (fn: (state: StoreState) => StoreState) => void) => ({
  ...initialStore,
  updateBookingInfoStore: (data: Partial<StoreState>) =>
    set((state) => ({ ...state, ...data })),
});
const useBookingInfo = create(
  persist(userStore, {
    name: "BookingInfo",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useBookingInfo;
