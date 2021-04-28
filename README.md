# Artist Guesser

_Made for Real-Time Web [@ cmda-minor-web 2020 - 2021](https://github.com/cmda-minor-web)_

![rtw_mockups](https://user-images.githubusercontent.com/57795294/116477437-e79a6b00-a87c-11eb-90b8-8aae2090ebe3.png)


---

<!-------------------------- New Paragraph -------------------------->

## :pencil2: App description

**_Artist Guesser_**: the multiplayer game where you and your friends can guess the artist that made the artwork shown on the screen!  
The first player to say the correct artists name in the chat, wins that round!

[My work can be viewed right here](https://artist-guesser.herokuapp.com/).  

</br> 

---

<!-------------------------- New Paragraph -------------------------->

## :pushpin: Table of Contents

- [Three Concepts](#three-Three-Concepts)
- [Chosen Concept](#sparkles-Chosen-Concept)
- [What does this Web App do?](#gem-What-does-this-Web-App-do?)
- [Wishlist](#crown-Wishlist)
- [API](#link-API)
  - [Which API did I use?](#question-Which-API-did-I-use?)
  - [API response](#microphone-API-response)
  - [What did I do with this API?](#raising_hand-What-did-I-do-with-this-API?)
  - [Used endpoints & parameters](#end-Used-endpoint-&-parameters)
  - [Get the API key](#key-Get-the-API-key)
  - [Real-Time Events](#circus_tent-Real-Time-Events)
  - [Data Lifecycle Diagram](#baby-older_man-Data-Lifecycle-Diagram)
- [Used Packages](#gift-Used-Packages)
- [Install](#inbox_tray-Install)
- [License](#closed_lock_with_key-License)
- [Sources](#books-Sources)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :three: Three Concepts 

Before I came up with my final concept, I had a brainstorm session and thought of three concepts.

![RTW_three_concepts](https://user-images.githubusercontent.com/57795294/115205935-5a2b7e00-a0fa-11eb-985e-cd557eb4e846.png)

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
- Play with multiple people
- Lets users guess the artworks artist
- Goes to the next image after a correct answer
- Gives feedback after a correct answer
- Gives feedback after a user connects & disconnects
- Stores username with socket.id

</br> 

### API based features
- Fetch & show an artwork 
- Fetch & use the artworks artists name
- Check answer using the artworks artists name

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :crown: Wishlist

Below is a list of features I'd love to add to Artist Guesser. The features are split up using the **M**o**SC**o**W** method.  


**M** - Must haves  
_These features are like requirements for the end product_  
- [x] Set up chat
- [x] Add usernames to chat
- [x] Connect API
- [x] Show images of API to user using socket.io
- [x] Set up logic for guessing (answer must match artist name)
- [x] Go to next page after guessing correctly

</br>

**S** - Should haves  
_These features are wanted, but not necessary for a usable product_  
- [x] Add styling
- [x] Randomize order of artworks
- [x] Implement forgiveness (lower/uppercase, .includes)
- [x] Give feedback on who connects
- [x] Give feedback on who disconnects
- [x] Implement feedback messages
- [ ] Set up point system
- [ ] Set up scoreboard

</br>

**C** - Could haves  
_These features can be added if there's enough time to do so_  
- [ ] Make it possible for users to customize their color displayed in the chat
- [ ] Give hints if the correct answer hasn't been given after a certain amount of time
- [ ] Create rooms so multiple groups can play their own game at the same time

</br>

**W** - Would haves  
_These features can be added in the future_  
- [ ] Set up all time best scoreboard
- [ ] Set up point system based on time (1000 points to start, lose 1 point every second you don't answer correctly)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :link: API
### :question: Which API did I use?

Artist Guesser has been designed and developed with the [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/).  

For this project I used the [Collection API](https://data.rijksmuseum.nl/object-metadata/api/#collection-api), with which you can search the collection.

</br>

### :microphone: API response
After making a request to the API, you will receive some information about the artworks. Below you can find what information you get and what it means.

_All information can also be found on [the Rijksmuseum website](https://data.rijksmuseum.nl/object-metadata/api/)_

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

### :raising_hand: What did I do with this API?

I have implemented the following points into **_Artist Guesser_**:

- **title** - to get the artworks title
- **principleOrFirstMaker** - to filter artworks & to check answers
- **webImage** - to show an image of the artwork

</br>

### :end: Used endpoint & parameters
In this game, I use one main endpoint.

```
https://www.rijksmuseum.nl/api/nl/collection/
```

</br>

Added on to this endpoint, I used the parameters below to get my data.

```
?key=${key}    // personal API key
?key=${limit}  // any number 1-100
```

</br>

In my code I use the following endpoints, to get the specific data I need.

```
principleOrInvolvedMaker   // the artworks artist
title                      // the artworks title
webImage.url               // the artworks image
```

</br>

### :key: Get the API key

In order to access the API, you'll need to get an API key first. You can do so by registering for a [Rijksstudio account](https://www.rijksmuseum.nl/en/rijksstudio). After registering, you will receive your API key right away, which you can find in the advanced settings of your newly created Rijksstudio account.


</br>


### :circus_tent: Real-Time Events

#### :zap: connection
Once the user enters a username and presses the start button, a connection to the socket is made. This connection triggers the **showData** event, as well as the **userConnected** event.

#### :chart_with_upwards_trend: showData
This event is triggered by the **connection** event. This event shows the API data client side.

#### :adult: userConnected
This event is also triggered by the **connection** event. This event stores the given username with the socket.id, which is used in the _connection, correct answer and disconnection messages_. This event shows the previously mentioned connection message client side, using the username stored with the socket.id.

#### :speech_balloon: message
When a user sends a message, this event is triggered. This event then triggers the server side check, which checks if the message that's being send is the correct answer. If yes, the message is shown client side and the _correct answer message_ is shown, using the username stored with the socket.id. After this, a new image is shown. If the message isn't the correct answer, it's just shown client side.

#### :wave: disconnect
Once a user disconnects, the disconnect event is triggered. This event shows a disconnection message client side, using the username stored with the socket.id.

</br>


<!-------------------------- New Paragraph -------------------------->

### :baby::older_man: Data Lifecycle Diagram
![data_lifecycle_diagram_lisa_v2](https://user-images.githubusercontent.com/57795294/116474252-8ffa0080-a878-11eb-9d34-075299024884.png)


</br>


---

<!-------------------------- New Paragraph -------------------------->

## :package: Used packages

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
- Example from Justus Sturkenboom (n.d.). ju5tu5/barebonechat. Retrieved April 12, 2021, from [GitHub Repo](https://github.com/ju5tu5/barebonechat)
- MDN. Math.random() (2021, April 23). Retrieved April 20, 2021, from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)