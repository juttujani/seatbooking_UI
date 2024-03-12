const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const moiveselect = document.getElementById('moive')
// let ticketprice = +moiveselect.value;

populateUI();

//save movie data 

 function savemoivedata(moiveindex,moiveprice){
    localStorage.setItem('selectedmovieindex',JSON.stringify(moiveindex))
    localStorage.setItem('selectedmoiveprice',JSON.stringify(moiveprice))
 }



// updateselectcount

const updateselectcount=()=>{
    const selectedseats = document.querySelectorAll('.row .seat.selected')
    const selectedseatscount = selectedseats.length;
    count.innerText = selectedseatscount;
    total.innerText = selectedseatscount * ticketprice;
    // console.log(selectedseats);
    const seatsIndex = [...selectedseats].map(seat =>[...seats].indexOf(seat))
    // console.log(seatsIndex);
    localStorage.setItem('selectedseats',JSON.stringify(seatsIndex));
}

function populateUI(){
   const selectedseats = JSON.parse(localStorage.getItem('selectedseats'));
//    console.log(selectedseats);

if(selectedseats!==null&&seats.length>1){
    seats.forEach((seat,index)=>{
        if(selectedseats.indexOf(index)>-1){
            seat.classList.add('selected');
        }
    });
}
}

const selectedmoiveindex = localStorage.getItem('selectedmovieindex')

if(selectedmoiveindex!==null){
    moiveselect.selectedIndex = selectedmoiveindex;
}


// let ticketprice = localStorage.getItem('selectedmoiveprice') ? +JSON.parse(localStorage.getItem('selectedmoiveprice')) : +moiveselect.value;

let ticketprice = JSON.parse(localStorage.getItem('selectedmoiveprice'));

moiveselect.addEventListener('change',e=>{
    ticketprice =+e.target.value;
    // console.log(e.target.selectedIndex,e.target.value);
    savemoivedata(e.target.selectedIndex,e.target.value);
    updateselectcount();
    count.innerText = document.querySelectorAll('.row .seat.selected').length;
    total.innerText = count.innerText*ticketprice;
});





// seatselect event
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&&
    !e.target.classList.contains('occupied')
    )
    {
        e.target.classList.toggle('selected')
    }

    updateselectcount();
});

const bookbutton = document.getElementById('btn')
bookbutton.addEventListener('click',()=>{
    const selectedseats = document.querySelectorAll('.row .seat.selected')
    const seatsnumber = selectedseats.length;
    if(seatsnumber>0){
        const message = `you have booked ${seatsnumber} seats`
        alert(message)
    }else{
        alert('please select atleast one seat before booking')
    }
    updateselectcount();

    
});


const resetbutton = document.getElementById('reset')
resetbutton.addEventListener('click',()=>{
    const selectedseats = document.querySelectorAll('.row .seat.selected');
    selectedseats.forEach(seat=>seat.classList.remove('selected'))
    updateselectcount();
});




updateselectcount();