//Buttons   
let updateBtns = document.querySelectorAll(".update");
let deleteBtns = document.querySelectorAll(".delete");
let reviewBtns = document.querySelectorAll(".review");
let update_btn = document.getElementById("update_btn");
//Containers
const test = document.querySelector(".test");
const testar = document.querySelector(".test_2");


//Forms
let update_form = document.getElementById("update_form");
let reviewform = document.getElementById("review_form");

deleteBtns.forEach(btn =>{
    btn.addEventListener("click",(e) =>{
        console.log("clickar på del")
     let deleteid = e.target.attributes[0].value;
        
        $.ajax({
            url: "https://restaurantrating.herokuapp.com/resturant/delete/" + deleteid,
            type: "DELETE"
        }).done(function (data){
            location.reload()
        })
        
    })

})

updateBtns.forEach(btn =>{
    btn.addEventListener("click",(e) =>{
       // test.style.display = "block";
     let updateid = e.target.attributes[0].value;
        console.log(updateid);
        update_form.attributes[1].value = `/resturant/update/${updateid}?_method=put`;
        
    })

})

update_btn.addEventListener("click", () =>{

update_form.submit()

})

reviewBtns.forEach(btn =>{
    console.log("Klickar")
    btn.addEventListener("click",(e) =>{
      //  testar.style.display = "block";
        let reviewid = e.target.attributes[0].value;
        console.log(reviewid);
        reviewform.attributes[1].value = `/resturant/review/${reviewid}`;

      //  console.log(updateid);
      // update_form.attributes[1].value = `/resturant/update/${updateid}?_method=put`;
        
    })

})


/*
let update = document.getElementById("update");
update.addEventListener("click", () =>{
    fetch('change', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Darth Vader',
          'quote': 'I find your lack of faith disturbing.'
        })
      })

    }

});


document.getElementById("resturant_btn").addEventListener("click", () => {
    let resturants = document.querySelector(".resturants");
    resturants.classList.toggle("hidden");

});
*/