<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Blog;
use DB;

class LoginController extends Controller
{
    public function addCredentials() {
    	$data = file_get_contents("php://input");
    	$request = json_decode($data);
    	
    	$user = new User;
    	$user->name = $request->name;
    	$user->email = $request->email;
    	$user->password = md5($request->password);
    	$user->save();

    	return response()->json(['msg' => 'created successfully'],200);
    }

    public function verifyUser() {
    	$data = file_get_contents("php://input");
    	$request = json_decode($data);
		
    	$pass = md5($request->password);

    	$user = User::where('email', $request->email)->where('password', $pass)->first();

    	if ($user) {
    		return response()->json($user,200);
    	} else {
    		return response()->json(['status' => 'fail', 'message' => 'Bad Request Email or Password is Incorrect']);
    	}
    }

    public function blogList() {
    	$blog = Blog::get();

    	return response()->json($blog,200);
    }

    public function addBlog() {
    	$data = file_get_contents("php://input");
    	$request = json_decode($data);

    	$blog = new Blog();

    	$blog->title = $request->title;
    	$blog->sub_title = $request->sub_title;
    	$blog->tags = $request->tags;
    	$blog->content = $request->content;

    	if ($blog->save()) {
    		return response()->json(['message' => 'Blog Created'],200);
    	} else {
    		return response()->json(['message' => 'Someting went wrong'],402);
    	}
    }

    public function deleteBlog($id) {
    	$blog = DB::table('Blogs')->where('id',$id)->delete();

    	if ($blog) {
    		return response()->json(['msg' => 'deleted successfully'],200);
    	} else {
    		return response()->json(['msg' => 'Someting went wrong'],402);
    	}
    }

    public function editBlog($id) {
    	$blog = Blog::where('id',$id)->first();
    	if ($blog) {
    		return response()->json($blog,200);	
    	} else {
    		return response()->json(['msg' => 'Someting went wrong'],402);
    	}
    	
    }

    public function updateBlog() {
    	$data = file_get_contents("php://input");
    	$request = json_decode($data);

    	$blog = Blog::find($request->id);
    	
    	$blog->title = $request->title;
    	$blog->sub_title = $request->sub_title;
    	$blog->tags = $request->tags;
    	$blog->content = $request->content;

    	if ($blog->save()) {
    		return response()->json(['msg' => 'Updated successfully'],200);
    	} else {
    		return response()->json(['msg' => 'Someting went wrong'],402);
    	}
    }
}
