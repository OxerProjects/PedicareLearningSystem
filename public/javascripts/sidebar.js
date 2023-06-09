function addClassBasedOnURL() {
    // Get the current page URL
    var pageURL = window.location.href;
    
    // Extract the ID from the URL
    var urlID = pageURL.substring(pageURL.lastIndexOf("/") + 1);
    
    // Get the div element by ID
    var divElement = document.getElementById(urlID);
    
    // Add a class to the div element
    if (divElement) {
      divElement.classList.add("navOptionSeltcted"); // Replace "active" with your desired class name
    }
}
  
// Run the function when the page loads
window.addEventListener("load", addClassBasedOnURL);