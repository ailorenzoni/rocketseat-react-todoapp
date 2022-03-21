const items = document.querySelectorAll(".drag");

items.forEach(function (item) {
  console.log(item);

  item.addEventListener("dragstart", function (event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    //event.dataTransfer.setData("Text", event.target.id);

    // Output some text when starting to drag the p element
    //document.getElementById("demo").innerHTML =
    //"Started to drag the p element.";

    // Change the opacity of the draggable element
    event.target.style.opacity = "0.3";
  });

  item.addEventListener("dragend", function (event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    //event.dataTransfer.setData("Text", event.target.id);

    // Output some text when starting to drag the p element
    //document.getElementById("demo").innerHTML =
    //"Started to drag the p element.";

    // Change the opacity of the draggable element
    event.target.style.opacity = "1";
  });
});
