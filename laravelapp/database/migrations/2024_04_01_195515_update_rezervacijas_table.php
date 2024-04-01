<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rezervacijas', function (Blueprint $table) {
            $table->boolean('osiguranje')->default(false)->change();
            $table->text('napomena')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rezervacijas', function (Blueprint $table) {
            $table->boolean('osiguranje')->change();
            $table->text('napomena')->change();
        });
    }
};
