import React from 'react'

export default function AppbarNews() {
  return (
    <div>
       <div className='bg-white h-[6rem] w-full p-4 flex justify-between border-b border-[#20a68a]'>
        <div className='h-[5] w-[4rem]'>
          <img src="https://www.ppkhosp.go.th/images/logoppk.png" alt="" />
        </div>
        <ul className='text-white flex justify-end gap-2 mt-2'>
          <a href="/home">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              เพิ่มข้อมูล
            </li>
          </a>
          <a href="/history">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              เเก้ไขข้อมูล
            </li>
          </a>
          <a href="/number_of_hospital_personnal">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              รายงาน
            </li>
          </a>

          <a href="/revealing_the_trial">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              ระบบจัดการ
            </li>
          </a>

          <a href="/revealing_the_trial">
            <li className='bg-[#20a68a] p-3 rounded-2xl hover:bg-white hover:text-[#20a68a] transition ease-in-out delay-50  hover:border-[#20a68a] hover:border'>
              ปิดโปรเเกรม
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}
