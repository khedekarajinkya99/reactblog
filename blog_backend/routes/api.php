<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('cors:api')->post('/signUp', 'LoginController@addCredentials');

Route::middleware('cors:api')->post('/loginUser', 'LoginController@verifyUser');

Route::middleware('cors:api')->get('/getBlog', 'LoginController@blogList');

Route::middleware('cors:api')->post('/addBlog', 'LoginController@addBlog');

Route::middleware('cors:api')->get('/deleteBlog/{id}', 'LoginController@deleteBlog');

Route::middleware('cors:api')->get('/editBlog/{id}', 'LoginController@editBlog');

Route::middleware('cors:api')->post('/updateBlog', 'LoginController@updateBlog');

