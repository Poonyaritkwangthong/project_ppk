"use client";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function page() {
  const [addNews, setAddNews] = useState({
    news_title: "",
    news_link: "",
    news_detail: "",
    news_status: "",
    start_announcing: "",
    end_announcing: "",
    news_type_id: "",
    agency_id: "",
    files: [],
  });
  console.log(addNews?.files)

  const [newsType, setNewsType] = useState([]);
  const router = useRouter();

  const fetchNewsType = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/news_type`);
      const data = await response.json();
      if (response.ok) {
        // แปลง response เป็น JSON
        setNewsType(data); // อัปเดต state ด้วยข้อมูลที่ได้จาก API
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "มีบางอย่างผิดพลาด!",
      });
    }
  };

  const [agency, setAgency] = useState([]);

  const fetchAgency = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/agency`);
      const data = await response.json(); // แปลง response เป็น JSON
      if (response.ok) {
        setAgency(data); // อัปเดต state ด้วยข้อมูลที่ได้จาก API
        console.log(data)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "มีบางอย่างผิดพลาด!",
      });
    }
  };
  useEffect(() => {
    fetchNewsType();
    fetchAgency();
  }, []);


  const changeFieldHandler = (e) => {
    setAddNews({
      ...addNews,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("news_title", addNews.news_title);
    formData.append("news_link", addNews.news_link);
    formData.append("news_detail", addNews.news_detail);
    formData.append("news_type_id", addNews.news_type_id);
    formData.append("start_announcing", addNews.start_announcing);
    formData.append("end_announcing", addNews.end_announcing);
    formData.append("agency_id", addNews.agency_id);
    formData.append("news_status", addNews.news_status);
    addNews.files.forEach((fileObj) => {
      if (fileObj.file) {
        formData.append('files[]', fileObj.file); // ใช้ 'files[]' หรือ key ตาม backend กำหนด
      }
    });
    formData.append('files', JSON.stringify(addNews.files || {}));

    try {
      const response = await fetch(`http://localhost:8000/api/news`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        router.push('/Add_news');
      } else if (response.status === 422) {
        console.log(data)
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

  const uploadFiles = (e) => {
    const file = Array.from(e.target.files);
    console.log(file)
    setAddNews({
      ...addNews,
      files: file
    });
  }

  // const removeFileInput = (i, e) => {
  //   setAddNews(addNews.files.filter((file, index) => index !== i));
  //   console.log(i)
  // }

  const fileInputRef = useRef(null);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // รีเซ็ตค่า input
    }
  };

  // const addFileInput = () => {
  //   setAddNews((file) => ({
  //     ...file,
  //     files: [...file?.files, {}],
  //   }));
  // }

  const addFileInput = () => {
    setAddNews((file) => ({
      ...file,
      files: [
        ...addNews.files,
        { id: Date.now(), file: null }, // เพิ่มไฟล์ใหม่พร้อม id และค่าเริ่มต้น
      ],
    }));
  };

  const removeFileInput = (id) => {
    setAddNews((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== id),
    }));
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0]; // ดึงไฟล์จาก input
    setAddNews((prev) => ({
      ...prev,
      files: prev.files.map((f) => (f.id === id ? { ...f, file } : f)), // อัปเดตเฉพาะไฟล์ที่ตรงกับ id
    }));
  };

  return (
    <div>
      <div className="p-10">
        <h1 className="text-[#20a68a] text-5xl ml-8 font-bold">
          เพิ่มข่าวใหม่
        </h1>
        <div className="bg-[#20a68a] w-[110rem] h-full mx-auto mt-10 rounded-xl p-5">
          <div className="flex gap-6">
            <div className="">
              <Link className="bg-white p-2 rounded-xl text-[#20a68a] text-xl"
              href={`/Add_news`}>
                กลับ
              </Link>
            </div>
          </div>
          <div className="text-sm ml-2 mt-2 w-[55rem] p-1">
            <p>
              ขอเเจ้งวิธีการลงข่าวประชาสัมพันธ์เเล้วระบบสามารถนำส่งใน Line
              Nodify ได้ โดย พิมพ์ข่าวจากหน้าเเบบฟอร์ม โดยไม่มีการ Copy
              จากที่อื่นเเล้วนำมาวางในฟอร์มลงข่าว
              ซึ่งโอกาสที่จะทำให้ข่าวของท่านถูกนำส่งไปยัง Line Nodify มากกว่า
              99.99%
            </p>
          </div>
          <form onSubmit={(e) => onSubmitChange(e)}>
            <div className="flex gap-[2rem]">
              <div className="bg-white w-[55rem] h-full mt-2 rounded-xl p-4">
                <div className="text-[#20a68a] flex gap-6">
                  <div>
                    <label htmlFor="">หัวข้อข่าว : </label>
                    <input
                      type="text"
                      className="border border-[#20a68a] rounded-lg w-[20rem] p-1 text-[#20a68a]"
                      name="news_title"
                      onChange={(e) => changeFieldHandler(e)}
                    />
                  </div>
                  <div>
                    <select
                      id=""
                      name="news_type_id"
                      className="h-full rounded-lg border border-[#20a68a] w-[26.5rem] text-center text-[#20a68a]"
                      onChange={e => changeFieldHandler(e)}
                    >
                      <option>--ประเภทข่าว -- </option>
                      {newsType?.length > 0 ? (
                        newsType.map((news_type) => (
                          <option key={news_type.id}
                            value={news_type.id}>
                            {news_type.type_name}
                          </option>
                        ))
                      ) : (
                        <option>--ไม่มีประเภทข่าว--</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="" className="text-[#20a68a]">
                    เพิ่ม Link ไปยัง website :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#20a68a] rounded-lg p-1 text-[#20a68a]"
                    name="news_link"
                    onChange={(e) => changeFieldHandler(e)}
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="" className="text-[#20a68a]">
                    รายละเอียด :
                  </label>
                  <textarea
                    name="news_detail"
                    id=""
                    type=""
                    className="w-full h-[18rem] p-2 border border-[#20a68a] rounded-lg text-[#20a68a]"
                    onChange={(e) => changeFieldHandler(e)}
                  ></textarea>
                </div>

                <div className="mt-2 flex gap-2 items-center">
                  <label htmlFor="" className="text-[#20a68a]">
                    หน่วยงาน :
                  </label>
                  <select
                    id=""
                    name="agency_id"
                    className="h-full  rounded-lg border border-[#20a68a] w-[48rem] text-center text-[#20a68a] p-1.5"
                    onChange={e => changeFieldHandler(e)}
                  >
                    <option>--หน่วยงาน-- </option>
                    {agency?.length > 0 ? (
                      agency.map((agency) => (
                        <option key={agency.id}
                          value={agency.id}>
                          {agency.agency_name}
                        </option>
                      ))
                    ) : (
                      <option>--ไม่มีหน่วยงาน--</option>
                    )}
                  </select>
                </div>

                <div className="flex gap-[2rem] mt-2">
                  <div>
                    <label htmlFor="" className="text-[#20a68a]">
                      วันที่เริ่มประกาศ :{" "}
                    </label>
                    <input
                      type="date"
                      className="border border-[#20a68a] rounded-lg text-center w-[17rem] text-[#20a68a]"
                      name="start_announcing"
                      onChange={(e) => changeFieldHandler(e)}
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-[#20a68a]">
                      วันที่สิ้นสุดประกาศ :{" "}
                    </label>
                    <input
                      type="date"
                      className="border border-[#20a68a] rounded-lg text-center w-[18.5rem] text-[#20a68a]"
                      name="end_announcing"
                      onChange={(e) => changeFieldHandler(e)}
                    />
                  </div>
                </div>

                <div className="flex gap-[2rem] items-center mt-2">
                  <label className="text-[#20a68a]">การปฏิบัติงาน :</label>
                  <div>
                    <input
                      type="radio"
                      name="news_status"
                      value="start"
                      onChange={(e) => changeFieldHandler(e)}
                    />
                    {" "}
                    <label
                      htmlFor="html"
                      className="text-green-700 bg-green-300 p-1"
                    >
                      ประชาสัมพันธ์ข่าว
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="news_status"
                      value="stop"
                      onChange={(e) => changeFieldHandler(e)}
                    />
                    {" "}
                    <label
                      htmlFor="css"
                      className="text-red-700 bg-red-400 p-1"
                    >
                      หยุดประชาสัมพันธ์ข่าว
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid justify-items-center justify-center">
                <div className="bg-white w-[50rem] h-full rounded-xl mt-2 p-[2rem]">
                  <div className="bg-[#20a68a] w-[35rem] p-4 mx-auto">
                    <h1 className="text-center text-4xl font-bold text-white">
                      เเนบไฟล์เอกสาร
                    </h1>
                  </div>
                  <div className="p-6 max-w-lg mx-auto">
                    <div>
                      {addNews.files.map((file) => (
                        <div key={file.id} className="flex items-center mb-4">
                          <input
                            type="file"
                            onChange={(event) => handleFileChange(file.id, event)}
                            className="flex-1 border border-[#20a68a] text-[#20a68a] p-2 rounded-md"
                          />
                          {addNews.files.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFileInput(file.id)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ลบ
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={addFileInput}
                          className="text-green-500 hover:text-green-700 mt-4"
                        >
                          เพิ่มไฟล์ +
                        </button>
                      </div>
                    </div>
                    {/* <div className="mx-auto">
                      <div className="flex items-center gap-2">
                        <input type="file" onChange={uploadFiles} className="flex border border-[#20a68a] text-[#20a68a] p-2 rounded-md mb-2" ref={fileInputRef} />
                        <button
                          type="button"
                          onClick={() => { removeFileInput(0); resetFileInput() }}
                          className="ml-2 text-red-500 hover:text-red-700">
                          ลบ
                        </button>
                      </div>
                      {addNews.files?.map((file, i) => (
                        <div key={i}>

                          {addNews.files.length > 1 && (
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                onChange={uploadFiles}
                                className="flex border border-[#20a68a] text-[#20a68a] p-2 rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeFileInput(i)}
                                className="ml-2 text-red-500 hover:text-red-700">
                                ลบ
                              </button>
                            </div>

                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={addFileInput}
                        className="text-green-500 hover:text-green-700 mt-4"
                      >
                        เพิ่มไฟล์ +
                      </button>
                    </div> */}

                    {/* {files.map((file) => (
                      <div key={file.id} className="flex items-center mb-4">
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(file.id, event)}
                          className="flex-1 border border-[#20a68a] text-[#20a68a] p-2 rounded-md"
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          {file.file ? file.file.name : "ไม่ได้เลือกไฟล์"}
                        </span>
                        {files.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFileInput(file.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ลบ
                          </button>
                        )}
                      </div>
                    ))} 
                     <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={addFileInput}
                        className="text-green-500 hover:text-green-700 mt-4"
                      >
                        เพิ่มไฟล์ +
                      </button>
                    </div>  */}


                  </div>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="bg-white text-4xl p-4 w-[20rem] mt-6 rounded-lg text-[#20a68a]"
                    onClick={onSubmitChange}
                  >
                    บันทึก
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
