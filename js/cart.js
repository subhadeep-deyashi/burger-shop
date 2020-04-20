var orders = JSON.parse(localStorage["data"]);
var totalQuantity = 0;
var totalPrice = 0;

function display() {
    var table = document.getElementById("cart");
    
    if(orders.length > 0) {
        for (var i = 1; i <= orders.length; i++) {
            var row = table.insertRow(i);
            row.id=""+i;
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            cell0.innerHTML = orders[i-1].name;
            cell1.innerHTML = orders[i-1].category;
            cell2.innerHTML = orders[i-1].price / orders[i-1].quantity;
            cell3.innerHTML = orders[i-1].quantity;
            cell4.innerHTML = orders[i-1].price;

            var btn = document.createElement('button');
            var img = document.createElement('img');
            img.src = "images/remove.gif";
            img.style.width=90+'px';
            btn.appendChild(img);
            btn.onclick = rem;
            cell5.appendChild(btn);

            totalQuantity += Number(orders[i-1].quantity);
            totalPrice += Number(orders[i-1].price);
        }
        document.getElementById('desc').innerHTML = "Total Quantity is <b>" + totalQuantity + "</b> & Total Price <b>Rs. " + totalPrice + "</b>.";
    }
    else{
        document.getElementById('desc').style.visibility = "hidden";
        document.getElementById('cart').style.visibility = "hidden";
        document.getElementById('place').style.visibility = "hidden";
        document.getElementById('placeOrder').style.visibility = "hidden";
        document.getElementById('header').style.width = "400px";
        document.getElementById('header').innerHTML = "NO ITEMS IN CART";
    }
}

function rem(event) {
    var row = event.target.parentNode.parentNode.parentNode;
    var qty = Number(row.childNodes[3].innerText);
    var price = Number(row.childNodes[4].innerText);
    totalPrice -= price;
    totalQuantity -= qty;
    
    document.getElementById(row.id).remove();
    if(totalQuantity == 0){
        document.getElementById('desc').style.visibility = "hidden";
        document.getElementById('cart').style.visibility = "hidden";
        document.getElementById('place').style.visibility = "hidden";
        document.getElementById('placeOrder').style.visibility = "hidden";
        document.getElementById('header').style.width = "400px";
        document.getElementById('header').innerHTML = "NO ITEMS IN CART";
    } else {
        document.getElementById('desc').innerHTML = "Total Quantity is <b>" + totalQuantity + "</b> & Total Price <b>Rs. " + totalPrice + "</b>.";
    }
}

function place() {   
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:9876/orders", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            alert(xmlHttp.responseText);
        }
    }
    xmlHttp.send(JSON.stringify({totalQuantity:totalQuantity, totalPrice:totalPrice})); 
}