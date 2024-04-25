<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use App\Models\Rezervacija;
use App\Models\User;
use Illuminate\Http\Request;

class StatistikaController extends Controller
{
    public function getStats()
    {
        // Ukupan broj korisnika
        $totalUsers = User::count();

        // Ukupan broj automobila
        $totalAutos = Auto::count();

        // Ukupan broj rezervacija
        $totalReservations = Rezervacija::count();

        // Ukupan broj rezervacija po automobilu
        $reservationsPerAuto = Rezervacija::select('automobil_id')
            ->selectRaw('count(*) as total')
            ->groupBy('automobil_id')
            ->get();

        // Ukupan broj rezervacija po mesecima
        $reservationsPerMonth = Rezervacija::selectRaw('YEAR(datum_od) as year, MONTH(datum_od) as month, count(*) as total')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'total_autos' => $totalAutos,
            'total_reservations' => $totalReservations,
            'reservations_per_auto' => $reservationsPerAuto,
            'reservations_per_month' => $reservationsPerMonth,
        ]);
    }
}
