# personalhobbyProject
An Express project to manage music library. It have all the CRUD feature api built using JavaScript framework and MonggoDB. 


***Add New Music***
Body Attribute Names:
music_name
description
music_length
artist_name
bio
age
music_type

Api format: host/api/music
Method: POST
![](/ScreenShots/AddingNewMusic.png)


***Deleting Music***
Deleting require
musicId
METHOD: DELETE
API Format: host/api/music/:musicId
![](/ScreenShots/DeleteMusicById.png)


***Find Music by Id***
Require parameter
musicId
Method: Get
API Format: host/api/music/:musicId
![](/ScreenShots/FindById.png)

***Updating the existing music record***
Required paramater and body:
parameter: 
musicId
body: 
as per the requirement
music_name
description
music_length
artist_name
bio
age
music_type

API FORMAT: /host/api/music/:musicId
![](/ScreenShots/UpdatingData.png)

***Fetch All the music***
required parameter and body: nothing
API Format; /host/api/music
![](/ScreenShots/fetchAllTheMusic.png)

***What if the ID is not correct while fetching and deleting***
it will respond like this:
![](/ScreenShots/try_to_delete_by_random_id.png)
![](/ScreenShots/FindByInvalidId.png)
![](/ScreenShots/NoDataFound_WrongId.png)
