<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsFile;
use App\Models\News;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $news = News::with(['news_type', 'agency'])->get();
        return response()->json($news, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'news_title' => 'required|string|max:255',
            'news_link' => 'required|string',
            'news_detail' => 'required',
            'news_status' => 'required',
            'start_announcing' => 'required',
            'end_announcing' => 'required',
            'news_type_id' => 'required',
            'agency_id' => 'required',
            'files' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors(),
            ], 422);
        }

        try {
            $input = $request->all();
            $news = News::create($input);

            if ($news) {

                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        $extension = $file->getClientOriginalExtension();
                        $filename = time() . '_' . uniqid() . '.' . $extension;
                        $file->move('files/news/', $filename);
                        NewsFile::create([
                            'news_id' => $news->id,
                            'news_file' => $filename,
                        ]);
                    }
                }
                return response()->json(['message' => 'เพิ่มข่าวสำเร็จ'], 200);
            } else {
                return response()->json(['message' => 'เพิ่มข่าวไม่สำเร็จ'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'มีบางอย่างผิดพลาด'], 500);
        }
    }

    public function show(string $id)
    {
        //
        $news = News::with(['news_type', 'agency'])->find($id);
        if (!$news) {
            return response()->json([
                'message' => 'ไม่พบข่าวที่จะเเก้ไข'
            ], 404);
        }
        return response()->json(
            $news,
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $news = News::find($id);
        $validator = Validator::make($request->all(), [
            'news_title' => 'required|string|max:255',
            'news_link' => 'required|string',
            'news_detail' => 'required',
            'news_status' => 'required',
            'start_announcing' => 'required',
            'end_announcing' => 'required',
            'news_type_id' => 'required',
            'agency_id' => 'required',
            'files' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors(),
            ], 422);
        }

        try {



                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        $destination = 'files/news/' . $news->file;
                        if (File::exists($destination)) {
                            File::delete($destination);
                        }
                        $extension = $file->getClientOriginalExtension();
                        $filename = time() . '_' . uniqid() . '.' . $extension;
                        $file->move('files/news/', $filename);
                        NewsFile::create([
                            'news_id' => $news->id,
                            'news_file' => $filename,
                        ]);
                    }

                $news->save();
                return response()->json(['message' => 'เพิ่มข่าวสำเร็จ'], 200);
            } else {
                return response()->json(['message' => 'เพิ่มข่าวไม่สำเร็จ'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'มีบางอย่างผิดพลาด'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        try {
            $destination = 'files/news' . $news->image;
            if (File::exists($destination)) {
                File::delete($destination);
            }

            $additionalFiles = NewsFile::where('news_id', $news->id)->get();
            foreach ($additionalFiles as $files) {
                $filesPath = 'files/news' . $files->news_file;
                if (File::exists($filesPath)) {
                    File::delete($filesPath);
                }
            }

            NewsFile::where('news_id', $news->id)->delete();
            $news->delete();
        } catch (\Exception $e) {
            //throw $th;
        }
    }
}
