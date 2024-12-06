"use client";
import React, { useState } from 'react';

export default function Appbar() {

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  return (
    <div>
      <div className='bg-white h-[6rem] w-full p-4 flex justify-between border-b border-[#20a68a]'>
        <div className='h-[5] w-[4rem]'>
          <img src="https://www.ppkhosp.go.th/images/logoppk.png" alt="" />
        </div>
        <ul className='text-white flex justify-end gap-2 mt-2'>
          <a href="/home">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              หน้าหลัก
            </li>
          </a>
          <a href="/history">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              ประวัติโรงพยาบาล
            </li>
          </a>
          <a href="/number_of_hospital_personnal">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              จำนวนบุคลากรโรงพยาบาล
            </li>
          </a>

          {/* Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown1}
              className="bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  text-center inline-flex items-center hover:border-[#20a68a] hover:border"
              type="button"
            >
              ข่าวสารต่างๆ
              <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen1 && (
              <div className="z-10 absolute bg-[#20a68a] divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
                <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">พัสดุ</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">ยา</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">แพทย์แผนไทย</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">รับสมัครงาน</a></li>
                </ul>
              </div>
            )}
          </div>

           {/* Dropdown */}
           <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown2}
              className="bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  text-center inline-flex items-center hover:border-[#20a68a] hover:border"
              type="button"
            >
              งานประกันชีวิต
              <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen2 && (
              <div className="z-10 absolute bg-[#20a68a] divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
                <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">หน้าเเรก</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">ขั้นตอนการใช้สิทธิ์</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">บริษัทประกันชีวิต</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">ติดต่อ-สอบถาม</a></li>
                </ul>
              </div>
            )}
          </div>

           {/* Dropdown */}
           <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown3}
              className="bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  text-center inline-flex items-center hover:border-[#20a68a] hover:border"
              type="button"
            >
              ระบบคุณธรรมเเละความโปร่งใสในการดำเนินงาน
              <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen3 && (
              <div className="z-10 absolute bg-[#20a68a] divide-y divide-gray-100 rounded-lg shadow w-[22rem] mt-2">
                <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">หน้าเเรก</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">เกี่ยวกับ ITA</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#20a68a]">ติดต่อเรา</a></li>
                </ul>
              </div>
            )}
          </div>

          <a href="/revealing_the_trial">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              เผยเเพร่งบททดลอง
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}