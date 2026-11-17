window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const transfer=  params.get('TransferType');
    const location = params.get('Destination');
    const number = params.get('number of passengers');

    document.getElementById("location").value = location;


    if (number< 3) {
        a = "images/standard-car.webp";
      } else if ( number <= 4 & number >= 3 ) {
        a = "images/suv-estate-car.webp";
      } else if (number <= 6 & number >= 5) {
        a = "images/family-minivan.webp";
      } 
      else if (number <= 8 & number >= 7) {
        a = "images/standard-minivan.webp";
      }
      else if (number <= 10 & number >= 9) {
        a = "images/executive-minivan.webp";
      }
       else {
        a = "images/coaster-bus.webp";
      }

  
      
      if (number< 4) 
      {
        b = "Discounted Price: €35 ";
      }  else if ( number == 4  )
      {
        b = "Discounted Price: €50 ";
      }
      else if ( number <= 6 & number >= 5 )
      {
        b = "Discounted Price: €60 ";
      } 
      else if (number <= 10 & number >= 7) 
      {
        b = "Discounted Price: €60";
      
      }
      else {
        b = "Discounted Price: €60";
      }
      
      
      
      

      if (number<= 3)
      {
        c = "€40";
      } 
      else if ( number > 3 & number <= 4 )
      {
          c = "€55";
      }
      else if ( number <= 6 & number >= 5 )
      {
        c = "€65";
      }
      else if ( number <= 10 & number >= 7 ) 
      {
        c = "€65";
      }  
      else {
        c = "€65";
      }



    var elem = document.createElement("img");
        elem.setAttribute("src", a);
        elem.setAttribute("alt", "vehicle type");
        elem.classList. add('img-fluid');
        document.getElementById("placehere").appendChild(elem);

    document.getElementById('transfer_type').innerHTML = transfer;
    document.getElementById('location-name').innerHTML = location;
    

    document.getElementById('passenger-number').innerHTML = number;
    document.getElementById('price').innerHTML = b;
    document.getElementById('fixed-price').innerHTML = c;


})


// window.addEventListener('click', () => {


//   document.getElementById("quote-form").classList.add("hideQuote");
//   document.getElementById("info-form").classList.remove("info_form");


// })

function clickMe() {
  document.getElementById("quote-form").classList.add("hideQuote");
 document.getElementById("info-form").classList.remove("info_form");
}