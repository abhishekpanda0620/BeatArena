import { Song } from "@/store/gameStore";

export const DUMMY_SONGS: Song[] = [
    {
        id: 1,
        title: "Shape of You",
        artist: "Ed Sheeran",
        audio_url: "/songs/shape_of_you.mp3", // We need to add these files later
        options: ["Shape of You", "Perfect", "Castle on the Hill", "Galway Girl"],
        correct_option: "Shape of You"
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        audio_url: "/songs/blinding_lights.mp3",
        options: ["Starboy", "Blinding Lights", "Save Your Tears", "In Your Eyes"],
        correct_option: "Blinding Lights"
    },
    {
        id: 3,
        title: "Levitating",
        artist: "Dua Lipa",
        audio_url: "/songs/levitating.mp3",
        options: ["Don't Start Now", "Physical", "Levitating", "New Rules"],
        correct_option: "Levitating"
    }
];
