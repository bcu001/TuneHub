import { useState, useEffect } from "react";
import Song from "../../components/song/Song";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar"
// songImage
// songID
// songName
// artist

function Home() {
  useEffect(() => {
    document.title = "TuneHub | Home";
  }, []);

  const [blurSongs, setBlurSongs] = useState(false);
  const [songs, setSongs] = useState([
    {
      songID: 1,
      songName: "Brown Munde",
      songImage:
        "https://imgs.search.brave.com/TOtfl01U0Xm-W8D8zIprzS1FZzug_QEsAkkb33GhbvM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLUhXdnZt/Vkp3OXVKeG5tUHkt/eW5oS3V3LXQ1MDB4/NTAwLmpwZw",
      artist: "AP Dillon",
      songUrl: "../songs/BrownMunde.mp3",
    },
    {
      songID: 2,
      songName: "Love Dose",
      songImage:
        "https://imgs.search.brave.com/edfCn8ffrwY64QCBTsEvXEXdIedYqg4h7QP_S_3LGlQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpqUmtaakF4/TnpFdE0yUTFNaTAw/T0RGaExXSmlNbVV0/Tmprd09HSTVNelJp/TlRKalhrRXlYa0Zx/Y0djQC5qcGc",
      artist: "Yo Yo Honey Singh",
      songUrl: "../songs/loveDose.mp3",
    },
    {
      songID: 3,
      songName: "Despacito",
      songImage:
        "https://imgs.search.brave.com/CHMZ4j-KgrqJYSkkslyjzM7l4e_zffFRclaQOmLAZ8E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTF4ZmYxb1RNZkwu/anBn",
      artist: "Louis Fonsi",
      songUrl: "../songs/Despacito.mp3",
    },
    {
      songID: 4,
      songName: "Millionare",
      songImage:
        "https://imgs.search.brave.com/lPgcrnzKOIt8y3Qe9FcN0_1ZcO8REMxoVu3WSnZ7u0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLWdxb0d6/eldPWDVSMjdtQ1ot/N2VjY2t3LXQ1MDB4/NTAwLmpwZw",
      artist: "Yo Yo Honey Singh",
      songUrl: "../songs/Millionare.mp3",
    },
  ]);

  return (
    <>
      <SearchBar />
      {/* Check dribble bookmark or inspiration.png of tunehub repo */}
      <div className="transition-all duration-500 ease-in-out flex flex-wrap gap-5 justify-center  ">
        {songs.map((s) => (
          <Song
            key={s.songID} // Added a key for React optimization
            songID={s.songID}
            songName={s.songName}
            songImage={s.songImage}
            artistName={s.artist}
            songUrl={s.songUrl}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
