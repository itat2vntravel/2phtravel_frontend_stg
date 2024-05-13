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
            {/* <Card className={`${Styles.cardShadow} p-5`}>
              <h1 className="flex justify-center">
                General Terms and Conditions
              </h1>
              <p>
                This page contains important information that you need to be
                aware of prior to using 2PH TRAVEL services. Please read these
                Terms and Conditions carefully before using this website. If you
                continue to browse and use this website, you are agreeing to
                comply with and be bound by the following terms and conditions
                of use.
              </p>
              <div>
                <h4 className="mt-2">
                  <b>Travel Documentation</b>
                </h4>
                <br></br>
                <p>
                  Different situations require different documents. Please
                  become familiar with the specific document requirements for
                  the country(s) you are visiting. All passengers traveling
                  outside of the US are required to have certain travel
                  documents: a valid passport in the same name as the airline
                  ticket, and either a round-trip airline ticket or proof of
                  onward travel. Additionally, many nations require a visa
                  issued by the destination country, medical inoculations for
                  infected areas/countries, and/or proof of sufficient funds
                  when entering the destination country. Some countries have a
                  departure tax payable at the airport before departing the
                  country. Contact the destination country&rsquo;s consulate or
                  equivalent sources for these rules prior to buying airline
                  tickets
                  <br></br> <br></br> Passengers are advised to keep proper
                  documentation on their person during travel. It is the
                  passenger&rsquo;s responsibility to ensure they have the
                  correct documents needed for travel to or from any
                  international destination. Should documentation not be
                  adequate or sufficient, passengers will not be boarded.
                </p>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>BOOKING REQUIREMENTS</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    A valid phone number and email address are required to
                    secure your booking. This agency is not responsible for any
                    delays or inconveniences precipitated in part by the
                    customer&apos;s failure
                  </li>
                  <li>
                    The name on each airline ticket must match a valid photo ID
                    shown at the airport.
                  </li>
                  <li>
                    Passengers are responsible for ensuring the accuracy of the
                    information on their travel booking transactions. allows
                    changes free of charge if notified by the passengers within
                    24 hours of booking. Any changes made after 24 hours will be
                    subjected to penalty fee(s).
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>SALES</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    Airline fares are not guaranteed until tickets are issued
                    correctly within the airlines&apos; guidelines, credit card
                    successfully charged, and route/fare validity
                    double-checked.
                  </li>
                  <li>
                    In some cases, airlines will allow a change of travel dates
                    for a fee and a charge for any difference in fare under
                    stringent conditions
                  </li>
                  <li>
                    Name changes are not permitted once a reservation has been
                    confirmed. For international flights, first and last names
                    on a ticket must match the passenger&rsquo;s passport. For
                    domestic flights, the names need only match a
                    government-issued photo ID.
                  </li>
                  <li>
                    Young Passengers - unaccompanied minor(s) or any child
                    traveling with one parent or someone who is not a parent or
                    legal guardian or a group from two (2) years of age but
                    under eighteen (18) must call 2PH TRAVEL Reservations at
                    855-767-7778. Proper documents and requirements are needed.
                  </li>
                  <li>
                    Expectant Mothers - women who are pregnant for 24 weeks or
                    longer must call 2PH TRAVEL Reservations at 855-767-7778to
                    make a reservation. Medical certificates and other important
                    requirements are needed.
                  </li>
                  <li>
                    Medical Clearance Required - for the safety and convenience
                    of the passenger and to avoid hazard to the safety of the
                    flight persons who are: suffering from medical conditions
                    such as contagious diseases or life threatening illness, and
                    persons whose mental or physical condition is such as to
                    involve hazard to himself/herself or to the safety of the
                    flight, such as pregnant women, are required to disclose
                    such condition for proper medical clearance and must call
                    2PH TRAVEL Reservations at 855-767-7778.
                  </li>
                  <li>
                    The customer agrees he or she has reviewed the itinerary
                    displayed on the bookable page (credit card page) for
                    accuracy of dates, times, and correct airports while noting
                    any airport transfers, long layovers, stops, or overnight
                    stays.
                  </li>
                  <li>
                    If the site fails to show a confirmation screen when you
                    attempt a travel booking, it will be unknown if the error
                    occurred on the user&apos;s own computer or server.
                    Therefore, it is the customer&apos;s responsibility to
                    contact our agency to ascertain whether the booking is
                    confirmed
                  </li>
                  <li>
                    If the customer makes a mistake in the process of travel
                    booking, he or she should not make a second booking until
                    inquiring with our support department about the status of
                    the first one
                  </li>
                  <li>
                    For flights to Africa, we likely will contact the customer
                    to request a fax authorization form and photocopy of a
                    government-issued ID before ticketing. If the customer does
                    not wish to fax a photo ID, we can suggest an alternative
                    item to fax. This is for protection against identity theft
                    for the credit card holder.
                  </li>
                </ul>
              </div>

              <br></br>
              <div>
                <h4>
                  <b>PROCESSING</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>Electronic tickets will be issued within 24 hours.</li>
                  <li>
                    Meal and seat preferences will be sent to the airline, but
                    cannot be guaranteed. Seats for all passengers will be
                    selected automatically based on the best seats available and
                    adjacent to the primary passenger, if possible.
                  </li>
                </ul>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4>
                  <b>TAXES, CHARGES, AND FEES</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    They charge non-refundable service fee(s) for certain
                    products and services such as airline tickets, seat
                    assignments, hotel bookings, vacation packages, and land
                    transfers.
                  </li>
                  <li>
                    For many airline fares, your total price may be split into
                    two or more charges between Airline’s name and Travelfast
                    Int’l. It will appear in your credit card statement.
                    Sometimes there is a separate charge by an airline for each
                    passenger. You may also see charges split into a part called
                    &quot;airfare balance,&quot; &quot;service fee,&quot;
                    &quot;agent fee,&quot; &quot;travel service&quot; or
                    similar. For electronic tickets, your total charges always
                    will be what is reflected on your booking your reservation.
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>DEPARTURE INFORMATION</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    All passengers are strongly advised to reconfirm their
                    flights directly with the departing airline 24-48 hours
                    prior to departure due to possible airline schedule changes.
                  </li>
                  <li>
                    Contracts of Carriage: Making a purchase of any
                    airline&apos;s fare through any website constitutes
                    acceptance of the airline&apos;s Contract of Carriage. Each
                    airline&apos;s rules for boarding and carriage of passengers
                    are available via phone to the airline and often on their
                    website if you search &quot;contract of carriage&quot;.
                  </li>
                  <li>
                    Do not book a minor flying alone, age 16 or less, unless you
                    are willing to pay additional airline fees at the airport
                    and you are fully aware of what the particular
                    airline&apos;s rules are for a minor traveling alone. Some
                    airlines disallow solitary minors on particular flight
                    connections.
                  </li>
                  <li>
                    Passengers are advised to be fully checked in at airports a
                    minimum of two hours before departure on all domestic
                    flights and three hours for international flights. It is
                    advised to double-check these constraints with airport or
                    airline personnel with regard to your local airport.
                  </li>
                  <li>
                    Our agency is not liable for &quot;acts of God,&quot; e.g.
                    natural disasters, poor weather, aircraft equipment
                    failures, and world health or war/political problems, and
                    will not be liable for flight delays, forced cancelations or
                    overbooking done by the airline; airline schedule changes,
                    lost or damaged luggage, or fallout from the bankruptcy
                    status or liquidation of an airline. If flights are canceled
                    by the airline for one of the above reasons, service-related
                    fees will remain non-refundable but the airline may allow
                    refund of part or all of the base fare.
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Advertised Fare Guarantee</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>Electronic tickets will be issued within 24 hours.</li>
                  <li>
                    Advertised Fare Guarantee: All the fares advertised on this
                    website are guaranteed to be reasonably available within the
                    specified travel period in the fare restrictions. If the
                    fare is not available, 2PH TRAVEL will honor the advertised
                    fare and sell the fare at the advertised level.
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>General Rules and Conditions</b>
                </h4>
                <br></br>
                <p>
                  When you book services using our website, you authorize us to
                  act as your representative during the process of booking such
                  services from the selected Travel Supplier. By doing so you
                  also authorize us to make a payment for the above-mentioned
                  products/and/or services in your name and on your behalf, as
                  required. We shall issue the ticket and charge you,
                  accordingly, depending on which product you book. The amount
                  you are going to be charged will be displayed before your
                  booking is confirmed by you.
                  <br></br> <br></br> The Customer shall be obliged to deliver
                  all data that are complete and free of doubt, which is
                  necessary for booking. In case the information is inaccurate
                  or payment is processed with a credit card from a third
                  person, we may require additional verification.
                  <br></br> <br></br>
                  2PH TRAVEL is not responsible for the scheduled changes or
                  cancellations. Airlines are entitled to modify, cancel, or
                  reschedule the flights they process. If there are any issues
                  related to air tickets that have been contracted through our
                  services, do not hesitate to let us know about this. In our
                  turn, we guarantee you to resolve the situation as soon as
                  possible.
                </p>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Suppliers: Rules and Restrictions</b>
                </h4>
                <br></br>
                <p>
                  The terms and conditions set forth in this agreement extend to
                  all services provided by our company, including the services
                  you conclude through us from our partners.
                  <br></br> <br></br> Under these conditions, our company will
                  urge you to study in detail all the ones indicated in this
                  agreement, so that there will still be no differences between
                  the company and customers.
                  <br></br> <br></br>
                  Since you contract any of our company’s or of our partners’
                  services through our company, you automatically agree to all
                  fees charged for the contracted services, including those
                  additional that companies may require. We reserve the right to
                  cancel your booking if full payment is not received in a
                  timely fashion. Some airline or hotel suppliers may require
                  you to present a credit card or cash deposit upon check-in to
                  cover additional expenses incurred during your travel. Such a
                  deposit is unrelated to any payment received by 2PH TRAVEL for
                  your booking.<br></br>
                  <br></br>
                  We urge you to understand that any breach of the rules and
                  restrictions of the providers of such providers may result in
                  the cancelation of your reservation, the denial of access to
                  the applicable product or travel services, the loss of any
                  funds paid for such reservations, and/or the debit of your
                  account for any costs, we incur because of such an
                  infringement.
                </p>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Fraud Prevention Measures</b>
                </h4>
                <br></br>

                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    We know many of our customers have relatives and friends
                    abroad who may want to visit our customers in the US or even
                    relocate permanently. That is why we offer competitive
                    one-way and round-trip fares from a wide selection of
                    departure points abroad. Recently, some of our customers
                    have become victims of a scam.
                  </li>
                  <li>
                    Scammers are increasingly sophisticated, and it no longer
                    takes a &quot;fool&quot; to be a victim. Perpetrators of
                    fraudulent campaigns invest careful time with their victims,
                    setting up a relationship of trust, confidence and if
                    possible, even romantic involvement. Once a close
                    relationship is established, a request or plea for help is
                    usually made. Typically, a state of emergency is created and
                    our clients are asked for help with visa, airline ticket, a
                    large inheritance, or other legal problems.
                  </li>
                  <li>
                    It is possible to have a real, honest, and lasting
                    relationship with someone from abroad. Nevertheless, no
                    matter where you met and what the circumstances are, we
                    strongly encourage all our customers to be cautious when
                    purchasing tickets for individuals residing abroad. Due to
                    the extreme level of scam activity in some countries, we
                    strongly advise a background check.
                  </li>
                  <li>
                    International Travel Network LLC requires credit card
                    verifications for all third-party credit card transactions.
                    It protects us against daily fraud attempts. We are very
                    unhappy to learn about any fraud that affects our customers.
                    This is why we are sharing this recent experience with you -
                    our customers. We hope that this information is helpful and
                    wish your friends and relatives a safe flight and satisfying
                    stay in the US.
                  </li>
                </ul>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Billing Information</b>
                </h4>
                <br></br>
                <p>
                  Please note: The billing address must match exactly the
                  address on the credit card statement. Those customers who wish
                  to purchase tickets for relatives or friends will be contacted
                  by an ITN LLC billing support representative to initiate a
                  three-way call to authorize the purchase directly with the
                  issuing bank. Some credit and/or debit cards may have daily
                  limits; please ensure with your bank that you have sufficient
                  funds for the purchase of your ticket(s). The fares are not
                  guaranteed until the tickets are issued.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Itinerary Information</b>
                </h4>
                <br></br>
                <p>
                  The names of the passengers provided must match the names
                  shown on the passports. Once the tickets are issued, they are
                  non-transferable. Even a small mistake in the name can cause a
                  major inconvenience for the passengers during their travel.
                  Sometimes this mistake can even prevent the passengers from
                  using their tickets. Remember that many of the deeply
                  discounted fares are non-refundable.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Collecting personal data</b>
                </h4>
                <br></br>
                <p>
                  The TSA (TRANSPORTATION TEST SECURITY ADMINISTRATION) requires
                  us to transmit information collected from you. Providing this
                  information is mandatory. Issuing your tickets will not be
                  possible without this information. TSA may share information
                  you provide with law enforcement or intelligence agencies or
                  others under its records notice. For more on TSA privacy
                  policies or to view the records notice and the privacy impact
                  assessment, see TSA&apos;s website at TSA.gov.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Change Of Aircraft En Route</b>
                </h4>
                <br></br>
                <p>
                  Sometimes you must change aircraft en route even though your
                  ticket may show only one flight number and have only one
                  coupon for that flight. Further, in the case of some travel,
                  one of your flights may not be identified at the airport by
                  the number on your ticket, or it may be identified by other
                  flight numbers in addition to the one on your ticket. At your
                  request, the seller of this ticket will give you details of
                  your change of aircraft, such as where it will occur and what
                  aircraft types are involved.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Travel Documents</b>
                </h4>
                <br></br>
                <p>
                  Travel documents required for all tickets (paper, e-tickets,
                  or paperless) include a valid Passport, which must be
                  presented for all international flights. Some countries may
                  require a visa and/or health card. It is the passenger&apos;s
                  responsibility to have all necessary travel documents in
                  possession at check-in. The passengers shall verify the visa
                  requirements for all the stops as some of the countries may
                  require a transit visa. Those passengers transiting via or
                  connecting between the airports within the European Union -
                  Schengen Zone may need a Schengen Entry visa. Traveling on a
                  one-way ticket may be restricted. If you are traveling on a
                  one-way ticket, it is your responsibility to make sure you are
                  eligible. ITN LLC agents do not advise passengers on visa
                  requirements. Please contact the embassy of the country you
                  are going to visit or transit through to get the up-to-date
                  requirements.<br></br>
                  <br></br>
                  In addition, passport and visa information may be obtained by
                  contacting the Travel Advisory Section of the U.S. State
                  Department by visiting the State Department&apos;s Web site at
                  Travel.State.Gov. Non-U.S. passport holders should be sure to
                  contact the embassies of their destination and transit
                  countries to obtain entrance requirements. To obtain medical
                  information, you may contact the centres for Disease Control
                  by visiting the CDC&apos;s Web site at CDC.gov.
                </p>
              </div>
              <br></br>
              <div>
                <h4 className="mt-2">
                  <b>Disputes</b>
                </h4>
                <br></br>
                <p>
                  The dispute resolution methods arising from violations of our
                  website or the following agreement will be settled based on
                  Compulsory Arbitration by the US Arbitration Association. An
                  exception to the above is that you have the right to apply to
                  a competent territorial court, but since you resort to it, you
                  are waiving the right to address the US Arbitration
                  Association. By using our site or our service, you
                  automatically agree to the dispute resolution procedures
                  outlined above. From the moment you access our site or our
                  services, you automatically agree with all the indicated
                  arbitration. This Agreement, and any dispute between you and
                  the Company, shall be governed by the laws of the state of
                  Virginia without regard to principles of conflicts of law,
                  provided that this arbitration agreement shall be governed by
                  the Federal Arbitration Act. You can decline this agreement to
                  arbitrate by filling out an arbitration opt-out letter and
                  sending it to our email within 30 days of first accepting
                  these Terms.<br></br>
                  <br></br>
                  By accessing this website or by requesting our services, you
                  agree with the Terms and Conditions that we impose. We are not
                  responsible for the fact that you have not thoroughly studied
                  all that is stated in this agreement.
                  <br></br>
                  <br></br>
                  Under this agreement, the payment processing services for
                  goods and/or services purchased on this website are provided
                  by 2PH TRAVEL on behalf of the airlines depending on the type
                  of payment method used and on the type of services and goods.
                </p>
              </div>
              <br></br>
              <div>
                <h4 className="mt-2">
                  <b>Procedure for Resolution of Disputes.</b>
                </h4>
                <br></br>
                <p>
                  The base of our company is the customers’ gratification, in
                  fact, if there is a conflict between us, we try as soon as
                  possible to solve the problem in the most economical and
                  benevolent manner. Respectively, you agree to solve any
                  conflict or petition relating in any way to the website, any
                  trading with our customer service agents, any services and
                  products furnished, any presentation made by us by getting in
                  touch with our customer support or suggesting a claim via an
                  online form.
                </p>
              </div>
              <br></br>
              <div>
                <h4 className="mt-2">
                  <b>Credit Card Chargebacks</b>
                </h4>
                <br></br>
                <p>
                  You can dispute charges with credit card companies
                  (&quot;chargebacks&quot;). If you have a question about a
                  charge on your credit card statement, we encourage you to call
                  2PH TRAVEL prior to disputing a charge with your credit card
                  company so we may discuss and answer any questions or concerns
                  you may have about our charges. In all cases, 2PH TRAVEL will
                  work with you in resolving your concerns. 2PH TRAVEL retains
                  the right to dispute any chargeback that it believes is
                  improper, as described more fully below. 2PH TRAVEL also
                  retains the right to fully cancel any booking in the event of
                  a chargeback related to that booking. 2PH TRAVEL deems the
                  following chargeback scenarios as improper and retains the
                  right to investigate and rebut any such chargeback claims and
                  to recover costs of such chargeback claims from you.
                </p>
                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    Chargebacks resulting from non-cancellable bookings in the
                    event that 2PH TRAVEL or the airline cannot provide a
                    refund, whether or not the booking is used.
                  </li>
                  <li>
                    Chargebacks resulting from charges authorized by family,
                    friends, associates or other third parties with direct
                    access to your credit card.
                  </li>
                  <li>
                    Chargebacks arising from the airline’s failure to deliver a
                    product or service in a manner that is consistent with the
                    airline’s product description.
                  </li>
                  <li>
                    Chargebacks resulting from force majeure or other
                    circumstances that are beyond the control of 2PH TRAVEL.
                  </li>
                  <li>
                    Chargebacks related to the services or products that have
                    been used fully or partially by you.
                  </li>
                </ul>
                <p>
                  For greater certainty, we may, in accordance with the Privacy
                  Policy, use information relating to you, including recordings
                  of customer service calls, to dispute chargeback claims from
                  you. You hereby unconditionally authorize INTERNATIONAL TRAVEL
                  NETWORK LLC to charge your credit card (and / or retain from
                  your customer\&apos;s account) with the amount of any
                  chargeback processed by the bank and related to the services
                  or products that have been used fully or partially by you. You
                  hereby unconditionally authorize INTERNATIONAL TRAVEL NETWORK
                  LLC to charge your credit card (and / or retain from your
                  customer&apos;s account) with the amount of any chargeback
                  fees applied by the bank to the chargeback requested by you
                  without merits and subsequently rejected by the bank.{" "}
                </p>
              </div>
              <br></br>
              <div>
                <h4 className="mt-2">
                  <b>COVID-19 WAIVER OF LIABILITY</b>
                </h4>
                <br></br>
                <p>
                  You agree that it is your personal decision to travel, and you
                  are doing so with full knowledge of current travel
                  recommendations and travel restrictions with regards to the
                  risks of COVID-19. We assume no responsibility for and shall
                  not be liable for unsafe conditions or health hazards
                  including pandemics or other illnesses. We have no special
                  knowledge of dangers during travel or at destinations. For
                  information related to such dangers, we recommend going to the
                  State Department travel website at www.travel.state.gov, click
                  on &apos;Find International travel Information” then click on
                  &apos;Country Information&apos;, and fill in the name of the
                  destination country. For medical and health information, we
                  recommend going to the Centers for Disease Control website at
                  www.cdc.gov/travel, then click on “Destinations” and scroll to
                  the name of the destination country. We have no responsibility
                  for COVID-19-related requirements that travel suppliers and
                  governments may impose from time to time, such as health
                  affidavit forms, health screenings prior to departure or upon
                  arrival, face coverings, or quarantines. For the latest
                  COVID-19 government travel regulations, we recommend going to
                  IATA’s website at
                  https://www.iatatravelcentre.com/international-travel-document-news/1580226297.htm.
                  For the latest travel supplier requirements, check the
                  supplier’s home page. We are not responsible for the acts or
                  omissions of travel suppliers or their failure to adhere to
                  their own schedules, provide services or refunds, financial
                  default, or failure to honor future trip credits. We have no
                  special knowledge regarding the financial condition of the
                  suppliers, and we have no liability for recommending a trip
                  credit in lieu of a refund. If requested, we will assist with
                  obtaining any refunds due or rebooking trips using future
                  credits, but we may charge a nonrefundable fee for such
                  services. You agree to hold us harmless for your election not
                  to purchase travel insurance or for any denial of claim by
                  travel insurer as it relates to COVID-19 or any other claim
                  under the policy. YOU HEREBY EXPRESSLY ASSUME ALL OF THE RISKS
                  AND DANGERS DESCRIBED ABOVE, AND YOU HEREBY EXPRESSLY AGREE TO
                  FOREVER RELEASE, DISCHARGE AND HOLD US, AND OUR AGENTS,
                  EMPLOYEES, OFFICERS, DIRECTORS, ASSOCIATES, AFFILIATED
                  COMPANIES, GUIDES, GROUP LEADERS, AND SUBCONTRACTORS HARMLESS
                  AGAINST ANY AND ALL LIABILITY, ACTIONS, CAUSES OF ACTIONS,
                  SUITS, CLAIMS, AND DEMANDS OF ANY AND EVERY KIND AND NATURE
                  WHATSOEVER WHICH YOU NOW HAVE OR WHICH MAY HEREAFTER ARISE OUT
                  OF OR IN CONNECTION WITH THESE RISKS AND DANGERS.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Ticketing Policies</b>
                </h4>
                <br></br>
                <p>
                  Once you have completed your booking on our website, you will
                  receive an order confirmation with 2PH TRAVEL on the email
                  address provided by you. This email serves as proof that you
                  have successfully made a reservation with 2PH TRAVEL and it
                  reflects your Passenger(s) details, Itinerary Details, and
                  Summary of Charges.
                  <br></br>
                  <br></br>
                  Please note that the order confirmation is not the electronic
                  ticket itself. A separate email with an e-ticket will follow
                  once your reservation is verified and ticketed.
                  <br></br>
                  <br></br>
                  The Terms of your reservation, including price, availability,
                  dates of travel, etc. are not guaranteed until the booking is
                  ticketed and may be subject to changes due to various reasons.
                  <br></br>
                  <br></br>
                  The ability to cancel or modify a booked flight is restricted
                  and will depend on the airline’s fare rules or other terms and
                  conditions. While some airlines may allow free cancellations
                  within 24 hours after the ticket issuance, this possibility is
                  limited for specific airfares and ticket types. If you wish to
                  cancel your reservation, please contact our Customer Care
                  representatives, and request the cancelation policy of your
                  ticket.
                  <br></br>
                  <br></br>
                  Changes to name details are restricted by many airlines,
                  therefore in case any change is required, the customer must be
                  aware that modifications are applied only in accordance with
                  the airline’s policy. Most airlines treat a name change as a
                  cancellation, to which standard conditions and charges would
                  apply.
                  <br></br>
                  <br></br>
                  In case that you request any changes and/or modifications
                  caused by force majeure circumstances are needed in your
                  original booking (cancelation or modification), in addition to
                  the terms and conditions of the airline company, our
                  processing fees listed below will apply. Post-Ticketing
                  processing fees. Quoted per passenger
                  <hr></hr>
                  Void – Cancellation requested within 24 hours of booking
                  resulting in refund or reservation changes<br></br> $50.00
                  <hr></hr>
                  Cancellation and refunds beyond 24 hours of booking but prior
                  to current scheduled trip departure<br></br>$150.00
                  <hr></hr>
                  Changes/exchanges to existing tickets, prior to current
                  scheduled trip departure<br></br>$150.00
                  <hr></hr>
                  Schedule changes handling, including rebooking to new travel
                  dates or ticket cancellations and refunds<br></br>$50.00
                  <hr></hr>
                  Agent assisted waivers, including name corrections, refund and
                  exchange exceptions, or no-shows<br></br>$50.00
                  <br></br>
                  You may be entitled to a partial refund if you cancel your
                  booking. In addition to the cancellation terms and conditions
                  of the airline company, our standard processing fees will
                  apply.
                  <br></br>
                  The refundable amount will be credited back to the original
                  source of payment, however, please be advised that the return
                  period depends on your bank policy.
                  <br></br>
                  If you have booked with us any products or services, including
                  flights, but don’t turn up to check-in (no show), or,
                  otherwise, do not avail yourself of the purchased products or
                  services, you will not be entitled to any refund. You may,
                  however, be entitled to a tax refund as you have already paid
                  for your flight. This provision is subject to relevant airline
                  policy.
                </p>
              </div>
              <br></br>
              <div>
                <h4 className="mt-2">
                  <b>Flexible Ticket</b>
                </h4>
                <br></br>
                <p>
                  The Flexible Ticket plan is designed to allow customers to
                  make date and time changes on flight booking without covering
                  the airline’s change fees or processing fees. The customer(s)
                  might still have to pay the difference between already paid
                  and new fares, where applicable. If it is necessary to make
                  changes on flight booking, the request must be submitted
                  through our Customer Care team and it will be subject to the
                  below terms:
                </p>
                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>
                    The change on a flight booking request must be made
                    exclusively with our Customer Care department via chat,
                    phone at least 24 hours prior to your first scheduled
                    departure.
                  </li>
                  <li>
                    The plan does not apply to tickets changed or directly
                    canceled with the airline. In such cases, the plan shall be
                    considered consumed.
                  </li>
                  <li>
                    Once the 24 hours prior to the flight departure limit has
                    been passed, the Plan will be considered consumed and fare
                    rules imposed by the airline will apply.
                  </li>
                  <li>
                    Flight booking change is possible only within the same
                    airline(s) and same ticket stock. Ticket transfer to a
                    different carrier is not permitted.
                  </li>
                  <li>
                    When making the flight booking change the next dates must be
                    set so that these do not exceed 12 months from the date the
                    original ticket was booked.
                  </li>
                  <li>
                    {" "}
                    Changing the place of departure or destination place is not
                    permitted. When processing the requested to change the
                    flight segments must be used in the same order as they were
                    originally booked. Out of sequence usage is not permitted.
                  </li>
                  <li>
                    {" "}
                    Change of a ticket to allow a so-called “stopover” — staying
                    in a connecting city longer than 8 hours—is not permitted.
                  </li>
                  <li>
                    {" "}
                    The change can be made for the entire trip or for its return
                    once the first part of the trip is completed. It cannot be
                    done mid-trip or for a specific flight segment.
                  </li>
                  <li>
                    {" "}
                    Any reservation change is subject to seat availability. If
                    the requested change results in a more expensive fare, the
                    customer(s) will have to cover the difference.
                  </li>
                  <li>
                    {" "}
                    Upgrades to a different booking class or a different cabin
                    are not covered by this Plan.
                  </li>
                  <li>
                    {" "}
                    The Plan does not cover name corrections, name changes, or
                    ticket transfers to different individuals.
                  </li>
                  <li>
                    {" "}
                    The plan does not cover cases when customers did not show up
                    to their flights or missed their connections for any
                    reason(s).
                  </li>
                  <li>
                    {" "}
                    No additional-to-the-ticket expenses (pre-selected seats,
                    additional baggage, insurance packages, etc.) are covered by
                    the plan, and will not be transferred towards the new
                    ticket(s) or refunded.
                  </li>
                  <li>
                    {" "}
                    The Plan covers only the first change, any subsequent
                    changes will be subject to airline-imposed fees and our
                    processing fees.
                  </li>
                  <li>
                    {" "}
                    The plan is to be considered consumed once the trip is
                    finished or the ticket was refunded.
                  </li>
                  <li>
                    {" "}
                    The costs associated with the Flexible Ticket plan are
                    non-refundable.
                  </li>
                </ul>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Limitation of Liability</b>
                </h4>
                <br></br>
                <p>
                  All information contained on our website is disseminated as
                  disseminated. We do not guarantee in any way the timeliness,
                  accuracy, or availability of information unless these are
                  guaranteed by statute or other laws and international treaties
                  on the websites. In no event, including, but not limited to,
                  negligence will, 2PH Travel, including its respective
                  officers, directors, employees, representatives, parents,
                  subsidiaries, affiliates, distributors, suppliers, licensors,
                  agents or others involved in creating, sponsoring, promoting,
                  or otherwise making available the Site and its contents
                  (collectively the “Covered Parties”), be liable to any person
                  or entity for any injury, loss, claim, damage or for any
                  special, punitive, exemplary, direct, indirect, incidental,
                  compensatory or consequential damages of any kind, regardless
                  of whether are based on the contract, tort, negligence,
                  offenses, strict liability or otherwise, arising out of or in
                  any way related with the activities or business of our
                  Company, including but not limited to: (i) loss of goodwill,
                  profits, business interruption, data or other intangible
                  losses; (ii) the use, or inability to use, unauthorized use
                  of, performance or non-performance of the website or the
                  services or materials on the website or the reserved travel
                  reservations through the 2PH Travel call center, even if they
                  are informed about the possibility of such damages; (iii)
                  unauthorized access to or tampering with your personal
                  information or transmissions; (iv) the provision or failure to
                  provide any service; (v) errors or inaccuracies contained on
                  the Website or any information, software, products, services,
                  and related graphics obtained through the Website; (vi) any
                  transactions entered into through this Website; (vii) any
                  damages or viruses that may infect computer equipment or other
                  property, or any loss of data, access, use or use of your
                  account browsing the Website, or downloading materials, data,
                  text, images, videos, audio or other information from the
                  Website or associated with any e-mail or links sent by 2PH
                  TRAVEL; or (viii) damages otherwise arising out of the use of
                  the Website, any delay or inability to use the Website, or any
                  information, products, or services obtained through the
                  Website.
                  <br></br>In no case shall our total liability, or that of our
                  suppliers or distributors, exceed the total costs stipulated
                  in the itinerary that generate such liability. Please note
                  that claims or cause of action arising out of or in connection
                  with your access and use, or the purchase of products and/or
                  services from the Website must be submitted within one hundred
                  eighty (180) days from the date the purchase was completed.
                  The legislation in force does not allow limits or exclusions
                  regarding the liability for the harmed damages, so the ones
                  indicated above may not apply in your case. Your use of the
                  site will be at your own risk. Our company acts as an
                  intermediary or as an agent for the products and services
                  related to travel such as air transport, hotel accommodation,
                  meals, travel insurance, etc., and is in no way responsible
                  for the products and services of these suppliers.<br></br>The
                  carriers, hotels, and other providers that provide travel or
                  other services on this website are independent contractors and
                  not agents or employees of 2PH TRAVEL or its Covered Parties.
                  Our company and the subsidiaries of the company are not
                  responsible for the acts, errors, omissions, representations,
                  guarantees, violations, or negligence of such providers or for
                  any personal injury, death, loss, accident, delay, material
                  damage, or other damages or expenses resulting from them, at
                  the same time. We have no liability and will not make any
                  refund or accept responsibility for any damage in case of any
                  delays, cancellations, overbooking, strike, labor disputes,
                  bankruptcy, machinery breakdown, quarantine, government
                  restraints, weather, force majeure or other causes beyond the
                  Covered Partied direct control.<br></br>No Covered Party shall
                  be responsible for any Service Provider’s, that provides
                  services on this website, breach of warranty, nor for any
                  other wrongdoing of a Service Provider (including any
                  liability in tort), as to any products and/or services
                  available through this website. No Covered Party shall be
                  responsible for any Service Provider’s failure to comply with
                  this Agreement or with applicable federal, state, provincial,
                  and local law.<br></br>
                  By using our site, you will automatically agree to the Terms
                  and Conditions set forth in this agreement and you will not
                  bring any legal proceedings against our company, or its
                  Covered Parties. Therefore, both 2PH TRAVEL, its Covered
                  Parties are not responsible for any loss or damage to the
                  property or injury of any person caused by any defect,
                  negligence, or any other wrongful act of omission or any
                  non-compliance by any kind.
                  <br></br>
                  Tourism provider; any inconvenience, loss of pleasure, mental
                  suffering or other similar matter; any delayed departure,
                  missed connections, replacement of accommodations, termination
                  of service or changes in rates and charges; any cancelation or
                  double reservation of reservations or tickets outside the
                  reasonable control of 2PH Travel; and any claims of any kind
                  arising out of or in connection with air transport or other
                  transport services, products or other features performed (or
                  not) or arising (or not) in connection with your travels. To
                  exclude other claims, we inform you that we are not
                  responsible for any delays, cancellations, or changes to the
                  flight programs performed by the airlines. The limitations
                  specified in these Terms and Conditions will survive and apply
                  even if it is found that any limited remedy specified in these
                  Terms and Conditions has failed to achieve its essential
                  purpose. The limitations of liability provided in these Terms
                  and Conditions to ensure the benefit of 2PH Travel, its
                  affiliates, and the providers of travel products and services
                  purchased through our website.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <div>
                <h4 className="mt-2">
                  <b>Force Majeure</b>
                </h4>
                <br></br>
                <p>
                  Any act or situation which is beyond our control is known as a
                  “Force Majeure” event. In such a circumstance, we are not
                  liable for any failure to perform or delay in performance of
                  our obligations or contracts, for interruption of service
                  directly or indirectly from acts of God. No party will be held
                  legally responsible for any losses or damages of nature
                  incurred or suffered by that other party, as long as this
                  failure or delay is the direct result of a Force Majeure
                  event. Any act, event, non-happening, omission, or accident
                  beyond our control includes (but is not limited to):
                </p>
                <ul style={{ listStyle: "disc", marginLeft: "15px" }}>
                  <li>Strikes, lock-outs, or other industrial action.</li>
                  <li>
                    Civil commotion, riot, invasion, cyber-attack, terrorist
                    attack or threat of terrorist attack, war (whether declared
                    or not), or threat or preparation for war.
                  </li>
                  <li>
                    Fire, explosion, storm, flood, earthquake, subsidence,
                    epidemic, or other natural disasters.
                  </li>
                  <li>
                    Impossibility of the use of railways, shipping, aircraft,
                    motor transport, or other means of public or private
                    transport.
                  </li>
                  <li>
                    Interruption or failure of utility service (including the
                    inability to use public or private telecommunications
                    networks).
                  </li>
                  <li>
                    The acts, decrees, legislation, regulations, or restrictions
                    of any government.
                  </li>
                  <li>Other causes, beyond our reasonable control.</li>
                </ul>
                <p>
                  We will use our reasonable endeavors to minimize any delay
                  caused by Force Majeure or to find a solution by which our
                  obligations under these Terms of Use or any related contract
                  between us may be performed despite the Force Majeure event.
                </p>
              </div>
              <br></br>
            </Card>
            <Card className={`${Styles.cardShadow} p-5 mt-6`}>
              <h1>PAYMENT</h1>
              <p className="mt-1 mb-6">
                For all our services, we accept the following 03 payment methods
                (For more details, please check the Payment Guideline):
              </p>
              <p className="mt-1 mb-6">
                <b>Option 1:</b> Pay by Credit Card, VISA Card, MasterCard,
                American Express, …{" "}
              </p>
              <p className="mt-1 mb-6">
                <b>Option 2:</b> Bank transfer
              </p>
              <div className="mt-1 mb-6">
                You can pay through our bank account:
                <p>
                  <b>Account name:</b> Nguyen Thi Ha
                </p>
                <p>
                  <b>Account number:</b> 1903 9005 1570 18 (pay in VND)
                </p>
                <p>
                  <b>Bank name:</b> Techcombank Saigon (TCB SAI GON)
                </p>
                <p>
                  <b>Bank address:</b> TECHCOMBANK (TCB) - THU DUC BRANCH - 117
                  Dan Chu,<br></br> Binh Tho Ward, Thu Duc,<br></br> Ho Chi Minh
                  City
                </p>
                <p>
                  <b>Swift code:</b> VTCBVNVX After payment, please send us the
                  receipt so that we can track your payment and process The
                  document as per your request.
                </p>
              </div>
              <p className="mb-6 mt-1">
                <b>Option 3:</b> Pay in cash at our office
                <p>
                  <b>Office address:</b> B54-56 Bach Dang Str., Ward 2, Tan Binh
                  Dist., Ho Chi Minh City<br></br>
                  <b>Phone:</b>855-767-7778 <b>Email 24/7:</b> support@2PH
                  TRAVEL.com<br></br> Regardless of your payment method, any
                  additional fees associated with your Bank or Financial
                  Institution(s) that occur during the payment process are
                  charged to you and your account. 2PH Travel is not responsible
                  for any fees.
                </p>
              </p>
              <div>
                <h4 className="mt-2">
                  <b>DISCLAIMER</b>
                </h4>
                <br></br>
                <p>
                  Due to reasons beyond 2PH Travel&apos;s control, we cannot
                  guarantee that you will receive all confirmation emails and
                  notifications. These reasons may include failed email,
                  incorrect email address, email goes to spam folder, etc. if
                  you do not receive email related to your Documents, you must
                  contact Customer Service at least 2 days before arrival date.
                  2PH Travel will not be liable for any loss or damage,
                  including any refund claims.
                  <br></br>It is the responsibility of the applicant to check
                  the accuracy of the information in your documents. For any
                  mistakes, the applicant must contact us immediately to correct
                  them, otherwise the applicant is fully responsible for these
                  mistakes. If these mistakes are made on our part, we will
                  process the document for free, and if it is on the
                  applicant&apos;s part, the applicant must pay the full fee to
                  obtain a new document. The process of receiving the new
                  document will take 1-2 working days, so the applicant must
                  double-check the accuracy of the information as soon as the
                  official letter is received.
                  <br></br>Vietnam visa approval letters are usually issued with
                  your name and other information, so you can see your name,
                  passport number and date of birth in the same Document as
                  others. If you would like to have your own Official Document,
                  please send a request to support@2PH TRAVEL.com
                </p>
              </div>
              <div>
                <h4 className="mt-2">
                  <b>PRIVACY</b>
                </h4>
                <br></br>
                <p>
                  Please read the Privacy Statement carefully, by which you also
                  agree to be bound by using this website. Privacy Statement is
                  part of this agreement. Communication: By using this website
                  and our services, you authorize 2PH Travel to communicate with
                  you by email or phone for all purposes including distribution
                  of marketing and promotional.
                </p>
              </div>
              <div>
                <h4 className="mt-2">
                  <b>ENTIRE AGREEMENT</b>
                </h4>
                <br></br>
                <p>
                  This Agreement together with the Privacy Statement constitutes
                  the entire agreement between you and 2PH Travel and supersedes
                  all prior agreements, statements or representations regarding
                  2PH Travel. Failure to enforce any provision of this Agreement
                  shall not be construed as a waiver of such provision or the
                  right to enforce such provisions. No waiver, amendment or
                  other modification shall be null and void unless stated in
                  writing and signed by both parties. This Agreement is governed
                  by the laws of Vietnam.
                </p>
              </div>
              <div>
                <h4 className="mt-2">
                  <b>CONTACT US</b>
                </h4>
                <br></br>
                <p>
                  If you have any questions regarding the Terms and Conditions
                  of Use, please contact us at support@2PH TRAVEL.com
                </p>
                <br></br>
                <p>
                  You can contact us directly at , 2PH Travel - 9636 Garden
                  Grove Blvd, Unit 22, Garden Grove, Ca 92844
                </p>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsandCondition;
