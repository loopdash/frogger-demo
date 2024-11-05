const password = "votingmatters";  
const userPassword = prompt("Enter the password to access this page:");

if (userPassword !== password) {
    alert("Incorrect password! Redirecting to Loopdash...");
    window.location.href = "https://loopdash.com/";  
}
