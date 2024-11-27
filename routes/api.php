<?php

use App\Http\Controllers\API\AgencyController;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\NewsTypeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('/agency',AgencyController::class);
Route::resource('/news_type',NewsTypeController::class);
Route::resource('/news',NewsController::class);
