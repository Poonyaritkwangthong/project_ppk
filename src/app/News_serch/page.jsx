import React from 'react'

export default function page() {
    return (
        <div className='bg-[#1bb598] min-h-screen flex flex-col items-center'>
            {/* Header */}
            <div className='bg-[#20a68a] w-[100rem] h-[12rem] text-center '>
                <h1 className='text-white text-6xl mt-[4rem]'>หน้าค้นหาข่าว</h1>
            </div>

            {/* Main Content Container */}
            <div className='bg-white w-[100rem] mt-8 p-6 rounded-lg shadow-lg flex'>

                {/* Left Section */}
                <div className='flex-1 pr-4'>
                    {/* Top Buttons */}
                    <div className='flex gap-4 mb-4'>
                        <button className='bg-[#20a68a] text-white py-2 px-4 rounded-md'>เพิ่มขนาดตัวหนังสือ +</button>
                        <button className='bg-[#20a68a] text-white py-2 px-4 rounded-md'>ลดขนาดตัวหนังสือ -</button>
                    </div>
                    <div className='border-r-2 border-dotted border-[#20a68a] p-4'>
                        {/* Search Fields */}
                        <div className='bg-gray-100 p-4 rounded-lg mb-4 text-[#20a68a]'>
                            <div className='flex gap-4 items-center mb-2'>
                                <label htmlFor=''>ปีที่ค้าหา</label>
                                <input type='text' className='border border-gray-300 rounded-md p-2 flex-grow' /> ระบุปีที่ค้นหาเป็น พ.ศ.
                            </div>
                            <div className='flex gap-4 items-center mb-2'>
                                <label>ค้นหาเอกสาร</label>
                                <input type='text' className='border border-gray-300 rounded-md p-2 flex-grow' />
                                <button className='bg-[#20a68a] text-white px-4 py-2 rounded-md'>ค้นหา</button>
                            </div>
                            <div className='flex gap-4 mb-2 items-center'>
                                <label htmlFor='' className='text-[#20a68a]'>หน่วยงาน</label>
                                <select
                                    id='currency'
                                    name='currency'
                                    className='p-2 rounded-md   text-[#20a68a] border border-[#20a68a] text-center w-[44.9rem]'
                                >
                                    <option>หน่วยงาน -- </option>
                                    <option>CAD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                        </div>

                        {/* List of Documents */}
                        <div className='space-y-4 p-4 border-t-2 border-dotted border-[#20a68a]'>
                            <div className='flex justify-end'>
                            <button className='bg-[#20a68a] px-4 py-2 rounded-md'>เดือน</button>
                            </div>
                            <div className='p-4 border border-[#20a68a] rounded-lg'>
                                <h3 className='font-bold text-[#20a68a]'>หัวข้อข่าว</h3>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <div className='flex gap-2'>
                                    <p className='text-black'>หน่วยงาน : </p>
                                    <p className='text-[#20a68a]'>อ่าน 45 ครั้ง</p>
                                </div>
                            </div>
                            <div className='p-4 border border-[#20a68a] rounded-lg'>
                                <h3 className='font-bold text-[#20a68a]'>หัวข้อข่าว</h3>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <div className='flex gap-2'>
                                    <p className='text-black'>หน่วยงาน : </p>
                                    <p className='text-[#20a68a]'>อ่าน 77 ครั้ง</p>
                                </div>
                            </div>
                            <div className='p-4 border border-[#20a68a] rounded-lg'>
                                <h3 className='font-bold text-[#20a68a]'>หัวข้อข่าว</h3>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <div className='flex gap-2'>
                                    <p className='text-black'>หน่วยงาน : </p>
                                    <p className='text-[#20a68a]'>อ่าน 15 ครั้ง</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex justify-end'>
                        <button className='bg-[#20a68a] text-white px-4 py-2 rounded-md mb-5'>เพิ่มข่าว</button>
                    </div>
                    {/* Right Section */}
                    <div className='flex-1 pl-4 w-[42rem] p-4'>
                        {/* News Header */}
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='font-bold text-3xl text-[#20a68a]'>หัวข้อข่าว</h2>
                        </div>

                        <div className='border-t border-gray-300 pt-4'>
                            <h3 className='font-bold mb-2'>รายละเอียด:</h3>
                            <p className='text-gray-500'>รายละเอียดเนื้อหา...</p>
                        </div>
                        <div className='border-t border-gray-300 pt-4'>
                            <h3 className='font-bold mb-2 text-[#20a68a]'>ไฟล์เอกสารแนบ:</h3>
                            <p className='text-gray-500'>ไม่มีเอกสารแนบ</p>
                        </div>
                        <div className='border-t border-gray-300 pt-4'>
                            <p>หน่วยงาน: XYZ</p>
                            <p>วันที่ประกาศ: 20/02/2024</p>
                            <p>ผู้ประกาศ: Admin</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
