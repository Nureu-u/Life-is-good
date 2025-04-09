const playlist = [
    {
      title: "Somebody That I Used to Know",
      artist: "Neuro-sama and Evil",
      src: "music/Somebody_That_I_Used_to_Know_by_Neuro-Evil.mp3",
      cover: "images/Somebody_That_I_Used_to_Know_by_Neuro-Evil.jpeg"
    },
    {
      title: "Dancin'",
      artist: "Neuro-sama",
      src: "music/Dancin'_by_Neuro-sama.mp3",
      cover: "images/Dancin'_by_Neuro-sama.jpg"
    },
    {
        title: "LIFE",
        artist: "Neuro-sama",
        src: "music/LIFE_Neuro-sama.mp3",
        cover: "images/LIFE_Neuro-sama.jpg"
    },
    {
        title: "mumei",
        artist: "Nanashi Mumei Ch. hololive-EN",
        src: "music/「MV」mumei.mp3",
        cover: "images/「MV」mumei.jpeg"
    },
    {
        title: "【original】#あくあ色ぱれっと【ホロライブ⧸湊あくあ】",
        artist: "Minato Aqua",
        src: "music/あくあ色ぱれっと.mp3",
        cover: "images/あくあ色ぱれっと.jpeg"
    }, 
    {
        title: "Caramel Pain ⧸ 星街すいせい(official)",
        artist: "Hoshimachi Suisei",
        src: "music/Caramel Pain ⧸ 星街すいせい(official).mp3",
        cover: "images/Caramel Pain ⧸ 星街すいせい(official).jpeg"
    },
    {
        title: "Golden Time Rubber",
        artist: "Hoshimachi Suisei",
        src: "music/Golden Time Rubber.mp3",
        cover: "images/Golden_Time_Rubber.jpg"
    },
    {
        title: "【original】メイジ・オブ・ヴァイオレット【ホロライブ⧸紫咲シオン】",
        artist: "Murasaki Shion",
        src: "music/【original】メイジ・オブ・ヴァイオレット【ホロライブ⧸紫咲シオン】.mp3",
        cover: "images/【original】メイジ・オブ・ヴァイオレット【ホロライブ⧸紫咲シオン】.jpeg"
    },
    {
        title: "ビビデバ ⧸ 星街すいせい(official)",
        artist: "Hoshimachi Suisei",
        src: "music/ビビデバ ⧸ 星街すいせい(official).mp3",
        cover: "images/ビビデバ ⧸ 星街すいせい(official).jpg"
    },
  ];
  
  const playlistDiv = document.getElementById("playlist");
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const cover = document.getElementById("cover");
  
  playlist.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <div class="song-title">${song.title}</div>
    `;
    songDiv.onclick = () => {
      playSong(index);
    };
    playlistDiv.appendChild(songDiv);
  });
  
  function playSong(index) {
    const song = playlist[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    audio.play();
  }
  
let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function loadPlaylist(list) {
  playlistDiv.innerHTML = "";
  list.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <div class="song-title">${song.title}</div>
    `;
    songDiv.onclick = () => playSong(index, list);
    playlistDiv.appendChild(songDiv);
  });
}

loadPlaylist(playlist);

// Phát bài
function playSong(index, list = playlist) {
  currentIndex = index;
  const song = list[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  audio.play();

  // Cập nhật bài hiện tại vào biến toàn cục
  currentSong = song;
}

// Shuffle
document.getElementById("btn-shuffle").onclick = () => {
  isShuffle = !isShuffle;
  alert(isShuffle ? "🔀 Shuffle ON" : "🔀 Shuffle OFF");
};

// Repeat
document.getElementById("btn-repeat").onclick = () => {
  isRepeat = !isRepeat;
  alert(isRepeat ? "🔁 Repeat ON" : "🔁 Repeat OFF");
};

// Phát bài kế tiếp sau khi kết thúc
audio.onended = () => {
  if (isRepeat) {
    audio.play(); // phát lại
  } else if (isShuffle) {
    const next = Math.floor(Math.random() * playlist.length);
    playSong(next);
  } else {
    const next = (currentIndex + 1) % playlist.length;
    playSong(next);
  }
};

// Thêm vào playlist cá nhân (favorites)
document.getElementById("btn-fav").onclick = () => {
  if (!currentSong) return alert("Hãy chọn bài hát trước!");

  const exists = favorites.find(s => s.src === currentSong.src);
  if (!exists) {
    favorites.push(currentSong);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("✅ Đã thêm vào playlist cá nhân!");
  } else {
    alert("📝 Bài hát đã có trong playlist!");
  }
};

// Tìm kiếm
document.getElementById("search").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = playlist.filter(song =>
    song.title.toLowerCase().includes(keyword) ||
    song.artist.toLowerCase().includes(keyword)
  );
  loadPlaylist(filtered);
});
