import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import WhySection from "./WhySection";

const LandingPage = ({
  addressInput,
  setAddressInput,
  onManualSubmit,
  onDemoClick,
}) => {
  return (
    <div className="w-full py-8 md:py-12">
      <Hero
        addressInput={addressInput}
        setAddressInput={setAddressInput}
        onManualSubmit={onManualSubmit}
        onDemoClick={onDemoClick}
      />
      <FeaturesSection />
      <WhySection />
    </div>
  );
};

export default LandingPage;
