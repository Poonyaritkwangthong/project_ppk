"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className=" flex items-center justify-center mt-[10rem]">
        <div className="p-[2rem] border w-[25rem] h-full rounded-lg shadow-2xl">
          <h1 className="text-4xl text-[#20a68a] text-center font-bold mb-10 mt-10">
            เพิ่มหน่วยงาน
          </h1>
          <form onSubmit={(e) => onSubmitChange(e)}>
            <label className="text-[#20a68a] text-2xl pl-2" htmlFor="">
              ประเภทข่าว :
            </label>
            <br />
            <input
              type="text"
              className="text-xl text-[#20a68a] p-1 placeholder-[#20a68a] border border-[#20a68a] mt-2 rounded-lg w-full"
              placeholder="เพิ่มประเภทข่าว"
              name="type_name"
              value={newsType.type_name}
              onChange={(e) => changeNewsTypeHandler (e)}
            />
            <div className="flex justify-end gap-2">
              <div className="bg-gray-400 p-1 rounded-lg mt-10 hover:bg-gray-500 text-white">
              <Link  href={`/Add_news/news_type/`}
                      className="">
                        กลับ
              </Link>
              </div>
              <button
                type="submit"
                className="bg-blue-500 p-1 rounded-lg mt-10 hover:bg-blue-700 text-white"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
