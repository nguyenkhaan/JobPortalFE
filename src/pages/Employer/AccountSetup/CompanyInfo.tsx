import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import RichTextEditor from "../../../components/ui/RichTextEditor";

export default function CompanyInfo() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const [logoFile, setLogoFile] = useState<File | null> (null);
  const [bannerFile, setBannerfile] = useState<File | null> (null);


  const handleSaveAndNext = (e: React.FormEvent) => {
    e.preventDefault();

    // await employerService.saveCompanyInfo({ companyName, aboutUs, logo, banner });
    console.log ("Data submit: ", {
      companyName, 
      aboutUs, 
      logoFile,
      bannerFile
    })
    navigate("/employer/setup/founding");
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Logo & Banner Image
      </h2>

      <form onSubmit={handleSaveAndNext} className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <span className="block text-sm font-medium text-gray-900 mb-2">
              Upload document
            </span>
            <ImageUpload
              label="Browse photo"
              subLabel="A photo larger than 400 pixels work best. Max photo size 5 MB."
              className="aspect-square max-w-70"
              onChange={(file) => setLogoFile(file)}
            />
          </div>

          <div className="flex-2">
            <span className="block text-sm font-medium text-gray-900 mb-2">
              Banner Image
            </span>
            <ImageUpload
              label="Browse photo"
              subLabel="Banner images optimal dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
              className="h-70"
              onChange={(file) => setBannerfile(file)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">
            Company name
          </label>
          <Input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompanyName(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">About Us</label>
          <RichTextEditor
            value={aboutUs}
            onChange={setAboutUs}
            placeholder="Write down about your company here. Let the candidate know who we are..."
          />
        </div>
        <div>
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
