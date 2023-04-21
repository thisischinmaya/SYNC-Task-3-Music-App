console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ratt Kamaal Hai - Guru Randhawa", filePath: "songs/1.mp3", coverPath: "covers/11.jpeg"},
    {songName: "Ban-Ja-Rani---Tumhari-Sulu_64", filePath: "songs/2.mp3", coverPath: "covers/12.jpeg"},
    {songName: "Naach Meri Rani - Guru Randhawa", filePath: "songs/3.mp3", coverPath: "covers/13.jpeg"},
    {songName: "Tere Te - Guru Randhawa", filePath: "songs/4.mp3", coverPath: "covers/14.jpeg"},
    {songName: "Suit Suit - Hindi Medium", filePath: "songs/5.mp3", coverPath: "covers/15.jpeg"},
    {songName: "Lagdi-Lahore-Di (Street Dancer_3D) ", filePath: "songs/6.mp3", coverPath: "covers/16.jpeg"},
    {songName: "Made In India - Guru Randhawa", filePath: "songs/7.mp3", coverPath: "covers/17.jpeg"},
    {songName: "Lahore - Guru Randhawa", filePath: "songs/8.mp3", coverPath: "covers/18.jpg"},
    {songName: "Patola (Blackmail)", filePath: "songs/9.mp3", coverPath: "covers/19.jpeg"},
    {songName: "Ishare Tere", filePath: "songs/10.mp3", coverPath: "covers/20.jpeg"},
    {songName: "High Rated Gabru", filePath: "songs/11.mp3", coverPath: "covers/21.jpg"},
    {songName: "Slowly Slowly", filePath: "songs/12.mp3", coverPath: "covers/22.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=11){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})