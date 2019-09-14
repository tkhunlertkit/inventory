// get the submit button
function getSubmitButton() {
    var inputs = document.getElementsByTagName("input");
    for (var ind in inputs) {
        var currElem = inputs[ind];
        if (currElem.getAttribute("type") == "submit") {
            return currElem;
        }
    }
}

// Extract all emails inputs
function getInputs(className) {
    var ret = [];
    var inputs = document.getElementsByClassName(className)
    // var inputs = document.getElementsByTagName("input");
    console.log(inputs.length);
    for (var ind=0; ind<inputs.length; ind++) {
        ret.push(inputs[ind].value);
        // if (currElem.getAttribute("type") == "email") {
        //     ret.push(currElem);
        // }
    }

    return ret;
}

function removeItem() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

// Create new email entity
function makeNew() {

    // create new input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "email");
    newInput.setAttribute("name", "emails[]");
    newInput.setAttribute("placeholder", "robert.paulson@hotmail.com");
    newInput.required = true;

    // create remove
    var removeLink = document.createElement("a");
    removeLink.setAttribute("href", "javascript:void(0);");
    removeLink.appendChild(document.createTextNode("[-]"));
    removeLink.addEventListener("click", removeItem);

    // generate new email div
    var newEmailDiv = document.createElement("div");
    newEmailDiv.appendChild(newInput);
    newEmailDiv.appendChild(removeLink);

    // insert newEmailDiv before submit button
    document.getElementById("form").insertBefore(newEmailDiv, getSubmitButton());
}

// function validateInputs() {

//     event.preventDefault();
//     var isError = false;
//     var emails = getEmailInputs();

//     for (var i=0; i<emails.length; i++) {
//         emails[i].setAttribute("class", "");
//     }

//     for (var i=0; i<emails.length; i++) {
//         for (var j=i+1; j<emails.length; j++) {
//             if (emails[i].value == emails[j].value) {
//                 emails[i].setAttribute("class", "error");
//                 emails[j].setAttribute("class", "error");
//                 isError = true;
//             }
//         }
//     }

//     if (isError) {
//         event.preventDefault();
//     }
// }

// // Setup when page loads
// function setup() {
//     // Bind "validateInputs()" to "form" submission
//     var form = document.getElementById("form");
//     form.addEventListener("submit", validateInputs);

//     // Bind "new" to makeNew when clicked.
//     var newLink = document.getElementById("new");
//     newLink.addEventListener("click", makeNew);

//     // call makeNew 1 time
//     makeNew();
// }

function makeNewItemInventory() {
    // create Item number input
    var newItemNumber = document.createElement("input");
    newItemNumber.setAttribute("type", "text");
    newItemNumber.setAttribute("name", "itemNumbers[]");
    newItemNumber.setAttribute("placeholder", "Fxxxxx");
    newItemNumber.setAttribute("class", "itemNumber");
    newItemNumberrequired = true;

    // create Quantity input
    var newQualityInput = document.createElement("input");
    newQualityInput.setAttribute("type", "number");
    newQualityInput.setAttribute("name", "quantities[]");
    newQualityInput.setAttribute("min", "0");
    newQualityInput.setAttribute("placeholder", "Quantity");
    newQualityInput.setAttribute("class", "quantity");
    newQualityInput.required = true;

    // create Price Paid ($) input
    // <input type="number" step="0.01"></input>
    var newPriceDollarInput = document.createElement("input");
    newPriceDollarInput.setAttribute("type", "number");
    newPriceDollarInput.setAttribute("name", "priceDollars[]");
    newPriceDollarInput.setAttribute("min", "0");
    newPriceDollarInput.setAttribute("step", "0.01");
    newPriceDollarInput.setAttribute("placeholder", "Price($)");
    newPriceDollarInput.setAttribute("class", "priceDollar");
    newPriceDollarInput.required = true;

    // create Price Paid (Baht) input
    // <input type="number" step="0.01"></input>
    var newPriceBahtInput = document.createElement("input");
    newPriceBahtInput.setAttribute("type", "number");
    newPriceBahtInput.setAttribute("name", "priceBahts[]");
    newPriceBahtInput.setAttribute("min", "0");
    newPriceBahtInput.setAttribute("step", "0.01");
    newPriceBahtInput.setAttribute("placeholder", "Price(฿)");
    newPriceBahtInput.setAttribute("class", "priceBaht");

    // create remove
    var removeLink = document.createElement("a");
    removeLink.setAttribute("href", "javascript:void(0);");
    removeLink.appendChild(document.createTextNode("[-]"));
    removeLink.addEventListener("click", removeItem);

    // generate new email div
    var newItemDiv = document.createElement("div");
    newItemDiv.appendChild(newItemNumber);
    newItemDiv.appendChild(newQualityInput);
    newItemDiv.appendChild(newPriceDollarInput);
    newItemDiv.appendChild(newPriceBahtInput);
    newItemDiv.appendChild(removeLink);

    // insert newItemDiv before submit button
    document.getElementById("form").insertBefore(newItemDiv, getSubmitButton());
}

function getItemData() {

}