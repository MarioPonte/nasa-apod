// Esta função pega a data do campo de procura e manda ela para que possa ser chamada
function getDate() {
	return document.getElementById('dateSearch').value;
}

// Data atual

var data = new Date();
var ano = data.getFullYear();
var mes = data.getMonth()+1;
var dia = String(data.getDate()).padStart(2,'0');
var dataPadrao = ano + '-' + mes + '-' + dia;

document.getElementById("dateSearch").max = dataPadrao;
document.getElementById("dateSearch").min = '1995-06-20';

async function call() {
	
// Remover icone do meteoro

let met = document.getElementById("meteoro");

if(met != null){
	met.remove();
}else{
	
}

// Request api da NASA
	
let xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				
				let date = new Date(data["date"]);
				let dateString = moment(date).format('DD-MM-YYYY');
				let explanation = data["explanation"];
				let hdurl = data["hdurl"];
				let media_type = data["media_type"];
				let service_version = data["service_version"];
				let title = data["title"];
				let url = data["url"];
				
				let imageType = `
					<div
					  class="bg-image hover-overlay ripple shadow-1-strong rounded"
					  data-mdb-ripple-color="light"
					>
					  <img
					  id="wrapper-image"
						src="" 
						class="w-100" 
					  />
					  <a id="wrapper-hdurl" href="" target="_blank">
						<div 
						  class="mask" 
						  style="background-color: rgba(251, 251, 251, 0.2)"
						></div>
					  </a>
					</div>
				`;
				
				let videoType = `
					<div class="ratio ratio-16x9">
						<iframe
							id="wrapper-video"
							src=""
							title="YouTube video"
							allowfullscreen
						></iframe>
					</div>
				`;
				
				document.getElementById("wrapper-title").innerHTML = title;
				document.getElementById("wrapper-date").innerHTML = dateString;
				document.getElementById("wrapper-explanation").innerHTML = explanation;
				
				if (media_type === "video") {
					document.getElementById("wrapper-media").innerHTML = videoType;
					document.getElementById("wrapper-video").src = url;
				} else {
					document.getElementById("wrapper-media").innerHTML = imageType;
					document.getElementById("wrapper-image").src = url;
					document.getElementById("wrapper-hdurl").href = hdurl;
				}
				
			}
		}
		
		let queryUrl = "https://api.nasa.gov/planetary/apod?";
		let queryKey = "api_key=leWsmyC7lJSYGrpntyDmUmaenjXwR4zZKbPv4LgJ&";
		let queryDate = "date=" + getDate() + "&";
		
		let queryFull = queryUrl + queryKey + queryDate;
		
		xmlhttp.open("GET", queryFull, true);
		xmlhttp.send();
	
}