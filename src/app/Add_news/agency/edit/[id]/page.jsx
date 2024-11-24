"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";

export default function Create() {
  const { id } = useParams();
  const router = useRouter();
  const [agency, setAgency] = useState({
     agency_name: "", 
    }); // เปลี่ยนค่าเริ่มต้นเป็น object

  useEffect(() => {
    if (id) {
      fetchAgency();
    }
  }, [id]);

  const fetchAgency = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/agency/${id}`);
      const data = await response.json(); // ตรวจสอบโครงสร้างของ data
      if (response.ok) {
        setAgency(data); // ตั้งค่า state เป็นข้อมูลที่ได้
        console.log(data.id)
      }
    } catch (error) {
      Swal.fire({
        text: "Something Wrong!",
        icon: "error",
      });
    }
  };

  const changeNewsTypeHandler = (e) => {
    setAgency({
      ...agency,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("agency_name", agency.agency_name);

    try {
      const response = await fetch(`http://localhost:8000/api/agency/${id}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        router.push("/Add_news/agency");
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
        <h1 className="text-2xl text-[#20a68a] font-bold">เเก้ไขหน่วยงาน</h1>
        <form onSubmit={onSubmitChange}>
          <label className="text-[#20a68a]" htmlFor="type_name">
            หน่วยงาน
          </label>
          <br />
          <input
            type="text"
            className="text-[#20a68a] p-1 placeholder-[#20a68a] border border-[#20a68a]"
            placeholder="เเก้ไขหน่วยงาน"
            name="agency_name"
            value={agency.agency_name} // fallback เป็น string ว่าง
            onChange={changeNewsTypeHandler}
          />
          <button type="submit" className="text-blue-500"
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}
