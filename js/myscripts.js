var orders = [];

function addToCart(event){
    var name = event.target.parentNode.parentNode.childNodes[3].childNodes[1].innerText.trim();
    var quantity = event.target.parentNode.parentNode.childNodes[7].childNodes[3].value;
    var type = event.target.parentNode.parentNode.childNodes[5].childNodes[1].value;
    
    if(quantity > 5)
        quantity = 5;
    if(quantity == '0'){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    var price = 0;
    if(type == 'veg') {
        price = 100 * quantity;
    }
    else if(type == 'egg') {
        price = 150 * quantity;
    }
    else if(type == 'chicken') {
        price = 200 * quantity;
    }

    var order = {
        name:name,
        category:type,
        quantity:quantity,
        price:price
    }
    if(quantity>0) {
        orders.push(order);
    }
}

//console.log(orders);

function viewCart() {
    localStorage["data"] = JSON.stringify(orders);
    window.location.href = "./cart.html";
}