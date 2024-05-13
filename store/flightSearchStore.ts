import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  publishedBaseFare: string;
  key: string;
  mainAirlineCode: string;
  totalPrice: string;
  adultBasePrice: string;
  adultTax: string;
  childBasePrice: string;
  childTax: string;
  lastTicketDate: string;
  domesticTicket: boolean;
  duration: string;
  tripTime: number | null;
  layover: boolean;
  operatedBy: boolean;
  overnightFlight: boolean;
  overnightStay: boolean;
  publishFare: boolean;
  maxSeats: number | null;
  studentTicket: boolean;
  youthTicket: boolean;
  suitAge: string;
  majorAirline: boolean;
  gds: string | null;
  privateFareType: string;
  commRate: string;
  pcc: string;
  fareCode: string;
  supportCCPayment: boolean;
  upsell: boolean;
  brand: any;
  rules: any;
  bundleFares: any;
  sessionID: string;
  traceId: string;
  isSearchByRouting: boolean;
  offerExpiration: number;
  trips: any[];
  airlineCodesArry: any[];
  filterairlineCodesArry: any[];
  PassengerList: any[];
}
const initialStore: StoreState = {
  publishedBaseFare: "",
  key: "",
  mainAirlineCode: "",
  totalPrice: "",
  adultBasePrice: "",
  adultTax: "",
  childBasePrice: "",
  childTax: "",
  lastTicketDate: "",
  domesticTicket: false,
  duration: "",
  tripTime: null,
  layover: true,
  operatedBy: false,
  overnightFlight: true,
  overnightStay: false,
  publishFare: false,
  maxSeats: null,
  studentTicket: false,
  youthTicket: false,
  suitAge: "",
  majorAirline: false,
  gds: null,
  privateFareType: "",
  commRate: "",
  pcc: "",
  fareCode: "",
  supportCCPayment: true,
  upsell: false,
  brand: null,
  rules: {},
  bundleFares: null,
  sessionID: "",
  traceId: "",
  isSearchByRouting: false,
  offerExpiration: 0,
  trips: [],
  airlineCodesArry: [],
  filterairlineCodesArry: [],
  PassengerList: []
};

const userStore = (set: (fn: (state: StoreState) => StoreState) => void) => ({
  ...initialStore,
  updateUserStore: (data: Partial<StoreState>) =>
    set((state) => ({ ...state, ...data })),
});
const useSearchFlight = create(
  persist(userStore, {
    name: "FlightSearchResults",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useSearchFlight;
