<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $songs = [
            [
                'title' => 'Shape of You',
                'artist' => 'Ed Sheeran',
                'file_path' => 'songs/english/shape_of_you.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Shape of You', 'Perfect', 'Castle on the Hill', 'Galway Girl'],
                'correct_option' => 'Shape of You'
            ],
            [
                'title' => 'Blinding Lights',
                'artist' => 'The Weeknd',
                'file_path' => 'songs/english/blinding_lights.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Starboy', 'Blinding Lights', 'Save Your Tears', 'In Your Eyes'],
                'correct_option' => 'Blinding Lights'
            ],
            [
                'title' => 'Levitating',
                'artist' => 'Dua Lipa',
                'file_path' => 'songs/english/levitating.mp3',
                'language' => 'en',
                'difficulty' => 'medium',
                'options' => ['Don\'t Start Now', 'Physical', 'Levitating', 'New Rules'],
                'correct_option' => 'Levitating'
            ],
             [
                'title' => 'Kesariya',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/hindi/kesariya.mp3',
                'language' => 'hi',
                'difficulty' => 'easy',
                'options' => ['Kesariya', 'Apna Bana Le', 'Deva Deva', 'Rasiya'],
                'correct_option' => 'Kesariya'
            ],
            [
                'title' => 'Chaleya',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/hindi/chaleya.mp3',
                'language' => 'hi',
                'difficulty' => 'easy',
                'options' => ['Jhoome Jo Pathaan', 'Chaleya', 'Not Ramaiya Vastavaiya', 'Besharam Rang'],
                'correct_option' => 'Chaleya'
            ],
            [
                'title' => 'Believer',
                'artist' => 'Imagine Dragons',
                'file_path' => 'songs/english/believer.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Believer', 'Thunder', 'Radioactive', 'Demons'],
                'correct_option' => 'Believer'
            ],
            [
                'title' => 'Dance Monkey',
                'artist' => 'Tones and I',
                'file_path' => 'songs/english/dance_monkey.mp3',
                'language' => 'en',
                'difficulty' => 'medium',
                'options' => ['Dance Monkey', 'Never Seen the Rain', 'Bad Child', 'Johnny Run Away'],
                'correct_option' => 'Dance Monkey'
            ],
            [
                'title' => 'Stay',
                'artist' => 'The Kid LAROI & Justin Bieber',
                'file_path' => 'songs/english/stay.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Stay', 'Peaches', 'Yummy', 'Sorry'],
                'correct_option' => 'Stay'
            ],
            [
                'title' => 'Apna Bana Le',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/hindi/apna_bana_le.mp3',
                'language' => 'hi',
                'difficulty' => 'easy',
                'options' => ['Apna Bana Le', 'Kesariya', 'Deva Deva', 'Rasiya'],
                'correct_option' => 'Apna Bana Le'
            ],
            [
                'title' => 'Jhoome Jo Pathaan',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/hindi/jhoome_jo_pathaan.mp3',
                'language' => 'hi',
                'difficulty' => 'medium',
                'options' => ['Jhoome Jo Pathaan', 'Besharam Rang', 'Chaleya', 'Not Ramaiya Vastavaiya'],
                'correct_option' => 'Jhoome Jo Pathaan'
            ],
            [
                'title' => 'Tere Vaste',
                'artist' => 'Varun Jain',
                'file_path' => 'songs/hindi/tere_vaste.mp3',
                'language' => 'hi',
                'difficulty' => 'medium',
                'options' => ['Tere Vaste', 'Apna Bana Le', 'Phir Aur Kya Chahiye', 'Zihaal e Miskin'],
                'correct_option' => 'Tere Vaste'
            ],
            // Instrumentals - English
            [
                'title' => 'Pirates of the Caribbean',
                'artist' => 'Hans Zimmer',
                'file_path' => 'songs/english/pirates_of_caribbean.mp3',
                'language' => 'en',
                'difficulty' => 'hard',
                'options' => ['Pirates of the Caribbean', 'Game of Thrones', 'Star Wars', 'Avengers'],
                'correct_option' => 'Pirates of the Caribbean'
            ],
            [
                'title' => 'Harry Potter',
                'artist' => 'John Williams',
                'file_path' => 'songs/english/harry_potter.mp3',
                'language' => 'en',
                'difficulty' => 'hard',
                'options' => ['Harry Potter', 'Lord of the Rings', 'Narnia', 'Fantastic Beasts'],
                'correct_option' => 'Harry Potter'
            ],
            [
                'title' => 'Mission Impossible',
                'artist' => 'Lalo Schifrin',
                'file_path' => 'songs/english/mission_impossible.mp3',
                'language' => 'en',
                'difficulty' => 'hard',
                'options' => ['Mission Impossible', 'James Bond', 'Sherlock Holmes', 'Inception'],
                'correct_option' => 'Mission Impossible'
            ],
            // Instrumentals - Hindi
            [
                'title' => 'Kal Ho Naa Ho',
                'artist' => 'Shankar-Ehsaan-Loy',
                'file_path' => 'songs/hindi/kal_ho_naa_ho.mp3',
                'language' => 'hi',
                'difficulty' => 'hard',
                'options' => ['Kal Ho Naa Ho', 'Kabhi Khushi Kabhie Gham', 'Kuch Kuch Hota Hai', 'Veer-Zaara'],
                'correct_option' => 'Kal Ho Naa Ho'
            ],
            [
                'title' => 'Tum Hi Ho',
                'artist' => 'Mithoon',
                'file_path' => 'songs/hindi/tum_hi_ho.mp3',
                'language' => 'hi',
                'difficulty' => 'hard',
                'options' => ['Tum Hi Ho', 'Sunn Raha Hai', 'Chahun Main Ya Naa', 'Galliyan'],
                'correct_option' => 'Tum Hi Ho'
            ],
            [
                'title' => 'Jai Ho',
                'artist' => 'A.R. Rahman',
                'file_path' => 'songs/hindi/jai_ho.mp3',
                'language' => 'hi',
                'difficulty' => 'hard',
                'options' => ['Jai Ho', 'Chaiyya Chaiyya', 'Rang De Basanti', 'Maa Tujhe Salaam'],
                'correct_option' => 'Jai Ho'
            ]
        ];

        foreach ($songs as $song) {
            Song::create($song);
        }
    }
}
