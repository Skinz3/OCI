
async function onSearchClick() {

  var searchText = document.getElementById("searchbar").value;
  var result = document.getElementById("resultList");

  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  var lat = Geolocation.coords.latitude;
  var long = Geolocation.coords.longitude;

  var results = await LocationApi.search(searchText, lat, long, 10);

  var but_enreg = document.createElement('button');
  but_enreg.setAttribute("class", "btn btn-secondary btn-sm");
  but_enreg.textContent = 'Enregistrer Liste';
  but_enreg.style.width = '150px';


  var z = 0;


  result.append(but_enreg);

  results.forEach(element => {
    ++z;

    var nom = document.createElement('a');
    nom.setAttribute("class", "list-group-item clearfix");
    nom.innerHTML = "<b>" + element.properties.name + "</b></br>" + element.properties.housenumber + " " + element.properties.street + ", " + element.properties.city;
    var t = document.createElement('span');
    t.setAttribute("class", "pull-right");

    var icon = document.createElement('i');
    icon.setAttribute("class", "far fa-star");
    icon.setAttribute("id", "star" + z);
    icon.setAttribute("title", "Add to favorite");
    icon.setAttribute("onClick", "myFunction(id)");

    var icon1 = document.createElement('i');
    icon1.setAttribute("class", "fas fa-map-marker-alt");
    icon1.setAttribute("style", "color:red");
    icon1.setAttribute("id", "star" + z);
    icon1.setAttribute("title", "Itinéraire");
    icon1.setAttribute("onClick", "window.open('https://www.google.com/maps/dir/?api=1&destination=" + element.geometry.coordinates[1] + "," + element.geometry.coordinates[0] + "')", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=500");


    result.appendChild(nom);

    nom.appendChild(t);
    t.appendChild(icon);
    t.appendChild(document.createTextNode(" "));
    t.appendChild(icon1);

    var elementLong = element.geometry.coordinates[0];
    var elementLat = element.geometry.coordinates[1];
    // alert(OpenStreetMap.map);
    var marker = L.marker([elementLat, elementLong]).addTo(OpenStreetMap.map).bindPopup(element.properties.name);


  });


}

function myFunction(f) {
  var star = document.getElementById(f);
  if (star.className == "far fa-star") {
    star.setAttribute("class", "fas fa-star");
    star.setAttribute("title", "Remove from favorite");
  } else {
    star.setAttribute("class", "far fa-star");
    star.setAttribute("title", "Add to favorite");
  }
  document.getElementById("star").addEventListener("onClick", myFunction);
}
async function openModal(e) {
  var lat = e.value.split(",")[0];
  var lon = e.value.split(",")[1];

  var data = await LocationApi.getCoordinatesData(lat, lon); // This can be removed if we exceed API quota

  $('#interetForm').modal('show');

  document.getElementById("lat").value = lat;
  document.getElementById("lon").value = lon;

  document.getElementById("ville").value = data.address.municipality;
  document.getElementById("rue").value = data.address.road;

  console.log(data.address);


}
function saveToFirebase() {

  db.collection("locations").add({
    targetUser: Session.user.user.uid,
    description: $('#description').val(),
    numero: $('#numero').val(),
    ville: $('#ville').val(),
    rue: $('#rue').val(),
    latitude: $('#lat').val(),
    longitude: $('#lon').val(),

  }

  );
  $('.toast').toast('show');
}


