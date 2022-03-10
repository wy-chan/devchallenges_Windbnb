let myData;
let myDataSorted;

let dataURL = 'https://raw.githubusercontent.com/wy-chan/devchallenges_Windbnb/main/stays.json';

let currentLocation = "Helsinki, Finland";
let currentGuest = 0;
    

function getData() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
      dataURL,
    success: 
    function (jsonData) {
      if (typeof jsonData === 'string') {
        myData = JSON.parse(jsonData);
        console.log('myData');
        console.log(myData);
      }
    }
  });
}


function getBoxes(d){
  for(let i=0; i< d.length;i++){
    getBox(d[i]);
  }
}

function getBox(d){
const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");
const imgBox = document.createElement("div");
imgBox.classList.add("img-box");
const roomImg = document.createElement("img");
roomImg.classList.add("room-img");
roomImg.alt = "Room Image";
roomImg.src= d.photo;
const descBox = document.createElement("div");
descBox.classList.add("desc-box");
const descBoxL = document.createElement("div");
descBoxL.classList.add("desc-box-L");
const superHost = document.createElement("span");
superHost.classList.add("super-host");
superHost.textContent="Super host";
const details = document.createElement("span");
details.classList.add("details");
details.textContent= d.type;
const beds = document.createElement("beds");
beds.classList.add("details");
beds.textContent=" . " + d.beds + " beds";
const descBoxR = document.createElement("div");
descBoxR.classList.add("desc-box-R");
const starIcon = document.createElement("span");
starIcon.classList.add("material-icons");
starIcon.classList.add("star-icon");
starIcon.textContent="star";
const rating = document.createElement("span");
rating.classList.add("rating")
rating.textContent= d.rating;
const boxTitle = document.createElement("h2");
boxTitle.classList.add("box-title");
boxTitle.textContent = d.title;

gridBox.appendChild(imgBox);
gridBox.appendChild(descBox);
gridBox.appendChild(boxTitle);

imgBox.appendChild(roomImg);

descBox.appendChild(descBoxL);
descBox.appendChild(descBoxR);
if(d.superHost == true){
descBoxL.appendChild(superHost);
}
descBoxL.appendChild(details);
if(d.beds != null){
descBoxL.appendChild(beds);
}
descBox.appendChild(descBoxR);
descBoxR.appendChild(starIcon);
descBoxR.appendChild(rating);

document.getElementById("grid-group").appendChild(gridBox);
}

function openNav(){
  document.getElementById("navbar-expand").classList.remove("hidden");
}
function closeNav(){
  document.getElementById("navbar-expand").classList.add("hidden");
}
function openLocationSelect(){
document.getElementById("search-guest-l").classList.remove("search-focus");
document.getElementById("search-location-l").classList.add("search-focus");
document.getElementById("location-list").classList.remove("hidden");
document.getElementById("guest-list").classList.add("hidden");
if($("#total-guests").text() == "Add guests"){
  document.getElementById("search-guest-l").classList.remove("search-active");
};
}
function openGuestSelect(){
document.getElementById("search-location-l").classList.remove("search-focus");
document.getElementById("search-guest-l").classList.add("search-focus");
document.getElementById("location-list").classList.add("hidden");
document.getElementById("guest-list").classList.remove("hidden");
document.getElementById("search-guest-l").classList.add("search-active");
}

function locationSelect(t){
  currentLocation= t.slice(5,t.length);
  $("#searh-bar-location").text(currentLocation);
  openGuestSelect();
}

function handleGuest(t){
  let currentAdult = parseInt($("#adult-no").text());
  let currentChild = parseInt($("#child-no").text());
  let currentTotal = currentAdult + currentChild;
  let newTotal = currentTotal;

  switch(t){
      case "adult-add": 
      if(currentAdult == 0 ||currentAdult ==1){
        $("#adult-remove").prop('disabled', false);
      };
      currentAdult+=1;
      newTotal+=1;
      $("#adult-no").text(currentAdult);
      break;
      case "adult-remove": 
      currentAdult-=1;
      newTotal-=1;
      $("#adult-no").text(currentAdult);
      if(currentAdult == 0){
        $("#adult-remove").prop('disabled', true);
      };
      break;
      case "child-add" : 
      if(currentChild == 0){
        $("#child-remove").prop('disabled', false);
      };
      currentChild+=1;
      newTotal+=1;
      $("#child-no").text(currentChild);
      if(currentAdult==0){
        handleGuest("adult-add");
        newTotal+=1;
      }
      break;
      case "child-remove": 
      currentChild-=1
      newTotal-=1;
      $("#child-no").text(currentChild);
      if(currentChild == 0){
        $("#child-remove").prop('disabled', true);
      };
      break;
      default: ;
  };
  if(currentAdult==1){
    if(currentChild!=0){
          $("#adult-remove").prop('disabled', true);
    }else{
          $("#adult-remove").prop('disabled', false);
    }
  };
  if(newTotal != 0){
     $("#total-guests").text(newTotal+" guests");
  }else{
    $("#total-guests").text("Add guests");
  };
  currentGuest = newTotal;
}

function sortLocation(){
  let newList=[];
  for(let i=0; i< myData.length;i++){
    let checkLocation = currentLocation.indexOf(myData[i].city);
    if(checkLocation>= 0){
      newList.push(myData[i]);
    };
  };
  return newList;
}
function sortGuests(list){
  let newList=[];
  for(let i=0; i< list.length;i++){
    if(currentGuest <= list[i].maxGuests){
      newList.push(list[i]);
    };
  };
  return newList; 
}

function handleSearch(){
  currentLocation = $("#searh-bar-location").text();
  currentguest = $("#total-guests").text();
  $("#search-location").text(currentLocation);
  $("#search-guest").text(currentguest);
  if(currentguest == "Add guests"){
    $("#search-guest").removeClass("search-active");
  }else{
    $("#search-guest").addClass("search-active");
  };
  let locationList = sortLocation();
  let guestList = sortGuests(locationList);
  $("#grid-group").empty();
  getBoxes(guestList);
}

$(document).ready(function () {
  getData().then(() => {
     myDataSorted = myData;
     getBoxes(myDataSorted);
  });
  $(".search-btn-s").on("click",openNav);
  $(".search-icon-l").on("click",closeNav);
  $(".nav-blank").on("click",closeNav);
  $(".location-options").on("click",function(){locationSelect($(this).text())});
  $(".search-location").on("click",openLocationSelect);
  $("#search-location-l").on("click",openLocationSelect);
  $(".search-guest").on("click",openGuestSelect);
  $("#search-guest-l").on("click",openGuestSelect);
  $(".change-btn").on("click",function(){handleGuest(this.id)});
  $(".search-icon-l").on("click",handleSearch);
});
