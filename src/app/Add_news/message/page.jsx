"use client";
import { useState } from "react";
import AppbarNews from "../../components/appbar-news";

export default function Home() {
  const [notes, setNotes] = useState([""]);
  const [selectedWreath, setSelectedWreath] = useState(null);

  const handleAddNote = () => setNotes([...notes, ""]);
  const handleRemoveNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  return (
    <div>
      <AppbarNews/>
      <div className="container text-[#20a68a] p-10 mx-auto">
        <h1 className="text-5xl ml-8 font-bold">เพิ่มแจ้งข่าวงานศพ</h1>
        <form className="form border p-5 mt-4">
          <div className="flex justify-center  gap-[4rem]">
            <div>
              <h3>ข้อมูลเจ้าภาพ</h3>
              <div className="flex gap-6 mb-4">
                <div className="flex gap-2 items-center">
                  <label htmlFor="">ชื่อเจ้าภาพ</label>
                  <input
                    className="p-1 border border-[#20a68a] rounded-lg"
                    type="text"
                    placeholder="ชื่อเจ้าภาพ"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="">สถานที่ปฏิบัติงาน</label>
                  <input
                    className="p-1 border border-[#20a68a] rounded-lg"
                    type="text"
                    placeholder="สถานที่ปฏิบัติงาน"
                  />
                </div>
              </div>

              <div className="mb-4">
                <h3>ข้อมูลผู้เสียชีวิต</h3>
                <div className="flex gap-6">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="">ชื่อผู้เสียชีวิต</label>
                    <input
                      className="p-1 border border-[#20a68a] rounded-lg"
                      type="text"
                      placeholder="ชื่อผู้เสียชีวิต"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="">ความสัมพันธ์</label>
                    <input
                      className="p-1 border border-[#20a68a] rounded-lg"
                      type="text"
                      placeholder="ความสัมพันธ์"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="">ขณะนี้ได้ตั้งศพ ณ:</label>
                  <br />
                  <input
                    className="p-1 border border-[#20a68a] rounded-lg w-full"
                    type="text"
                    placeholder="ขณะนี้ได้ตั้งศพ"
                  />
                </div>
              </div>

              <div className="">
                <h3 className="mb-2">กำหนดการ</h3>
                <div className="border-gray-400 border-t-2 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <label>เริ่มตั้งแต่วันที่:</label>
                      <br />
                      <input className="border border-[#20a68a] rounded-lg p-1" type="date" />
                    </div>
                    <div>
                      <label>ถึงวันที่:</label>
                      <br />
                      <input className="border border-[#20a68a] rounded-lg p-1" type="date" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="">สวดพระอภิธรรม</label>
                    <br />
                    <input className="p-1 border border-[#20a68a] rounded-lg" type="time" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <label>พิธีฌาปนกิจ:</label>
                      <br />
                      <input className="p-1 border border-[#20a68a] rounded-lg" type="date" />
                    </div>
                    <div>
                      <label htmlFor="">เริ่มเวลา</label>
                      <br />
                      <input className="p-1 border border-[#20a68a] rounded-lg" type="time" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">สถานที่ทำการฌาปนกิจ</label> <br />
                    <input
                      className="w-full p-1 border border-[#20a68a] rounded-lg"
                      type="text"
                      placeholder="สถานที่ทำการฌาปนกิจ"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-4 ">
              <div className="">
                <h3 className="text-center">เลือกรูปพวงหรีด</h3>
                <div className="grid grid-rows-6  grid-flow-col gap-[3rem] mt-[2rem]">
                  {[...Array(12)].map((_, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        id={`wreath${i}`}
                        name="wreath"
                        onChange={() => setSelectedWreath(i)}
                      />
                      <label className="pl-2" htmlFor={`wreath${i}`}>พวงหรีด {i + 1}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border p-4 w-[60rem] h-[10rem] mx-auto mb-4">
            <h3 className="text-center">หมายเหตุ</h3>
            <div className="relative mb-2">
              {notes.map((note, index) => (
                <div key={index} className="note-input">
                  <div className="flex items-center gap-2">
                    <label htmlFor="">หมายเหตุ</label>
                    <input
                      className="w-[50rem] p-1 mb-1 border-[#20a68a] border rounded-lg"
                      type="text"
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder="หมายเหตุ"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNote(index)}
                      disabled={notes.length === 1}
                      className="ml-4 text-red-500"
                    >
                      ลบ
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <button type="button" onClick={handleAddNote}>
              เพิ่มหมายเหตุ
            </button>
          </div>

          <div className="flex gap-6 justify-center items-center">
            <input type="checkbox" id="publicity" />
            <label className="text-red-500" htmlFor="publicity">ยกลิก / สิ้นสุดการประชาสัมพันธ์</label>
            <button className="border border-[#20a68a] p-1.5 rounded-lg text-2xl" type="submit">บันทึก</button>
          </div>

          
        </form>
       
      </div>
      <div className="bg-white border-[#20a68a] border container mx-auto  rounded-xl p-2">
         
          <div className="mt-4">
            <table className="w-full border rounded-xl">
              <thead className="">
                <tr className="text-left text-white bg-[#20a68a] text-xl">
                  <th className=" border p-2">ลำดับ</th>
                  <th className=" border p-2">ชื่อผู้เสียชีวิต</th>
                  <th className=" border p-2">ความสัมพันธ์</th>
                  <th className="text-center border p-2">จัดการข่าว</th>
                </tr>
              </thead>
              <tbody className="border">
            
                  <tr className="text-black">
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">
                      <div className="flex gap-4 justify-center">
                        <div className="border-[#20a68a] border p-1 w-[4rem] h-[2rem] rounded-lg text-center">
                          <button className="text-[#20a68a]">เเก้ไข</button>
                        </div>
                        <div className="border-[#20a68a] border p-1 w-[4rem] h-[2rem] rounded-lg text-center">
                          <button className="text-[#20a68a]">ลบ</button>
                        </div>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
