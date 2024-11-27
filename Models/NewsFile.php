<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\News;

class NewsFile extends Model
{
    use HasFactory;
    protected $table = 'news_file';
    protected $fillable = ['news_file','news_id'];

    public function news()
    {
        return $this->belongsTo(News::class,'news_id');
    }
}
