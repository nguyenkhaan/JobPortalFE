import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRight, Mail } from "lucide-react";
import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const CountryCodes = [
  {
    label: "+84 (VN)",
    value: "+84",
    icon: <span className="text-sm">VN</span>,
  },
  { label: "+1 (US)", value: "+1", icon: <span className="text-sm">US</span> },
];

export default function Contact() {
  const navigate = useNavigate();

  const [mapLocation, setMapLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<OptionType>(CountryCodes[0]);

  const handleFinishAndNext = (e: React.FormEvent) => {
    e.preventDefault();

    const fullPhone = countryCode ? `${countryCode.value} ${phone}` : phone;

    // lock for a while to see the data
    console.log("Data submit: ", { mapLocation, phone: fullPhone, email });
    // await employyerService.saveContact({mapLocation, phone, email});
    console.log("Data submit: ", { mapLocation, phone: fullPhone, email });
    navigate("/employer/setup/success");
  };
  const handlePrevious = () => {
    navigate("/employer/setup/social");
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleFinishAndNext} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">
              Map Location
            </label>
            <Input
              type="text"
              placeholder="Enter your location"
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Phone</label>
            <div className="flex gap-3">
              <div className="w-42">
                <ComboBox
                  options={CountryCodes}
                  value={countryCode}
                  onChange={(option) => {
                    setCountryCode(option);
                  }}
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Email</label>
            <div className="flex gap-3">
              <div className="w-12 flex items-center justify-left">
                <Mail size={40} className="text-primary-500" />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-6 py-3 font-semibold rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <Button
            variant="primary"
            type="submit"
            className="flex items-center gap-2"
          >
            Finish Editings
            <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}
