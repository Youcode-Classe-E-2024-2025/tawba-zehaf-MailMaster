<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\CampaignController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('newsletters', NewsletterController::class);
    Route::apiResource('subscribers', SubscriberController::class);
    Route::apiResource('campaigns', CampaignController::class);
});