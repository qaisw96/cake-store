// const API = 'http://localhost:3030'

$(() => {

  $('#order-form').on('submit',function authenticate(event) {


      event.preventDefault()
      $.ajax({
          type: "POST",
          url: "/save",
          data: {
              "date": Date.now(),
              "name": event.target.name.value,
              "phone_number": event.target.phone_number.value,
              "location": event.target.location.value,
              "juice": event.target.juice.value,
              "quantity": event.target.quantity.value,
            },
            success: function(data) {
                if(data.status == "success") {
                    // alert("successfully authenticated!")
                } else if(data.status == "failed") {
                    // alert("failed authentication!")
                }
                document.getElementById("order-form").reset()
                
            }
        });
        const para = $(`<p>Thank you ${event.target.name.value}, your order have sent. </p>`)
        para.attr('class', 'res-show')
        $('fieldset').append(para)
        $('.res-show').fadeOut(10000);
    })   
})



$('.delete-form').on('submit',function authenticate(event) {
    $(this).remove()
    event.preventDefault()
    $.ajax({
        type: "DELETE",
        url: "/order/delete",
        data: {
            "date": Date.now(),
            "id": event.target.id.value,
          },
          success: function(data) {
              if(data.status == "success") {
                  // alert("successfully authenticated!")
              } else if(data.status == "failed") {
                  // alert("failed authentication!")
              }
              
          }
      });
    })


    $('.update-form').on('submit',function authenticate(event) {
        $(this).fadeOut(1000)
        event.preventDefault()
        $.ajax({
            type: "PUT",
            url: "/item/update",
            data: {
                "date": Date.now(),
                "id": event.target.id.value,
                "name": event.target.name.value,
                "image": event.target.image.value,
                "price": event.target.price.value,
            },
            success: function(data) {
                if(data.status == "success") {
                    // alert("successfully authenticated!")
                } else if(data.status == "failed") {
                    // alert("failed authentication!")
                }
                
            }
        });
        $(this).fadeIn(300)
        })