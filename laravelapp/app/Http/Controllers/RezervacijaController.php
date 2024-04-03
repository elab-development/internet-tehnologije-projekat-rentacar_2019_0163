<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rezervacija;
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
        $rezervacije = Rezervacija::all();
        return response()->json(['data' => $rezervacije]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
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

        $rezervacija = Rezervacija::create($request->all());

        return response()->json(['data' => $rezervacija], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $rezervacija = Rezervacija::findOrFail($id);
        return response()->json(['data' => $rezervacija]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
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
        $rezervacija->update($request->all());

        return response()->json(['data' => $rezervacija]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $rezervacija = Rezervacija::findOrFail($id);
        $rezervacija->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
