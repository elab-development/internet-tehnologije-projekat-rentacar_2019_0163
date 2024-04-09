<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Ovo je ruta na koju korisnik dolazi sa linka za resetovanje lozinke iz e-maila
Route::get('reset-password/{token}', function ($token) {
    // imamo neki view 'reset-password' gde korisnik unosi novu lozinku
    return view('auth.reset-password', ['token' => $token]);
})->name('password.reset');

Route::post('reset-password', function (Request $request) {
    // Validacija zahteva
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|string|min:6|confirmed',
    ]);

    // Resetovanje lozinke koristeći token, email, i novu lozinku
    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) use ($request) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();

            $request->session()->flash('status', 'Password reset successfully!');
        }
    );

    if ($status == Password::PASSWORD_RESET) {
        return redirect()->route('login')->with('status', __($status));
    } else {
        return back()->withErrors(['email' => [__($status)]]);
    }
})->name('password.update');
