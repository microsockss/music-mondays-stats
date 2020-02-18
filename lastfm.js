var userList = ["microsocks", "savethemanatee", "maxteryi83", "nia-bb"];

var lastfm = new LastFM({
  apiKey: "473a07fbed21159d6a2eb70948df5a34"
});

var topAlbums = [];
var usersParsed = 0;

function addUserAlbums(username) {
  lastfm.user.getTopAlbums(
    { user: username, period: "7day" },
    {
      success: function(data) {
        // Add top 25 albums to topAlbums array
        for (i = 0; i < 25; i++) {
          var duplicate = false;
          // Store album data in object
          var currentAlbum = new Album();
          currentAlbum.name = data.topalbums.album[i].name;
          currentAlbum.scrobbles = data.topalbums.album[i].playcount;
          // Check if album exists already
          if (topAlbums.length != 0) {
            for (n = 0; n < topAlbums.length; n++) {
                if (topAlbums[n].name == currentAlbum.name) {
                    duplicate = true;
                    topAlbums[n].scrobbles = parseInt(topAlbums[n].scrobbles) + parseInt(currentAlbum.scrobbles);
                  }
            }
          }
          // If not, add it to list
          if (!duplicate) {
            topAlbums.push(currentAlbum);
          }
        }
        usersParsed++;
        if (usersParsed == userList.length) {
            sort();
        }
      },
      error: function(code, message) {
      }
    }
  );
}

class Album {
  constructor(name, scrobbles) {
    this.name = name;
    this.scrobbles = scrobbles;
  }
}

// Add each user's albums to list
userList.forEach(function(entry) {
  addUserAlbums(entry);
});

// Sort list into toplist
function sort() {
    topAlbums.sort(function(a, b) {
        return b.scrobbles - a.scrobbles;
    });
    output();
}

// Output toplist to html
function output() {
    for (i = 0; i < 10; i++) {
        var nameElement = document.getElementById((i + 1).toString());
        nameElement.innerHTML = topAlbums[i].name;
        var scrobbleElement = document.getElementById((i + 1).toString() + - 2);
        scrobbleElement.innerHTML = topAlbums[i].scrobbles;
      }      
}