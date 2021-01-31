var list_of_people = []
const getPeople = async (url) => {
  var json_object = JSON.stringify({ form: "yes" })
  fetch('/', {
    method: 'POST', body: json_object, headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(function (data) {
      for (var i = 0; i < data.list.length; i++) {
        list_of_people.push(" " + data.list[i].name)
        //console.log(data.list[i].name)
      }

      document.getElementById("list-of-people").innerHTML = list_of_people
      console.log(list_of_people)

    })

};

window.onload = function (e) {
  getPeople(e);
}


document.getElementById("refresh").onclick = function (e) {
  window.location.reload()
}