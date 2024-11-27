<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $agency = Agency::all();
        return response()->json($agency, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ตรวจสอบข้อมูลที่ส่งเข้ามา
        $validator = Validator::make($request->all(), [
            'agency_name' => 'required|string|max:255'
            // เพิ่มกฎสำหรับฟิลด์อื่น ๆ ตามต้องการ
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // บันทึกข้อมูล
        $agency = Agency::create($request->all());

        return response()->json([
            'message' => 'เพิ่มหน่วยงานสำเร็จ',
            'agency' => $agency,
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $agency = Agency::find($id);
        if (!$agency) {
            return response()->json([
                'message' => 'ไม่พบหน่วยงานที่จะเเก้ไข!'
            ], 404);
        }
        return response()->json(
             $agency
        , 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $agency = Agency::find($id);

        if (!$agency) {
            return response()->json([
                'message' => 'ไม่พบหน่วยงานที่จะเเก้ไข!'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'agency_name' => 'sometimes|required|string|max:255'
            // เพิ่มกฎสำหรับฟิลด์อื่น ๆ
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $agency->update($request->all());

        return response()->json([
            'message' => 'เเก้ไขหน่วยงานสำเร็จ',
            'agency' => $agency,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $agency = Agency::find($id);

    if (!$agency) {
        return response()->json([
            'message' => 'ไม่พบหน่วยงานที่จะลบ!'
        ], 404);
    }

    $agency->delete();

    return response()->json([
        'message' => 'ลบหน่วยงานสำเร็จ',
    ], 200);
}
}
