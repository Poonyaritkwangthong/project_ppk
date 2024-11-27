"use client";
import React, { useEffect, useState } from "react";
import AppbarNews from "../components/appbar-news";
import Swal from "sweetalert2";
import Link from "next/link";

export default function page() {

  const [News, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/news`);
      const data = await response.json();
      if (response.ok) {
        setNews(data);
      }
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const [deleting, setDeleting] = useState(null); // กำหนด State สำหรับสถานะการลบ

  const handleDelete = async (e, id) => {
    setDeleting(id);

    try {
      const response = await fetch(`http://localhost:8000/api/news/` + id, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          text: "ลบข่าวสำเร็จ",
          icon: "success",
        });

        // อัปเดตรายการข่าว
        setNews((prev) => prev.filter((news) => news.id !== id));
      } else {
        Swal.fire({
          icon: "error",
          text: "ลบข่าวไม่สำเร็จ!",
        });
      }
      setDeleting(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "ลบข่าวไม่สำเร็จ!",
      });
      setDeleting(null);
    }
  };
 
  return (
    <div>
      <div className="">
      <AppbarNews />
      </div>
      <div  className=" w-[110rem] h-full mx-auto mt-6">
        <div  className="flex justify-end">
        <Link className="text-xl text-[#20a68a] border-[#20a68a] rounded-lg p-2 border hover:text-white hover:bg-[#20a68a]"
        href="/Add_news/create"
       >
        เพิ่มข่าว
      </Link>
        </div>
      <div className="bg-white border-[#20a68a] border w-[110rem] h-full mx-auto mt-6 rounded-xl p-2">
        <p className="text-[#20a68a]">
          หมายเหตุ : 1.ข่าวประชาสัมพันธ์, 2.ข่าวเเสดงความเสียใจ,
          3.ข่าวที่มีกำหนดวันเเสดงข้อมูล, 4.ข่าวด่วน, 5.ดูงานจากหน่วยงานภายนอก,
          6.เพิ่มหัวข้อข่าว, 7.เพิ่มหน่ายงาน, 8. ประกวดราคา
        </p>
        <div>
          <div className="mt-4">
            <table className="w-full border rounded-xl">
              <thead>
                <tr className="text-left text-white bg-[#20a68a] text-xl">
                  <th className=" border p-2">หัวข้อข่าว</th>
                  <th className=" border p-2">รายละเอียด</th>
                  <th className=" border p-2">ประเภทข่าว</th>
                  <th className=" border p-2">สถานะ</th>
                  <th className="text-center border p-2">จัดการข่าว</th>
                </tr>
              </thead>
              <tbody className="border">
                {News?.map((news, index) => (
                  <tr key={index} className="text-black">
                    <td className="p-2 border">{news?.news_title}</td>
                    <td className="p-2 border">{news?.news_detail}</td>
                    <td className="p-2 border">{news?.news_type.type_name}</td>
                    <td className="p-2 border">{news?.news_status}</td>
                    <td className="p-2 border">
                      <div className="flex gap-4 justify-center">
                        <div className="border-[#20a68a] border p-1 w-[4rem] h-[2rem] rounded-lg text-center hover:bg-[#20a68a] text-[#20a68a]  hover:text-white">
                        <Link
                      href={`/Add_news/edit/${news.id}`}
                      className="">
                    เเก้ไข
                    </Link>
                        </div>
                        <div className="border-[#20a68a] border p-1 w-[4rem] h-[2rem] rounded-lg text-center hover:bg-[#20a68a] text-[#20a68a]  hover:text-white">
                          <button
                            onClick={(e) => handleDelete(e, news.id)}
                            className=""
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
