"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";

export default function Create() {
  const { id } = useParams();
  const router = useRouter();
  const [newsType, setNewsType] = useState({ type_name: "", }); // เปลี่ยนค่าเริ่มต้นเป็น object

  useEffect(() => {
    if (id) {
      fetchNewsType();
    }
  }, [id]);

  const fetchNewsType = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/news_type/${id}`);
      const data = await response.json();
      console.log(data); // ตรวจสอบโครงสร้างของ data
      if (response.ok) {
        console.log(data);
        setNewsType(data); // ตั้งค่า state เป็นข้อมูลที่ได้
      }
    } catch (error) {
      Swal.fire({
        text: "Something Wrong!",
        icon: "error",
      });
    }
  };

  const changeNewsTypeHandler = (e) => {
    setNewsType({
      ...newsType,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("type_name", newsType.type_name);

    try {
      const response = await fetch(`http://localhost:8000/api/news_type/${id}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        router.push("/Add_news/news_type");
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
        <h1 className="text-2xl text-[#20a68a] font-bold">เพิ่มประเภทข่าว</h1>
        <form onSubmit={onSubmitChange}>
          <label className="text-[#20a68a]" htmlFor="type_name">
            ประเภทข่าว
          </label>
          <br />
          <input
            type="text"
            className="text-[#20a68a] p-1 placeholder-[#20a68a] border border-[#20a68a]"
            placeholder="เพิ่มประเภทข่าว"
            name="type_name"
            value={newsType.type_name} // fallback เป็น string ว่าง
            onChange={changeNewsTypeHandler}
          />
          <button type="submit" className="text-blue-500">
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}
