# Artist Guesser

_Made for Real-Time Web [@ cmda-minor-web 2020 - 2021](https://github.com/cmda-minor-web)_

<!-- ![Gifinder Mockups](https://user-images.githubusercontent.com/57795294/111635461-c7947800-87f7-11eb-94dc-198ce14e6aaa.png) -->

---

<!-------------------------- New Paragraph -------------------------->

## :pencil2: App description

**_Artist Guesser_**: the multiplayer game where you and your friends can guess the artist that made the artwork shown on the screen!  

The first player to say the correct artists name in the chat, gets 10 points added to their name. Still in first place after 10 rounds of guessing? You win!

<!-- [My work can be viewed right here](https://gifinder-pwa.herokuapp.com/). -->

</br> 

---

<!-------------------------- New Paragraph -------------------------->

## :pushpin: Table of Contents

- [Three Concepts](#three-Three-Concepts)
- [Chosen Concept](#sparkles-Chosen-Concept)
- [What does this Web App do?](#gem-What-does-this-Web-App-do?)
- [Wishlist](#crown-Wishlist)
- [API](#link-API)
- [Used Packages](#gift-Used-Packages)
- [Install](#inbox_tray-Install)
- [License](#closed_lock_with_key-License)
- [Sources](#books-Sources)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :three: Three Concepts 

Before I came up with my final concept, I had a brainstorm session and thought of three concepts.

![RTW_three_concepts](https://user-images.githubusercontent.com/57795294/114388314-cefb3700-9b93-11eb-9f12-ff754daff115.png)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :sparkles: Chosen Concept

The concept I chose is the second one - the Artist Guesser.

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :gem: What does this Web App do?


### General features
- Give points to the user that gave the correct answer first
- Keep a scoreboard for the current session

</br> 

### API based features
- Fetch & show the an artwork 
- Fetch & use the artworks artist

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :crown: Wishlist

Below is a list of features I'd love to add to Artist Guesser. The features are split up using the **M**o**SC**o**W** method.  


**M** - Must haves  
_These features are like requirements for the end product_  
- [x] Set up chat with usernames 
- [ ] Connect API
- [ ] Set up logic for guessing (answer must match artist name)
- [ ] Go to next page after guessing correctly

</br>

**S** - Should haves  
_These features are wanted, but not necessary for a usable product_  
- [ ] Add nice styling
- [ ] Put own messages on the right side of the chat
- [ ] Randomize order of artworks
- [ ] Set up point system
- [ ] Set up scoreboard
</br>

**C** - Could haves  
_These features can be added if these enough time to do so_  
- [ ] Give hints if the correct answer hasn't been given after a certain amount of time

</br>

**W** - Would haves  
_These features can be added in the future_  
- [ ] Set up all time best scoreboard
- [ ] Set up point system based on time (1000 points to start, lose 1 point every millisecond you don't answer correctly)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :link: API
### :question: Which API did I use?

Artist Guesser has been designed and developed with the [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/).  

For this project I used the *Collection API*, with which you can search the collection.

</br>

### :eyes: What can you do with this API?

_All information can also be found on [the Rijksmuseum website](https://data.rijksmuseum.nl/object-metadata/api/)_

The below described possibilities apply to the Collection API.

- Get a link to the art object on the Rijksmuseum website
- Get the artworks:
  - ID
  - Object number
  - Title
  - Long title
  - Image
  - Artist

</br>

### :raising_hand: What did I do with this API?

I have implemented the following points into **_Artist Guesser_**:

<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->


</br>

### :end: Endpoint & parameters

TBD
<!-- Gifinder uses one main endpoint, which can be seen below.  

```
https://api.giphy.com/v1/gifs/[parameters here]?&api_key=${key}`
```  

</br>

I used the parameters below to get different data.
- `${trendingType}`
- `${req.params.id}`

</br>

The `${trendingType}` parameter fetches the trending GIFs at the moment. When using the trendingType parameter, the following needs to be added at the very end `&limit=24`. The limit can be changed to any number.  

</br>

The `${req.params.id}` parameter fetches a specific GIF by ID and gets the data that belongs to that ID.

-->

</br>

### :microphone: API response
After making a request to the API, you will receive some information about the artworks. Below you can find what information you get and what it means.

```
"artObjects": [
  {
    "links": {}               // links to the artwork in the api or website
    "id":                     // ID of the artwork
    "objectNumber":           // object number of the artwork
    "title":                  // artworks title
    "longTitle":              // artworks long title
    "principleOrFirstMaker":  // artworks artist
    "hasImage":               // tells us if the artwork has an image
    "showImage":              // tells us if an image is being shown
    "permitDownload":         // tells us if the image is allowed to be downloaded
    "webImage": {}            // the web image
    "headerImage": {}         // the header image
  }
]
```

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :gift: Used packages

### :smiling_imp: nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps with the development of node.js based applications. The nodemon package restarts the node application automatically when any file changes are made inside the directory.

</br>

I installed nodemon to quickly see whether the changes I made caused any errors, and also for the convenience that comes with automatic restarts.

```
npm i -g nodemon
```

</br>

### :monorail: express
[Express](https://www.npmjs.com/package/nodemon) is a node.js framework. 

</br>

I installed express, because this package makes routing via the server easier. Another reason for installing express, was the support for many template engines, as I used one for this project, but hadn't decided on one just yet.

```
npm i express
```
```
const express = require('express');
```

</br>

### :memo: ejs
[Ejs](https://www.npmjs.com/package/ejs) is a template engine that makes it possible for JavaScript code to be injected into the client.

</br>

I installed ejs, because the package is easy to understand, has a gentle, gradual learning curve (which makes it great for newbies - like me!) and using the package makes it easier to inject data from the server into the client.

```
npm i ejs
```
```
app.set('view engine', 'ejs');
```

</br>

### :socks: socket.io
[Socket.io](https://www.npmjs.com/package/socket.io) is a package that enables real-time event-based communication. This can be done using a NodeJS server and a JavaScript client library for the browser.

</br>

I installed socket.io to implement the real-time chat feature for my project.

```
npm i socket.io
```
```
const socket = require('socket.io')
```
```
const io = socket(http)
```

</br>

### :dog::soccer: node-fetch
[Node-fetch](https://www.npmjs.com/package/node-fetch) is a module which works just like the ```window.fetch``` method does client side, but for the server side.

</br>

I installed node-fetch, because it allows me to do an API fetch via the server side.

```
npm i node-fetch
```
```
const fetch = require('node-fetch');
```

</br>

### :large_blue_circle: dotenv
[Dotenv](https://www.npmjs.com/package/dotenv) is a package that loads variables from a ```.env``` file.

</br>

I installed dotenv, because it helps to store sensitive data (such as the API key), which can then be hidden from the GitHub repository using my ```.gitignore``` file.

```
npm i dotenv
```
```
require('dotenv').config();
```

</br>

---



<!-------------------------- New Paragraph -------------------------->

## :inbox_tray: Install

### 1. :dancers: Clone this repo

Before we can get started, we'll need to clone this repo.
This can be done by typing the following line of code into your terminal:

```
git clone https://github.com/lisaoude/artist-guesser.git
```

<br/>

### 2. :computer: Install the packages

Next, we will have to install the used packages.

```
npm install
```

<br/>

### 3. :arrow_forward: Start local dev environment

This can be done by typing the following line of code into your terminal:

```
npm run dev
```

<br/>

### 4. :globe_with_meridians: Navigate to localhost

Almost done! We just need to navigate to the localhost in the browser.

```
http://localhost:5500/
```

<br/>

---

<!-------------------------- New Paragraph -------------------------->

## :closed_lock_with_key: License

This repository is licensed as [MIT](https://github.com/lisaoude/real-time-web-2021/blob/main/LICENSE) by © Lisa Oude Elferink, 2021

<br/>

---

<!-------------------------- New Paragraph -------------------------->

## :books: Sources

- npm: express. (2019, May 26). Retrieved April 9, 2021, from [NPMjs.com](https://www.npmjs.com/package/express)
- npm: ejs. (2021, February 6). Retrieved April 9, 2021, from [NPMjs.com](https://www.npmjs.com/package/ejs)
- npm: nodemon. (2021, January 6). Retrieved April 9, 2021, from [NPMjs.com](https://www.npmjs.com/package/nodemon)
- npm: dotenv. (2019, October 16). Retrieved April 9, 2021, from [NPMjs.com](https://www.npmjs.com/package/dotenv)
- npm: node-fetch. (2020, September 5). Retrieved April 9, 2021, from [NPMjs.com](https://www.npmjs.com/package/node-fetch)
- npm: socket.io. (2021, April 1). Retrieved April 12, 2021, from [NPMjs.com](https://www.npmjs.com/package/socket.io)

