### Notification

"Leaning `Elixir` and `PostgreSQL` and build a million dollar company that will last forever"- `Gari`

```js
defmodule Math do
  def sum(a, b) do
    a + b
  end
end

// Then
SELECT * from Elixir WHERE databaseEngine like 'PostgreSQL' LIMIT 1;
```

```

What Notifications?
* On new follower
* On Post Likes
* On Story Reaction
* LikeMe Notifications
* Verification Notifications

Notification:
        [users collection].(uid)--------->[ Notification ]-----------> [Reducer](actions)
                                                 |
                                [Read](click)          [Not Read] ---> Read remain false in the collection
                                  |
                        [Update Collection] ----> Read is now true
```

# LikeMe app

THIS IS A SOCIAL DATING APP THAT ALLOWS USERS TO POST THEIR RELATIONSHIP STATUS AND BE ABLE TO FIND THEIR PARTNERS. THIS APPLICATION WAS DEVELOPED FOR TESTING PURPOSES ONLY.

### LikeMe App

- Check the deployed version [LIKEME](https://likeme-a104d.web.app/)
  THIS APPLICATION IS USING A LOT OF TECHNOLOGIES WHICH ARE:

<p align="center">
<img src="https://img.shields.io/static/v1?label=language&message=css&color=critical"/>
<img src="https://img.shields.io/static/v1?label=language&message=html&color=blueviolet"/>
<img src="https://img.shields.io/static/v1?label=language&message=javascript&color=orange"/>
<img src="https://img.shields.io/static/v1?label=language&message=node&color=success"/>
<img src="https://img.shields.io/static/v1?label=framework&message=react&color=9cf"/>
</p>
<p align="center">
<img src="https://img.shields.io/static/v1?label=package&message=redux&color=purple"/>
<img src="https://img.shields.io/static/v1?label=package&message=react-redux&color=red"/>
<img src="https://img.shields.io/static/v1?label=package&message=material-ui/core&color=pink"/>
<img src="https://img.shields.io/static/v1?label=package&message=material-ui/icons&color=gray"/>
<img src="https://img.shields.io/static/v1?label=package&message=material-ui/lab&color=yellow"/>
<img src="https://img.shields.io/static/v1?label=package&message=axios&color=orange"/>
<img src="https://img.shields.io/static/v1?label=package&message=react-router-dom&color=green"/>
<img src="https://img.shields.io/static/v1?label=package&message=react-icons&color=purple"/>
<img src="https://img.shields.io/static/v1?label=package&message=react-text-truncate&color=green"/>
<img src="https://img.shields.io/static/v1?label=package&message=use-sound&color=blue"/>
<img src="https://img.shields.io/static/v1?label=package&message=firebase&color=purple"/>
<img src="https://img.shields.io/static/v1?label=package&message=react-dom&color=lightseagreen"/>
<img src="https://img.shields.io/static/v1?label=package&message=uuid&color=red"/>
</p>

### App interface

#### 1. Welcome Page

- This is just a welcome page that loads for some seconds.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-56-18-221.jpg" alt="demo"/> 
</p>

#### 2. Authentication Page

- This page allows users to authenticate using various providers. The authentication is handled using firebase.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-56-22-234.jpg" alt="demo"/> 
</p>

#### 3. TnC Page

- Terms and condition screen allows users to read terms and conditions for the use of the Application. If they aggree with the tnc they can join.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2014-20-39-244.jpg" alt="demo"/> 
</p>

#### 4. Home Page

- Home page is nothing, depending on the device you are using, it shows users, posts, etc
- There's a header where you can navigate to where ever you want to go and a search bar which allows you to search people who joined this app.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-56-42-975.jpg" alt="demo"/> 
</p>

#### 5. Profile Page

- Profile page is nothing, it shows the profile of the selected user, if the user selected is the current user then there are more options for logging out of the app. It also shows the selected users posts

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-57-09-887.jpg" alt="demo"/> 
</p>

#### 9. Messages Page

- This is where you can find different possible chats

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2014-29-36-366.jpg" alt="demo"/> 
</p>

#### 10. Users Page

- This is where you can find all the users that are currently using this application

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-57-18-518.jpg" alt="demo"/> 
</p>

#### 11. Message Chat

This is nothing but a regular social chat that allows users to send messages privately to their partners and friends as well as sending pictures

##### 11.1

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-59-55-222.jpg" alt="demo"/> 
</p>

##### 11.2

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2014-00-15-229.jpg" alt="demo"/> 
</p>

#### 12. Status or Fleets

- Users can also post fleets or status, and these last only for **24 hrs** if they are not deleted.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-57-33-965.jpg" alt="demo"/> 
</p>

#### 13. Posting a pictures

- Users are allowed to post pictures, and select their current status as well as posting caption, disabling their current location is also the part of posting a picture.

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-59-19-029.jpg" alt="demo"/> 
</p>

#### 13. Posts

- Users are allowed to like the post
- users are allowed to comment, view likes
- if the users is the owner of the post he can delete the post

##### 13.1 Comments Of the Post

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-57-58-506.jpg" alt="demo"/> 
</p>

##### 13.1 Likes Of the Post

<p align="center">
    <img src="https://github.com/CrispenGari/like-me-App/blob/main/pics/bandicam%202021-04-20%2013-58-04-057.jpg" alt="demo"/> 
</p>

### Credits

- [Stuckoverflow](https//www.stackoverflow.com/)
- [All People Who was testing the app]()
