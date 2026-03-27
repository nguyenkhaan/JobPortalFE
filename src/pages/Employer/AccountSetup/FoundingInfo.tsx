import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Nhúng các mảnh ghép "Lego" vào
import Input from "../../../components/ui/Input";
import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Button from "../../../components/ui/Button";
import RichTextEditor from "../../../components/ui/RichTextEditor";

// --- Dữ liệu giả lập cho các ô Dropdown (Sau này có thể gọi từ BE lên) ---
const orgTypes = [
  { label: "Private Company", value: "private" },
  { label: "Public Company", value: "public" },
  { label: "Non-profit", value: "non_profit" },
];

const industryTypes = [
  { label: "Information Technology", value: "it" },
  { label: "Finance & Banking", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
];

const teamSizes = [
  { label: "1 - 50 Employees", value: "1-50" },
  { label: "51 - 200 Employees", value: "51-200" },
  { label: "201 - 500 Employees", value: "201-500" },
];

export default function FoundingInfo() {
  const navigate = useNavigate();
  const [orgType, setOrgType] = useState<OptionType | null>(null);
  const [industry, setIndustry] = useState<OptionType | null>(null);
  const [teamSize, setTeamSize] = useState<OptionType | null>(null);
  const [establishedYear, setEstablishedYear] = useState("");
  const [website, setWebsite] = useState("");
  const [vision, setVision] = useState("");

  const handleSaveAndNext = (e: React.FormEvent) => {
    e.preventDefault();
    // call api
    navigate("/employer/setup/social");
  };

  const handlePrevious = () => {
    navigate("/employer/setup/company");
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleSaveAndNext} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium text-gray-900">
              Organization Type
            </label>
            <ComboBox
              options={orgTypes}
              value={orgType}
              placeholder="Select..."
              onChange={(option) => setOrgType(option)}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium text-gray-900">
              Industry Types
            </label>
            <ComboBox
              options={industryTypes}
              value={industry}
              placeholder="Select..."
              onChange={(option) => setIndustry(option)}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium text-gray-900">
              Team Size
            </label>
            <ComboBox
              options={teamSizes}
              value={teamSize}
              placeholder="Select..."
              onChange={(option) => setTeamSize(option)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">
              Year of Establishment
            </label>
            <Input
              type="date"
              placeholder="dd/mm/yyyy"
              value={establishedYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEstablishedYear(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">
              Company Website
            </label>
            <Input
              type="url"
              placeholder="Website url..."
              value={website}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWebsite(e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">
            Company Vision
          </label>
          <RichTextEditor
            value={vision}
            onChange={setVision}
            placeholder="Tell us about your company vision..."
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
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
            Save & Next <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}
