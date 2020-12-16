var newSong;
var newArtist;
var shown = false;

function hideText() {
    $('#artist').animate({
        marginLeft: 0,
        opacity: 0
    }, 500);

    $('#song').animate({
        marginLeft: 0,
        opacity: 0
    }, 300);

    document.getElementById('song').classList.remove('scrolling');
    document.getElementById('artist').classList.remove('scrolling');
}

function updateText() {
    document.getElementById('artist').innerHTML = newArtist;
    document.getElementById('song').innerHTML = newSong;
}

function showText() {
    const isLongSong = document.getElementById('song').scrollWidth > document.getElementById('song').clientWidth;
    const isLongArtist= document.getElementById('artist').scrollWidth > document.getElementById('artist').clientWidth;

    $('#artist').animate({
        marginLeft: '7px',
        opacity: 1
    }, 500);
    
    $('#song').animate({
        marginLeft: '7px',
        opacity: 1
    }, 700);

    if(isLongSong) {
        setTimeout(() => {
            document.getElementById('song').classList.add('scrolling');
        }, 1000);
    }

    if(isLongArtist) {
        setTimeout(() => {
            document.getElementById('artist').classList.add('scrolling');
        }, 1000);
    }
}

function checkUpdate() {
    $.get("../../../Snip_Artist.txt", (artist) => {
    newArtist = artist.replace(/&/g, '&amp;');
    })
    .then(
        $.get("../../../Snip_Track.txt", (song) => {
            newSong = song.replace(/&/g, '&amp;');
        })
    )
    .then(displayData);

    setTimeout(checkUpdate, 3000);
}

function displayData() {
    const imgPath = '../../../Snip_Artwork.jpg?t=' + newSong + newArtist;

    if (newSong === document.getElementById('song').innerHTML) return;

    if(Boolean(newSong.length) && !shown) {
        $('#bigdiv').animate({
            opacity: 1,
        }, 400)
        shown = true;
    }

    if(!newSong.length && shown) {
        $('#bigdiv').animate({
            opacity: 0,
        }, 400)
        shown = false;
    }

    hideText();
    setTimeout(updateText, 300);
    setTimeout(showText, 400);

    document.getElementById('image').setAttribute('src', imgPath);
    document.getElementById('background-placeholder').style.backgroundImage = `url('${imgPath}')`;
    
    $('#image2').fadeOut(500, () => {
        document.getElementById('image2').setAttribute('src', imgPath);
        $('#image2').fadeIn(); 
    });

    $('#background').fadeOut(600, () => {
        document.getElementById('background').style.backgroundImage = `url('${imgPath}')`;
        $('#background').fadeIn();
    });
}

$(document).ready(checkUpdate);