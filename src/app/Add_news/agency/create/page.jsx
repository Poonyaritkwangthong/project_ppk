"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';


export default function Create() {
  const [agency, setAgency] = useState([]);
  const router = useRouter();

  const changeNewsTypeHandler = (e) => {
    setAgency({
      ...agency,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("agency_name", agency.agency_name);

    try {
      const response = await fetch("http://localhost:8000/api/agency", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        router.push('/Add_news/agency');
      } else if (data.status === 422) {
        Swal.fire({
          icon: "error",
          text: "Validation failed. Please check your input.",
        });
      }
    } catch (error) {
      Swal.fire({
        text: error.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="p-4 border w-[15rem]">
        <h1 className="text-2xl text-[#20a68a] font-bold">เพิ่มหน่วยงาน</h1>
        <form onSubmit={(e) => onSubmitChange(e)}>
          <label className="text-[#20a68a]" htmlFor="">
            หน่วยงาน
          </label>
          <br />
          <input
            type="text"
            className="text-[#20a68a] p-1 placeholder-[#20a68a] border border-[#20a68a]"
            placeholder="เพิ่มหน่วยงาน"
            name="agency_name"
            onChange={(e) => changeNewsTypeHandler(e)}
          />
          <button type="submit" className="text-blue-500">
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}
