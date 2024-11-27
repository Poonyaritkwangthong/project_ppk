<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class NewsTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $news_type = NewsType::all();
        return response()->json(
            $news_type,
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors(),
            ], 422);
        }

        $news_type = NewsType::create($request->all());
        return response()->json([
            'message' => 'เพิ่มประเภทข่าวสำเร็จ',
            'news_type' => $news_type
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $news_type = NewsType::find($id);
        if (!$news_type) {
            return response()->json([
                'message' => 'ไม่พบประเภทข่าวที่จะเเก้ไข!'
            ], 404);
        }
        return response()->json(
             $news_type
        , 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $news_type = NewsType::find($id);
        if (!$news_type) {
            return response()->json([
                'message' => 'ไม่พบประเภทข่าวที่จะเเก้ไข'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'type_name

            ' => 'sometimes|required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validator failed',
                'error' => $validator->errors(),
            ], 422);
        }

        $news_type->update($request->all());

        return response()->json([
            'message' => 'เเก้ไขประเภทข่าวสำเร็จ',
            'news_type' => $news_type
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $news_type = NewsType::find($id);

        if (!$news_type) {
            return response()->json([
                'message' => 'ไม่พบประเภทข่าวที่จะลบ!'
            ], 404);
        }
        $news_type->delete();

        return response()->json([
            'message' => 'ลบประเภทข่าวสำเร็จ'
        ], 200);
    }
}
