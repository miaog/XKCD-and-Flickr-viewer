/*Skins and Styles*/
let blackSkin = new Skin ({fill: 'black'});
let whiteSkin = new Skin ({fill: 'white'});
let blueSkin = new Skin ({fill: '#00cfe6'});
let silverSkin = new Skin ({fill: '#bdc3c7'});

let buttonStyle = new Style({font: '22px', color: 'white'});
let headlineStyle = new Style({font: '28px', color: '#aaaaaa'});
let smallStyle = new Style ({font: '20px', color: 'black'});

/* Main screen layout */
var MainScreen = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: whiteSkin,

   contents: [
        Picture($, { left:0, top:0, right:0,height: 180, url:'logo.png' })

   ]
}));

var currentComic;
var currentImg;
var ImgUrl;
var currentNum = 0;
var currentUrl = 'http://xkcd.com/info.0.json';
var safeTitle;
var maxNum = 0;
var currentScreen = new MainScreen();
application.add(currentScreen);

var Comix = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4_1)
            getImg(function(currentUrl) { // Add comic image
              let comicImg = new Picture({height: 180,width:250, url: currentUrl});
              currentComic = comicImg;
              application.add(comicImg);
            }, currentUrl);

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var Flickr = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5_1)
            application.add(navBar6_1)
            application.add(navBar21)
            application.add(navBar4_2)
            application.add(navBar4)

            var search = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2854926198390429ffc0e398f45c521f&text=' 
                          + encodeURIComponent(safeTitle) + 
                          '&format=json&nojsoncallback=1'
            getImgFlickr(function(search) { // Add comic image
              let flickrImg = new Picture({height: 180,width:250, url: search});
              currentImg = flickrImg;
              application.add(flickrImg);
            }, search);

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));


var ComixHome = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    contents: [
        new ComicPane(),
    ]
}));


var RandomXKCD = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4)

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var NextXKCD = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4)

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var PrevXKCD = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4)

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var NextFlickr = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4)

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var PrevFlickr = Column.template($ => ({
    top: 20, bottom: 20, left: 30, right: 30, 
    skin: whiteSkin,
    behavior: Behavior({
        onCreate: function(content){
            application.add(navBar5)
            application.add(navBar6)
            application.add(navBar2)
            application.add(navBar3)
            application.add(navBar4)

        }
    }),
    contents: [
        new ComicPane(),
    ]
}));

var NavButton = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "white", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "white"
                });
            this.downSkin = new Skin({
              fill: "white", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            application.remove(navBar); // Remove navigation bar
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application

        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "20px Century Gothic", color:"#00C0EE" } ), 
                 string: $.string })
   ]
}));


var NavButton2 = Container.template($ => ({  // for NextXKCD and current comix
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "white", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "white"
                });
            this.downSkin = new Skin({
              fill: "white", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            application.remove(navBar3); // Remove navigation bar
            application.remove(navBar5);
            application.remove(navBar2);
            application.remove(navBar6);
            application.remove(navBar4_1);
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application

        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "15px Century Gothic", color:"#00C0EE" } ), 
                 string: $.string })
   ]
}));

var NavButtonRandom = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "#00C0EE", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "#00C0EE"
                });
            this.downSkin = new Skin({
              fill: "#00C0EE", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "#00C0EE"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentComic);
            currentNum = (Math.floor(Math.random() * maxNum) + 1);
            var randomUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = randomUrl;
            getImg(function(randomUrl) { // Add comic image
              let randomImg = new Picture({height: 180, width:250, url: randomUrl});
              application.add(randomImg);
              currentComic = randomImg;
            }, randomUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "15px Century Gothic bold", color:"white" } ), 
                 string: $.string })
   ]
}));


var NavButtonRandom_1 = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "#00C0EE", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "#00C0EE"
                });
            this.downSkin = new Skin({
              fill: "#00C0EE", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "#00C0EE"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentImg);
            currentNum = (Math.floor(Math.random() * maxNum) + 1);
            var nextUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = nextUrl;
            getImgXKCD(function(nextUrl) { // Add comic image
              let flickrImg = new Picture({height: 180,width:250, url: nextUrl});
              currentImg = flickrImg;
              application.add(flickrImg);
            }, nextUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "15px Century Gothic bold", color:"white" } ), 
                 string: $.string })
   ]
}));

var NavButtonPrevXKCD = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "black", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "black"
                });
            this.downSkin = new Skin({
              fill: "black", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "black"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentComic);
            currentNum = currentNum - 1;
            if (currentNum < 1) { 
              currentNum = currentNum + 1
            }
            var nextUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = nextUrl;
            getImg(function(nextUrl) { // Add comic image
              let nextImg = new Picture({height: 180, width:250, url: nextUrl});
              application.add(nextImg);
              currentComic = nextImg;
            }, nextUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 0, right: 0, style: new Style( { font: "20px Century Gothic bold", color:"#00b3b3" } ), 
                 string: $.string })
   ]
}));

var NavButtonNextXKCD = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "black", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "black"
                });
            this.downSkin = new Skin({
              fill: "black", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "black"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentComic);
            currentNum = currentNum + 1;
            if (currentNum > maxNum) { 
              currentNum = currentNum - 1
            }
            var nextUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = nextUrl;
            getImg(function(nextUrl) { // Add comic image
              let nextImg = new Picture({height: 180, width:250, url: nextUrl});
              application.add(nextImg);
              currentComic = nextImg;
            }, nextUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 0, right: 0, style: new Style( { font: "20px Century Gothic bold", color:"#00b3b3" } ), 
                 string: $.string })
   ]
}));


var NavButtonPrevXKCD1 = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "black", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "black"
                });
            this.downSkin = new Skin({
              fill: "black", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "black"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentImg);
            currentNum = currentNum - 1;
            if (currentNum < 1) { 
              currentNum = currentNum + 1
            }
            var nextUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = nextUrl;
            getImgXKCD(function(nextUrl) { // Add comic image
              let flickrImg = new Picture({height: 180,width:250, url: nextUrl});
              currentImg = flickrImg;
              application.add(flickrImg);
            }, nextUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 0, right: 0, style: new Style( { font: "20px Century Gothic bold", color:"#00b3b3" } ), 
                 string: $.string })
   ]
}));

var NavButtonNextXKCD1 = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "black", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "black"
                });
            this.downSkin = new Skin({
              fill: "black", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "black"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            application.remove(currentImg);
            currentNum = currentNum + 1;
            if (currentNum > maxNum) { 
              currentNum = currentNum - 1
            }
            var nextUrl = 'http://xkcd.com/' + currentNum.toString() + '/info.0.json';
            currentUrl = nextUrl;
            getImgXKCD(function(nextUrl) { // Add comic image
              let flickrImg = new Picture({height: 180,width:250, url: nextUrl});
              currentImg = flickrImg;
              application.add(flickrImg);
            }, nextUrl);
        },
    }),
   contents: [
      Label($, { top: 0, bottom: 0, left: 0, right: 0, style: new Style( { font: "20px Century Gothic bold", color:"#00b3b3" } ), 
                 string: $.string })
   ]
}));

var NavButtonFlickr = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "white", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "white"
                });
            this.downSkin = new Skin({
              fill: "white", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            application.remove(navBar4); // Remove navigation bar
            application.remove(navBar4_2);
            application.remove(navBar5_1);
            application.remove(navBar6_1);
            application.remove(navBar21);
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application
        },
    }),
   contents: [
        Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "15px Century Gothic", color:"#00C0EE" } ), 
                 string: $.string })
   ]
}));

var NavButtonFlickr_1 = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                  fill: "#00C0EE", 
                  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                  stroke: "#00C0EE"
                });
            this.downSkin = new Skin({
              fill: "#00C0EE", 
              borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              stroke: "#00C0EE"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
        },
    }),
   contents: [
        Label($, { top: 0, bottom: 0, left: 10, right: 0, style: new Style( { font: "15px Century Gothic bold", color:"white" } ), 
                 string: $.string })
   ]
}));

var navBar = new Column({ bottom: 0, height: 50, left: 0, right: 0,
    skin: whiteSkin,
    contents: [
        new NavButton({ string: "E N T E R", nextScreen: Comix }),

    ]
});
var navBar2 = new Column({ bottom: 0, height: 20, left: 0, right: 0,
    skin: blackSkin,
    contents: [
        new NavButtonRandom({ string: "R A N D O M", nextScreen: RandomXKCD }),

    ]
});

var navBar21 = new Column({ bottom: 0, height: 20, left: 0, right: 0,
    skin: blackSkin,
    contents: [
        new NavButtonRandom_1({ string: "R A N D O M", nextScreen: RandomXKCD }),

    ]
});

var navBar3 = new Column({ top: 0, height: 20, right: 0, left:150,
    skin: blackSkin,
    contents: [
        new NavButton2({ string: "Flickr", nextScreen: Flickr }),

    ]
});
var navBar4 = new Column({ top: 0, height: 20, left: 0, right:158,
    skin: blackSkin,
    contents: [
        new NavButtonFlickr({ string: "XKCD", nextScreen: Comix }),

    ]
});

var navBar4_1 = new Column({ top: 0, height: 20, left: 0, right:158,
    skin: blackSkin,
    contents: [
        new NavButtonFlickr_1({ string: "XKCD"}),

    ]
});

var navBar4_2 = new Column({ top: 0, height: 20, right: 0, left:150,
    skin: blackSkin,
    contents: [
        new NavButtonFlickr_1({ string: "Flickr"}),

    ]
});

var navBar5 = new Line({ top:0, bottom:0, right: 290, left: 0,
    skin: blackSkin,
    contents: [
        new NavButtonPrevXKCD({ string: "<<", nextScreen: PrevXKCD }),

    ]
});
var navBar6 = new Line({  top:0, bottom:0, left: 290, right: 0,
    skin: blackSkin,
    contents: [
        new NavButtonNextXKCD({ string: ">>", nextScreen: NextXKCD }),

    ]
});

var navBar5_1 = new Line({ top:0, bottom:0, right: 290, left: 0,
    skin: blackSkin,
    contents: [
        new NavButtonPrevXKCD1({ string: "<<", nextScreen: PrevFlickr }),

    ]
});
var navBar6_1 = new Line({  top:0, bottom:0, left: 290, right: 0,
    skin: blackSkin,
    contents: [
        new NavButtonNextXKCD1({ string: ">>", nextScreen: NextFlickr }),

    ]
});
application.add(navBar);


let ComicPane = Container.template($ => ({
  name: 'comicPane',
  left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
  contents: [

  ]
}));

/* Helper function for sending the HTTP request for XKCD and loading the response */
function getImg(uiCallback, url) {
    var message = new Message(url)
    message.invoke(Message.TEXT).then(text => {
      if (0 == message.error && 200 == message.status) {
          try {
            var response = JSON.parse(text)
            safeTitle = response.safe_title
            if (response.img) {
              currentNum = response.num
              if (currentNum > maxNum) {
                maxNum = currentNum
              }
              uiCallback(response.img)
            }
            
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}

/* Helper function for sending the HTTP request for flickr and loading the response */
function getImgFlickr(uiCallback, url) {
    var message1 = new Message(url)
    
    message1.invoke(Message.TEXT).then(text => {
      if (0 == message1.error && 200 == message1.status) {
          try {
            var response = JSON.parse(text)
            safeTitle = response.safe_title
            var photo_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=2854926198390429ffc0e398f45c521f&photo_id='
                    + response.photos.photo[0].id + 
                    '&format=json&nojsoncallback=1'
            var message2 = new Message(photo_url)
            message2.invoke(Message.TEXT).then(text => {
            if (0 == message2.error && 200 == message2.status) {
                try {
                  var response = JSON.parse(text)
                  var org_image = response.sizes.size[0].source
                  if (org_image) {
                    uiCallback(org_image)
                  }
                  
                }
                catch (e) {
                  throw('Web service responded with invalid JSON!\n');
                }
            }
            else {
                trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
            }
          });
            
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}

/* Helper function for sending the HTTP request for flickr from XKCD and loading the response */
function getImgXKCD(uiCallback, url) {
    trace("xkcd URL: "+ url + '\n')
    var message1 = new Message(url)
    
    message1.invoke(Message.TEXT).then(text => {
      if (0 == message1.error && 200 == message1.status) {
          try {
           
            var response = JSON.parse(text)
            trace("response is: " + response + '\n')
            safeTitle = response.safe_title
            var search = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2854926198390429ffc0e398f45c521f&text=' 
                          + encodeURIComponent(safeTitle) + 
                          '&format=json&nojsoncallback=1'
            var message2 = new Message(search)
            message2.invoke(Message.TEXT).then(text => {
              if (0 == message2.error && 200 == message2.status) {
                  try {
                    trace("text123: " + text+ '\n')
                      var response = JSON.parse(text)
                      var photo_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=2854926198390429ffc0e398f45c521f&photo_id='
                              + response.photos.photo[0].id + 
                              '&format=json&nojsoncallback=1'
                      var message3 = new Message(photo_url)
                        message3.invoke(Message.TEXT).then(text => {
                        if (0 == message3.error && 200 == message3.status) {
                            try {
                              var response = JSON.parse(text)
                              var org_image = response.sizes.size[0].source
                              trace("text24124: " + org_image + '\n')
                              if (org_image) {
                                uiCallback(org_image)
                              }
                              
                            }
                            catch (e) {
                              throw('Web service responded with invalid JSON!\n');
                            }
                        }
                        else {
                            trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
                        }
                      });
                  }
                  catch (e) {
                    throw('Web service responded with invalid JSON!\n');
                  }
              }
              else {
                  trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
              }
            });


            
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}

