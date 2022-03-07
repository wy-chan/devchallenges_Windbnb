let myData;
let myDataSorted;

let dataURL = 'https://raw.githubusercontent.com/wy-chan/devchallenges_Windbnb/main/stays.json';

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

$(document).ready(function () {
  getData().then(() => {
     myDataSorted = myData;
     console.log('DataSorted');
     console.log(myDataSorted);
  });
});
