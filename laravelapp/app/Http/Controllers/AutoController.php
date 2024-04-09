<?php

namespace App\Http\Controllers;

use App\Http\Resources\AutoResource;
use Illuminate\Http\Request;
use App\Models\Auto;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $autos = Auto::all();
        return response()->json(['data' => AutoResource::collection($autos)]);
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
            'marka' => 'required',
            'model' => 'required',
            'godina_proizvodnje' => 'required',
            'boja' => 'required',
            'broj_vrata' => 'required|integer',
            'prenos' => 'required|in:automatski,manuelni',
            'registraciona_oznaka' => 'required|unique:autos',
            'istek_registracije' => 'required|date',
            'maksimalan_broj_putnika' => 'required|integer',
            'cena_po_danu' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $auto = Auto::create($request->all());

        return response()->json(['data' => new AutoResource($auto)], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $auto = Auto::findOrFail($id);
        return response()->json(['data' => $auto]);
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
            'marka' => 'required',
            'model' => 'required',
            'godina_proizvodnje' => 'required',
            'boja' => 'required',
            'broj_vrata' => 'required|integer',
            'prenos' => 'required|in:automatski,manuelni',
            'registraciona_oznaka' => 'required|unique:autos,registraciona_oznaka,'.$id,
            'istek_registracije' => 'required|date',
            'maksimalan_broj_putnika' => 'required|integer',
            'cena_po_danu' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $auto = Auto::findOrFail($id);
        $auto->update($request->all());

        return response()->json(['data' => $auto]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $auto = Auto::findOrFail($id);
        $auto->delete();

        return response()->json(['message' => 'Auto deleted successfully']);
    }
}
