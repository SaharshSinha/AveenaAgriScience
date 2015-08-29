

// An example of using the MQA.EventUtil to hook into the window load event and execute the defined
// function passed in as the last parameter. You could alternatively create a plain function here and
// have it executed whenever you like (e.g. <body onload="yourfunction">).

MQA.EventUtil.observe(window, 'load', function () {
    
    // create an object for options
    var options = {
        elt: document.getElementById('map'),           // ID of map element on page
        zoom: 7,                                      // initial zoom level of the map
        latLng: { lat: 23.033863, lng: 72.585022 },  // center of map in latitude/longitude
        mtype: 'map',                                  // map type (map, sat, hyb); defaults to map
        bestFitMargin: 0,                              // margin offset from map viewport when applying a bestfit on shapes
        zoomOnDoubleClick: true                        // enable map to be zoomed in when double-clicking on map
    };
    
    // construct an instance of MQA.TileMap with the options object
    window.map = new MQA.TileMap(options);
    addAPointOfInterest("HeadQuarters", 23.033863, 72.585022, 4);
    addAPointOfInterest("MapPointer", 22.725313, 75.865555, 4);
});


function addAPointOfInterest(typeOfPoi, plat, plang, rollOverData)
{
    /*Using the MQA.Poi constructor*/
    var info = new MQA.Poi({ lat: plat, lng: plang });
    
    var icon = new MQA.Icon("/public/images/"+ typeOfPoi+".png", 30, 30);
    
    /*This tells the POI to use the Icon object that was created rather than the default POI icon.*/
    info.setIcon(icon);
    
    /*Set the shadow offset for your custom icon if necessary.*/
    //info.setShadowOffset({ x: 10, y: -25 });

    /*Sets the rollover content of the POI.*/
    info.setRolloverContent(rollOverData);
    
    /*Sets the InfoWindow contents for the POI. By default, when the POI receives a mouseclick
    event, the InfoWindow will be displayed with the HTML passed in to MQA.POI.setInfoContentHTML method.*/
    info.setInfoContentHTML(rollOverData);
    
    /*This will add the POI to the map in the map's default shape collection.*/
    window.map.addShape(info);

}