'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// กำหนด libraries ที่ต้องการโหลด
const libraries: Libraries = ['places', 'drawing', 'geometry'];

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries,
  });

  // แสดงข้อความเมื่อเกิดข้อผิดพลาด
  if (loadError) {
    return (
      <p>
        Encountered an error while loading Google Maps: {loadError.message}
      </p>
    );
  }

  // แสดงข้อความระหว่างรอ script โหลด
  if (!scriptLoaded) {
    return <p>Map Script is loading...</p>;
  }

  // หากโหลดสำเร็จ แสดง children
  return <>{children}</>;
}