import React from 'react'
import Appbar from '../components/appbar'

export default function page() {
  return (
    <div>
      <Appbar></Appbar>
      hello 2
    </div>
  )
}

import React from 'react'

export default function page() {
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
    
 };
  return (
    <div>
       <div className="p-6 max-w-lg mx-auto">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center mb-4">
                        <input
                          type="file"
                          name="files"
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
                    </div>
                  </div>
    </div>
  )
}

