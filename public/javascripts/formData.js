
function submission(e) {
  var name = document.getElementById("name").value
  var email = document.getElementById("email").value
  var location = document.getElementById("location").value

  if (name == "" || email == "" || location == "") {
    alert("Please fill out all fields!");
    return
  }
  document.getElementById("name").value = ""
  document.getElementById("email").value = ""
  document.getElementById("location").value = ""
  var object = {
    name: name,
    email: email,
    location: location
  }
  var json_object = JSON.stringify(object)
  console.log(json_object)


  fetch('../../', {
    method: 'POST', body: json_object, headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(console.log)

  //alert("Thanks! You can check the list of people to see whether your name has been added.")
  document.getElementById('notification').hidden = false
  e.preventDefault();
  //alert(name + " " + email + " " + location)
}


document.getElementById("submission").onclick = function (e) {
  submission(e);
}




