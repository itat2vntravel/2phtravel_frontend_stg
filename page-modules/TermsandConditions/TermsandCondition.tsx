import { Card } from "@mui/material";
import Styles from "./terms.module.css";

const TermsandCondition = () => {
  return (
    <>
      <div className="h-auto bg-cover bg-center relative">
        <div
          className="absolute inset-0 bg-black "
          style={{
            backgroundImage: `url(${"/about/terms.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex h-[350px] items-center justify-center ">
          <h1 className="mb-4 text-3xl text-white z-10">
            Terms and conditions
          </h1>
        </div>
      </div>
      <div className="bg-[#f3f3f3]">
        <div className={`container mx-auto ${Styles.paddingcontainer} `}>
          <div className="m-3 md:m-6">
            <Card className={`${Styles.cardShadow} p-5`}>
              <div>
                <h1 className="flex justify-center mb-4">
                  Terms and Conditions
                </h1>
                <p>
                  These Terms and Conditions (&quot;Terms&quot;, &quot;Terms and
                  Conditions&quot;) govern your relationship with{" "}
                  <a href="www.2phtravel.com" className="text-customBlue">
                    www.2phtravel.com
                  </a>{" "}
                  website (the &quot;Service&quot;) operated by 2PH Travel Inc,
                  (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                </p>
                <br></br>
                <p>
                  Please read these Terms and Conditions carefully before using
                  the Service.
                </p>
                <br></br>
                <p>
                  Your access to and use of the Service is conditioned on your
                  acceptance of and compliance with these Terms. These Terms
                  apply to all visitors, users and others who access or use the
                  Service.
                </p>
                <br></br>

                <p>
                  By accessing or using the Service you agree to be bound by
                  these Terms. If you disagree with any part of the terms then
                  you may not access the Service.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Purchases</h1>
                <p>
                  If you wish to purchase any product or service made available
                  through the Service (&quot;Purchase&quot;), you may be asked
                  to supply certain information relevant to your Purchase
                  including, without limitation, your credit card number, the
                  expiration date of your credit card, your billing address, and
                  your shipping information.
                </p>
                <br></br>
                <p>
                  You represent and warrant that: (i) you have the legal right
                  to use any credit card(s) or other payment method(s) in
                  connection with any Purchase; and that (ii) the information
                  you supply to us is true, correct and complete.
                </p>
                <br></br>
                <p>
                  By submitting such information, you grant us the right to
                  provide the information to third parties for purposes of
                  facilitating the completion of Purchases.
                </p>
                <br></br>

                <p>
                  We reserve the right to refuse or cancel your order at any
                  time for certain reasons including but not limited to: product
                  or service availability, errors in the description or price of
                  the product or service, error in your order or other reasons.
                </p>
                <br></br>
                <p>
                  We reserve the right to refuse or cancel your order if fraud
                  or an unauthorised or illegal transaction is suspected.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Credit Card Booking and Disputes
                </h1>
                <p>
                  Your authorization to use your client&apos;s Credit Card
                  number for deposits and/or final payment indicates your
                  acceptance of our booking terms and conditions, whether or not
                  your clients have actually signed the appropriate draft. The
                  credit card used must belong to one of the passengers in the
                  reservation.
                </p>
                <br></br>
                <p>
                  Third party Credit Cards horders must acknowledge the purchase
                  using credit card even they are not a travelling party of the
                  booking reference. To prove ownership of the mentioned credit
                  card above, 2PH Travel require a copy of clients valid
                  government ID/Driver license for identification purposes.
                </p>
                <br></br>
                <p>
                  If the customer attempts a chargeback on a non-refundable
                  airline ticket, service fee, or an airfare balance that meets
                  the terms and conditions of this agreement; the customer
                  agrees to refund the full amount of the chargeback with a $100
                  penalty for the inconvenience and accounting costs.
                </p>
                <br></br>

                <p>
                  In cases of fraudulent chargeback, the customer will be
                  responsible for the cost required to initiate legal
                  proceedings in order to recoup the potential loss. In the
                  event of a court finding in favor of our agency, the customer
                  shall not resist or unnecessarily delay payment of any
                  judgment produced. If payment is nonetheless failed as
                  prescribed by the Court, the customer shall not resist
                  garnishing of his/her wages.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Tickets</h1>
                <p>
                  Tickets will be issued in accordance with the rules
                  established by the airlines and indicated in the fare rules.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Prices</h1>
                <p>
                  All prices quoted are in USA funds and are subject to change
                  without notice. Payment: Before final payment is made you will
                  receive a final invoice duly updated to reflect any currency
                  fluctuations. Prices are not locked in until full payment has
                  been made.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Flight Schdules</h1>
                <p>
                  Schedules are subject to change without notice. It means,
                  therefore, the responsibility of passengers to reconfirm
                  flight times as instructed. We assume no responsibility to the
                  passenger for any loss, delay, or other inconveniences
                  incurred in connection with any flights. All passengers must
                  arrive at the airport a minimum of two hours prior to the
                  indicated departure time.
                </p>
              </div>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-5`}>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Prices</h1>
                <p>
                  We quote prices in US currency. Our displayed Air Fares are
                  subject to seat availablity. All prices are per person,
                  include all taxes and fees.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Luggage and Baggage
                </h1>
                <p>
                  If your luggage is lost or damaged in transit, airlines will
                  not pay for any of this type of loss. Airlines will also be
                  responsible for that luggage which is kept with them under
                  international conventions and not any other type of luggage
                  loss will be entertained by airlines. If you find your luggage
                  lost then you must submit a declaration form (including the
                  originals of travel ticket, check-in slip of luggage) of your
                  damage and loss to the respected airlines but all this needs
                  to be done before leaving the airport.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Insurance</h1>
                <p>
                  We suggest you to purchase some insurance like travel,
                  cancellations, medical emergency or lost luggage for every
                  trip. We refer you to respected insurance company and it is
                  your responsibility to clearly understand the limitations and
                  coverage of the insurance. We don’t have responsible for any
                  losses.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Travel Risks, Passports, Visas and Health Needs
                </h1>
                <p>
                  Before travelling, you should check all the necessary
                  documents required like visa, passport or any other things. If
                  you are travelling outside the country, you must have your
                  valid passport, visa, certificates and permits if any and
                  medical certificates with you.
                </p>
                <br></br>
                <p>
                  All passengers traveling abroad require a passport, valid for
                  6 months beyond the conclusion of their trip, and with
                  appropriate visas. Multiple-entry visas are required for some
                  countries. It is responsibility of each passenger to have a
                  valid a valid passport and necessary visas, as well as to
                  comply with entry, health or other requirements of the
                  countries visiting. The operator and/or its agents are not
                  responsible for passport, visas requirements, entry, health or
                  other requirement of the countries visited or for any loss
                  sustained by passengers for failing to comply with laws,
                  regulations, order and/or requirements of countries visited.
                </p>
              </div>

              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  TourResponsibility
                </h1>
                <ol
                  style={{ listStyle: "number", marginLeft: "15px" }}
                  className="mt-2"
                >
                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    We constantly striveto improve tour itineraries and
                    features. If such improvements can be made or unforeseen
                    circumstances which is beyond our control, Wereserved the
                    right to make changes, such as to vary itineraries, to
                    substitute hotels, to cancel or re-schedule tour departure
                    as deemed to be appropriate. Furthermore tour price will be
                    adjusted according to the extension or abridgement of travel
                    period. Passengers shall not use this as an excuse for an
                    objection.
                  </li>

                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    All baggage and personal belongings are at all times at the
                    passenger&apos;s own risk. The carriers, hotel and other
                    suppliers who provide services on tour are independent
                    contractors; as such, their security policies will be
                    respected. We will not be liable for any damages or injuries
                    claimed.
                  </li>
                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    We shall be responsible to the passenger for supplying the
                    service and accommodations described in this brochure,
                    except where such services cannot be supplied or the
                    itinerary used is changed due to delays or other causes of
                    whatever kind or nature beyond the control of us. In such
                    instances, wewill do its best to supply comparable services,
                    accommodations and itineraries and there should be no refund
                    in this connection.
                  </li>
                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    Passengers are responsible to observe the laws, regulations,
                    orders and/or requirements of countries visited. We assume
                    no responsibility for any passenger rejected to enter the
                    countries visited. In such circumstances, there shall be no
                    refund for the unused portion of tour.
                  </li>
                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    We reserve the right to refuse to carry anyone whose conduct
                    deemed incompatible with the interests of the tour group.
                    Accordingly, we are not responsible for passenger&apos;s
                    conduct after the completion of the tours. Should any
                    passenger be asked to leave the tour, the balance of the
                    tour fee will not be refunded.
                  </li>
                  <li
                    style={{ listStyle: "number", marginLeft: "18px" }}
                    className="mt-2"
                  >
                    The right is reserved to make appropriate changes as
                    required and the final schedules, which remain subject to
                    last minute changes, will be made available upon your
                    arrival.
                  </li>
                </ol>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Availability, Errors and Inaccuracies
                </h1>
                <p>
                  We are constantly updating our offerings of products and
                  services on the Service. The products or services available on
                  our Service may be mispriced, described inaccurately, or
                  unavailable, and we may experience delays in updating
                  information on the Service and in our advertising on other web
                  sites.
                </p>
                <p>
                  We cannot and do not guarantee the accuracy or completeness of
                  any information, including prices, product images,
                  specifications, availability, and services. We reserve the
                  right to change or update information and to correct errors,
                  inaccuracies, or omissions at any time without prior notice.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Contests, Sweepstakes and Promotions
                </h1>
                <p>
                  Any contests, sweepstakes or other promotions (collectively,
                  &quot;Promotions&quot;) made available through the Service may
                  be governed by rules that are separate from these Terms. If
                  you participate in any Promotions, please review the
                  applicable rules as well as our Privacy Policy. If the rules
                  for a Promotion conflict with these Terms, the Promotion rules
                  will apply.
                </p>
              </div>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-5`}>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Accounts</h1>
                <p>
                  When you create an account with us, you must provide us
                  information that is accurate, complete, and current at all
                  times. Failure to do so constitutes a breach of the Terms,
                  which may result in immediate termination of your account on
                  our Service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use
                  to access the Service and for any activities or actions under
                  your password, whether your password is with our Service or a
                  third-party service.
                </p>
                <p>
                  You agree not to disclose your password to any third party.
                  You must notify us immediately upon becoming aware of any
                  breach of security or unauthorized use of your account.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Intellectual Property
                </h1>
                <p>
                  The Service and its original content, features and
                  functionality are and will remain the exclusive property of
                  2PH Travel, and its licensors. The Service is protected by
                  copyright, trademark, and other laws of both the United States
                  and foreign countries. Our trademarks and trade dress may not
                  be used in connection with any product or service without the
                  prior written consent of 2PH Travel
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">
                  Links To Other Web Sites
                </h1>
                <p>
                  Our Service may contain links to third-party web sites or
                  services that are not owned or controlled by 2PH Travel,
                </p>
                <p>
                  2PH Travel, has no control over, and assumes no responsibility
                  for, the content, privacy policies, or practices of any third
                  parties web sites or services. You further acknowledge and
                  agree that 2PH Travel Inc, shall not be responsible or liable,
                  directly or indirectly, for any damage or loss caused or
                  alleged to be caused by or in connection with use of or
                  reliance on any such content, goods or services available on
                  or through any such web sites or services.
                </p>
                <p>
                  We strongly advise you to read the terms and conditions and
                  privacy policies of any third-party web sites or services that
                  you visit.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Termination</h1>
                <p>
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the Service.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Governing Law</h1>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of United States, without regard to its conflict of
                  law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights. If any
                  provision of these Terms is held to be invalid or
                  unenforceable by a court, the remaining provisions of these
                  Terms will remain in effect. These Terms constitute the entire
                  agreement between us regarding our Service, and supersede and
                  replace any prior agreements we might have between us
                  regarding the Service.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Changes</h1>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will try to provide at least 30 days notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those
                  revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, please
                  stop using the Service.
                </p>
              </div>
              <div>
                <h1 className=" mb-4 mt-4 text-customBlue">Contact Us</h1>
                <p>
                  If you have any questions about these Terms, <br></br>please
                  contact our Customer Service at{" "}
                  <a
                    href={`tel:855-767-7778}`}
                    className="lg:text-[16px] text-[13px] text-customBlue"
                  >
                    +1 855-767-7778
                  </a>{" "}
                  or via email:{" "}
                  <a
                    href={`mailto:support@2phtravel.com`}
                    className="lg:text-[16px] text-[13px] text-customBlue"
                  >
                    support@2phtravel.com
                  </a>
                  .
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsandCondition;
