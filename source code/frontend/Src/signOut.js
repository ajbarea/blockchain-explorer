let btn = document.getElementById('signOut');
//when sign out it hit, clear the local storage of the browser
function clearLocalStorage()
{
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiresIn');
    window.location.href='loginPage';
}
btn.addEventListener('click', clearLocalStorage);