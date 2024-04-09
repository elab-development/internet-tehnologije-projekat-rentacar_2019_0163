<?php

namespace App\Http\Controllers;

use App\Http\Resources\RezervacijaResource;
use Illuminate\Http\Request;
use App\Models\Rezervacija;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RezervacijaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Dobij trenutno ulogovanog korisnika
        $user = Auth::user();
        
        // Dobij rezervacije samo za trenutno ulogovanog korisnika
        $rezervacije = Rezervacija::where('user_id', $user->id)->get();
        
        return response()->json(['data' => RezervacijaResource::collection( $rezervacije)]);
    }

    public function store(Request $request)
    {
        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $validator = Validator::make($request->all(), [
            'automobil_id' => 'required|exists:autos,id',
            'datum_od' => 'required|date',
            'datum_do' => 'required|date|after:datum_od',
            'osiguranje' => 'required|boolean',
            'cena' => 'required|numeric',
            'napomena' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $rezervacija = Rezervacija::create(array_merge($request->all(), ['user_id' => $user_id]));

        return response()->json(['data' => new RezervacijaResource( $rezervacija)], 201);
    }

    public function update(Request $request, $id)
    {
        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $validator = Validator::make($request->all(), [
            'automobil_id' => 'required|exists:autos,id',
            'datum_od' => 'required|date',
            'datum_do' => 'required|date|after:datum_od',
            'osiguranje' => 'required|boolean',
            'cena' => 'required|numeric',
            'napomena' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $rezervacija = Rezervacija::findOrFail($id);
        
        // Proveri da li je korisnik vlasnik rezervacije pre nego što je ažurirate
        if ($rezervacija->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $rezervacija->update($request->all());

        return response()->json(['data' => new RezervacijaResource( $rezervacija)]);
    }

    public function destroy($id)
    {
        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $rezervacija = Rezervacija::findOrFail($id);
        
        // Proveri da li je korisnik vlasnik rezervacije pre nego što je obrišete
        if ($rezervacija->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $rezervacija->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
