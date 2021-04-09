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

- [What does this Web App do?](#gem-What-does-this-Web-App-do?)
- [API](#link-API)
- [Used Packages](#gift-Used-Packages)
- [Install](#inbox_tray-Install)
- [Wishlist](#crown-Wishlist)
- [License](#closed_lock_with_key-License)
- [Sources](#books-Sources)

</br>

---

<!-------------------------- New Paragraph -------------------------->

## :gem: What does this Web App do?


### General features
<!-- - Gifinder can be downloaded, as any good PWA should be 
- Caches pages both statically and dynamically 
- Serves the user an offline page when they happen to be offline -->

</br> 

### API based features
<!-- - Fetch & show the trending GIFs on load
- Fetch & show the user the GIF and details of the GIF they clicked on
- Provide the user with feedback when hovering over a GIF -->

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

</br> -->

### :microphone: API response
<!-- After making a request to the API, you will receive some information about the GIFs. Below you can find what information you get and what it means.

```
{
"type":                // the type of image (mostly all GIFs)
"id":                  // unique ID of the GIF
"url":                 // URL of the GIF, on Giphy.com
"slug":                // GIFs unique slug (used in the url)
"bitly_gif_url":       // short URL, linking to Giphy.com
"bitly_url":           // short URL, linking to Giphy.com
"embed_url":           // embed URL
"username":            // username of who posted the GIF
"source":              // original source of the GIF
"title":               // GIFs title
"rating":              // GIFs MPAA-style rating, such as Y, G, PG, PG-13 and R
"content_url":         // content URL, currently unused by Giphy
"source_tld":          // top level domain of the original source
"source_post_url":     // URL of the webpage on which the GIF was found
"is_sticker":          // stating if the GIF can be used as a web sticker
"import_datetime":     // the creation or upload date from the GIF
"trending_datetime":   // the date on which this GIF was marked as trending
"images": {}           // containing data for different formats and sizes of the GIF
                       // such as original, downsized, fixed-height, fixed-width and stills
}
```

</br> -->

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

## :crown: Wishlist

Here's a list of things I'd love to add to Artist Guesser:

- [ ] asdfghjk


<!-- We all know creative developing projects are never _truly_ done..  
These are some next steps that I would love to make:

- Make it possible to let the users search for GIFs
- Let the users save GIFs to a favorites list
- Let the users save GIFs to a special collection, which the user can name themselves (e.g. funny GIFs, cat GIFs, etc.)
- Give Gifinder a random mode, which returns a random GIF to the user after a button press
- Autocomplete user input with a list of valid terms that completes what the user has typed into the input field
- Provide users with a list of GIF categories
- Provide users with a list of the trending search terms
- Suggest searches to users -->

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

