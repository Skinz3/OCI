
async function onSearchClick(){

    var searchText = document.getElementById("searchbar").value;
    var result = document.getElementById("resultList");
    
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
  
    var lat = Geolocation.coords.latitude;
    var long = Geolocation.coords.longitude;

    var results =await KomootApi.search(searchText,lat,long,10);
   
    var but_enreg = document.createElement('button');
    but_enreg.setAttribute("class","btn btn-secondary btn-sm");
    but_enreg.textContent = 'Enregistrer Liste';
    but_enreg.style.width = '150px';

    
    var z = 0;

    
    result.append(but_enreg);

    results.forEach(element => {
        ++z;
        
        var nom = document.createElement('a');
        nom.setAttribute("class", "list-group-item clearfix");
        nom.innerHTML = "<b>"+element.properties.name + "</b></br>"+element.properties.housenumber+" "+element.properties.street+", "+element.properties.city;
        var t =document.createElement('span');
        t.setAttribute("class", "pull-right");

        var icon = document.createElement('i');
        icon.setAttribute("class","far fa-star");
        icon.setAttribute("id","star"+z);
        icon.setAttribute("title","Add to favorite");
        icon.setAttribute("onClick","myFunction(id)");
        
        var icon1 = document.createElement('i');
        icon1.setAttribute("class","fas fa-map-marker-alt");
        icon1.setAttribute("style","color:red");
        icon1.setAttribute("id","star"+z);
        icon1.setAttribute("title","Itinéraire");
        icon1.setAttribute("onClick","window.location.href='https://www.google.com/maps/dir/@48.119808,-1.7104896,14z'");
        
        
        result.appendChild(nom);
    
        nom.appendChild(t);
        t.appendChild(icon);
        t.appendChild (document.createTextNode (" "));
        t.appendChild(icon1);

        var elementLong = element.geometry.coordinates[0];
        var elementLat = element.geometry.coordinates[1];
      // alert(OpenStreetMap.map);
        var marker = L.marker([elementLat, elementLong]).addTo(Map.map).bindPopup(element.properties.name);
       
        

       


        
    
        
    });
   

}

function myFunction(f) {
  var star = document.getElementById(f);
  if (star.className == "far fa-star") {
        star.setAttribute("class","fas fa-star");
        star.setAttribute("title","Remove from favorite");
  }else{
        star.setAttribute("class","far fa-star");
        star.setAttribute("title","Add to favorite");
  } 
  document.getElementById("star").addEventListener("onClick",myFunction);
}


