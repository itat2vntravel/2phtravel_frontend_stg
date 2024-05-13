import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Paymentguide from "@/page-modules/PaymentGuide/paymentguide";
import { cookies } from "next/headers";

export interface PaymentSearchParams {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Understanding How Payments Work",
  description:
    "We strive to provide a transparent and convenient payment experience for our customers.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "Philippines plane tickets",
    "plane ticket to Philippines",
    "plane tickets to Philippines",
  ],
};

const PaymentGuide: React.FC<PaymentSearchParams> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <Paymentguide />

      <Footer />
    </>
  );
};

export default PaymentGuide;
