# OPIS
 1. Autentifikacija i upravljanje korisničkim nalogom
    *	Prijava i registracija korisnika: Aplikacija omogućava korisnicima da kreiraju svoje naloge i prijave se koristeći svoje kredencijale. Postoje opcije za odjavu kako bi se osigurala sigurnost sesija.
    
    * Prikaz i ažuriranje korisničkih podataka: Korisnici mogu pregledati svoje lične informacije i ažurirati ih po potrebi. Ova funkcionalnost uključuje i pregled dokumenata korisnika sa mogućnošću preuzimanja i brisanja istih .
     * Resetovanje lozinke: U slučaju da korisnici zaborave lozinku, postoji mogućnost njenog resetovanja. Klikom na odgovarajuće dugme na login formi, korisnicima se šalje mail sa resetacionim linkom. 
2. Upravljanje automobilima
    *	Pregled svih automobila: Svi korisnici mogu pregledati listu dostupnih automobila. Administratori imaju dodatne opcije za kreiranje, brisanje i ažuriranje informacija o automobilima .
    *	Pretraga automobila: Korisnici mogu koristiti funkcije pretrage da bi pronašli automobil po specifičnim kriterijumima kao što su marka, model, cena po danu, i slično .
    *	Kreiranje i brisanje automobila: Ove funkcije su ograničene na administratore, koji mogu dodavati nove automobile u sistem ili ih uklanjati iz ponude .
3. Rezervacije
    *	Kreiranje rezervacije: Obični korisnici mogu da rezervišu automobile iz ponude. Proces uključuje izbor automobila, datuma početka i završetka rezervacije, opciju osiguranja, i izračunavanje ukupne cene rezervacije .
    *	Pregled rezervacija: Korisnici mogu pregledati sve svoje aktivne i prethodne rezervacije, što im pomaže da upravljaju svojim planovima.
4. Statistika i izveštavanje
    *	Prikaz statistika: Administratori imaju pristup detaljnim statistikama kao što su broj rezervacija po mesecu i po automobilu, što pomaže u boljem razumevanju poslovanja .

# POKRETANJE APP

    cd laravelapp
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve

    cd reactprojekat
    npm install
    npm start

    




    
    


