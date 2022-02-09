function displayList() {

  var ul = document.getElementById("myUL");

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  $('#myModal').modal('show');
  db.collection("lists").where("targetUser", "==", Session.user.uid).get().then((docs) => {

    docs.forEach(function (child) {

      var data = child.data();
      ul.appendChild(createItem(data.name));

    });

  })


}
function createItem(value) {

  var li = document.createElement("li");
  li.className = 'item'
  li.innerHTML =
    `<div class="p-2 rounded checkbox-form">
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-1">
    ${value}
    </div>
    </div>`;
  return li;

}

function addItem() {

  var myDiv = document.getElementById("myDiv");
  var inputValue = document.getElementById("myInput").value;

  var checkbox = document.createElement('input');
  if (inputValue === '') {
    cuteAlert({
      type: "warning",
      title: "Please give a name to the list",
      message: "Empty input fields",
      buttonText: "Okay",
      img: "../img/warning.svg",
    });

    return;

  } else {

    db.collection("lists").add({
      name: inputValue,
      targetUser: Session.user.uid,
      value: [],
    });
    document.getElementById("myUL").appendChild(createItem(inputValue));
    cuteAlert({
      type: "success",
      title: "List successfully added ",
      message: "List successfully added",
      img: "../img/success.svg",
    })
  }
}
function openSaveListModal() {
  $('#myModal2').modal('show');

  var combo = document.getElementById("listeCombo");
  while (combo.firstChild) {
    combo.removeChild(combo.firstChild);
  }

  db.collection("lists").where("targetUser", "==", Session.user.uid).get().then((docs) => {

    docs.forEach(function (child) {


      var data = child.data();
      var ddl = document.getElementById("listeCombo");
      var option = document.createElement("OPTION");
      option.innerHTML = data.name;
      //option.value = document.getElementById("txtValue").value;
      ddl.options.add(option);



    });

  })
}

function removeItem() {
  var doc = document.querySelectorAll('.item');
  var done = false;
  doc.forEach(x => {
    if (x.querySelector('input').checked) {
      x.remove();
      done = true;
      let fs = firebase.firestore();
      let collectionRef = fs.collection("lists");
      var name = x.firstElementChild.firstElementChild.innerText.trim()

      collectionRef.where("targetUser", "==", Session.user.uid)
        .where("name", "==", name)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {

            })
          });
        });

      cuteAlert({
        type: "success",
        title: "List successfully deleted ",
        message: "List successfully deleted",
        img: "../img/success.svg",
      });




    }
  })

  if (done == false) {
    cuteAlert({
      type: "warning",
      title: "Please select a list to delete",
      message: "Unchecked List",
      buttonText: "Okay",
      img: "../img/warning.svg",
    });
  } else {
    cuteAlert({
      type: "success",
      title: "List(s) successfully deleted ",
      message: "List(s) successfully deleted",
      img: "../img/success.svg",
    });
  }
}


