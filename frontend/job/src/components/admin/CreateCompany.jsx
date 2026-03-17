import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANIES_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      alert("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANIES_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        const companyId = res.data.company._id;
        navigate(`/admin/company/${companyId}`);
      }
    } catch (error) {
      console.error("Create company error:", error.response?.data || error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h3 className="font-bold text-2xl">Your Company Name</h3>
          <p>What would you like to give your company name? You can change this later.</p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Job hunt, Microsoft etc..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
