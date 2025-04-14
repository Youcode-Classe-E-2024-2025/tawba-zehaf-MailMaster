<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\SubscriberController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/unsubscribe/{email}', [SubscriberController::class, 'unsubscribe'])->name('unsubscribe');
