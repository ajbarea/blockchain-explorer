const axios = require("axios");
const sha256 = require('sha256');
document.getElementById('previousPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
document.getElementById('addAccount').addEventListener('click', addAccount);
document.getElementById('closeAddAccountModal').addEventListener('click',closeAddAccountModal);
document.getElementById('closeAddAccount').addEventListener('click',closeAddAccountModal);
document.getElementById('createAdminAccount').addEventListener('click',createAdminAccount);
document.getElementById('closeEditAccount').addEventListener('click',closeEditAccountModal);
document.getElementById('closeEditAccountModal').addEventListener('click',closeEditAccountModal);
document.getElementById('editAdminAccount').addEventListener('click',editAdminAccount);
document.getElementById('closeDeleteAccount').addEventListener('click',closeDeleteAccountModal);
document.getElementById('closeDeleteAccountModal').addEventListener('click',closeDeleteAccountModal);
let adminAccounts;
let lastPage = 0;
let pageIndex = 1;
//called when page is open, to get all admin accounts and show in table
async function getAllAdminAccounts()
{
    axios.get("/admin/getAllAdminAccounts"
    ).then(res => {
        adminAccounts = res.data;
        let x = 0;
        lastPage = Math.ceil(adminAccounts.length / 5);
        for (let i = 0; i < adminAccounts.length; i++)
        {
            if (x < 5 && adminAccounts[i].email !== undefined)
            {
                document.getElementById(`email${i}`).innerHTML = `${adminAccounts[i].email}<br></br>`;
                document.getElementById(`firstname${i}`).innerHTML = `${adminAccounts[i].first_name} <br></br>`;
                document.getElementById(`lastname${i}`).innerHTML = `${adminAccounts[i].last_name}<br></br>`;
                document.getElementById(`button${i}`).innerHTML = `<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button><button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
                if (x === 0)
                {
                    document.getElementById(`edit0`).addEventListener("click", function(){
                        editAdminAccountAt(0);
                    });
                    document.getElementById(`delete0`).addEventListener("click", function(){
                        deleteAdminAccountAt(0);
                    });
                }
                if (x === 1)
                {
                    document.getElementById(`edit1`).addEventListener("click", function(){
                        editAdminAccountAt(1);
                    });
                    document.getElementById(`delete1`).addEventListener("click", function(){
                        deleteAdminAccountAt(1);
                    });
                }
                if (x === 2)
                {
                    document.getElementById(`edit2`).addEventListener("click", function(){
                        editAdminAccountAt(2);
                    });
                    document.getElementById(`delete2`).addEventListener("click", function(){
                        deleteAdminAccountAt(2);
                    });
                }
                if (x === 3)
                {
                    document.getElementById(`edit3`).addEventListener("click", function(){
                        editAdminAccountAt(3);
                    });
                    document.getElementById(`delete3`).addEventListener("click", function(){
                        deleteAdminAccountAt(3);
                    });
                }
                if (x === 4)
                {
                    document.getElementById(`edit4`).addEventListener("click", function(){
                        editAdminAccountAt(4);
                    });
                    document.getElementById(`delete4`).addEventListener("click", function(){
                        deleteAdminAccountAt(4);
                    });
                }
            }
            else
            {
                break;
            }
            x++;
        }
        document.getElementById("adminTable").style.display = "table";
        document.getElementById("nextPage").style.display = "inline";
        document.getElementById("previousPage").style.display = "inline";
        return adminAccounts;
    }).catch(error => {
        console.log(error);
    })
}
//change admin table pages
async function nextPage()
{
    let x = 0;
    if (pageIndex == lastPage)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + pageIndex * 5) < adminAccounts.length))
        {
            document.getElementById(`email${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5].first_name}<br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button><button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editAdminAccountAt(0);
                });
                document.getElementById(`delete0`).addEventListener("click", function(){
                    deleteAdminAccountAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editAdminAccountAt(1);
                });
                document.getElementById(`delete1`).addEventListener("click", function(){
                    deleteAdminAccountAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editAdminAccountAt(2);
                });
                document.getElementById(`delete2`).addEventListener("click", function(){
                    deleteAdminAccountAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editAdminAccountAt(3);
                });
                document.getElementById(`delete3`).addEventListener("click", function(){
                    deleteAdminAccountAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editAdminAccountAt(4);
                });
                document.getElementById(`delete4`).addEventListener("click", function(){
                    deleteAdminAccountAt(4);
                });
            }
        }
        else {
            document.getElementById(`email${i}`).innerHTML = "";
            document.getElementById(`firstname${i}`).innerHTML = "";
            document.getElementById(`lastname${i}`).innerHTML = "";
            document.getElementById(`button${i}`).innerHTML = "";
        }
        x++;
    }
    pageIndex++;
}
//change admin table pages
async function prevPage()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + pageIndex * 5 - 10 >= 0) {
            document.getElementById(`email${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 10].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 10].first_name}<br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 10].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button><button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editAdminAccountAt(0);
                });
                document.getElementById(`delete0`).addEventListener("click", function(){
                    deleteAdminAccountAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editAdminAccountAt(1);
                });
                document.getElementById(`delete1`).addEventListener("click", function(){
                    deleteAdminAccountAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editAdminAccountAt(2);
                });
                document.getElementById(`delete2`).addEventListener("click", function(){
                    deleteAdminAccountAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editAdminAccountAt(3);
                });
                document.getElementById(`delete3`).addEventListener("click", function(){
                    deleteAdminAccountAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editAdminAccountAt(4);
                });
                document.getElementById(`delete4`).addEventListener("click", function(){
                    deleteAdminAccountAt(4);
                });
            }
        }
        x++;
    }
    if (pageIndex === 1)
    {
        return;
    }
    pageIndex--;
    if (pageIndex == 1)
    {
    }
}
//display add account modal
async function addAccount()
{
    document.getElementById("addAccountModal").style.display = "block";
}
//add admin account once fields are filled and create account button is clicked
async function createAdminAccount()
{
    let email;
    let firstname;
    let lastname;
    let password;
    if (document.getElementById("password").value === "")
        password = null;
    else
        password = sha256(document.getElementById("password").value);

    if (document.getElementById("email").value === "")
        email = null;
    else
        email = document.getElementById("email").value;
    if (document.getElementById("firstname").value === "")
        firstname = null;
    else
        firstname = document.getElementById("firstname").value;
    if (document.getElementById("lastname").value === "")
        lastname = null;
    else
        lastname = document.getElementById("lastname").value;
    await axios.post("/admin/addAdminAccount", {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        }
    ).then((response) => {
        if (response.data === "Success") {
            document.getElementById("addAccountModal").style.display = "none";
            window.location.reload();
        }
    })
}
//close add account modal
async function closeAddAccountModal()
{
    document.getElementById("addAccountModal").style.display = "none";
}
//open edit account modal with placeholder values set to corresponding values
async function editAdminAccountAt(val)
{
    document.getElementById("editEmail").placeholder = `${adminAccounts[pageIndex * 5 - 5 + val].email}`;
    document.getElementById("editFirstname").placeholder = `${adminAccounts[pageIndex * 5 - 5 + val].first_name}`;
    document.getElementById("editLastname").placeholder = `${adminAccounts[pageIndex * 5 - 5 + val].last_name}`;
    document.getElementById("editAccountModal").style.display = "block";
}
//edit info in the database after edit account button is clicked
async function editAdminAccount()
{   let newEmail = "";
    let newFirstname = "";
    let newLastname = "";
    if (document.getElementById("editEmail").value !== "")
        newEmail = document.getElementById("editEmail").value;

    if (document.getElementById("editFirstname").value !== "")
        newFirstname = document.getElementById("editFirstname").value;

    if (document.getElementById("editLastname").value !== "")
        newLastname = document.getElementById("editLastname").value;

    await axios.post("/admin/editAdminAccount", {
            email: document.getElementById("editEmail").placeholder,
            newEmail: newEmail,
            newFirstname: newFirstname,
            newLastname: newLastname
        }
    ).then((response) => {
        console.log(response.data);
        if (response.data === "Success") {
            let i;
            document.getElementById("editAccountModal").style.display = "none";
            for (i = 0; i < adminAccounts.length; i++)
            {
                if(adminAccounts[i].email === document.getElementById("editEmail").placeholder)
                {
                    break;
                }
            }
            if (document.getElementById("editEmail").value !== "") {
                adminAccounts[i].email = document.getElementById("editEmail").value;
                document.getElementById("editEmail").value = "";
            }

            if (document.getElementById("editFirstname").value !== "") {
                adminAccounts[i].first_name = document.getElementById("editFirstname").value;
                document.getElementById("editFirstname").value = "";
            }

            if (document.getElementById("editLastname").value !== "") {
                adminAccounts[i].last_name = document.getElementById("editLastname").value;
                document.getElementById("editLastname").value = "";
            }
            updateTable();
        }
    })
}
//close edit account modal
async function closeEditAccountModal()
{
    document.getElementById("editAccountModal").style.display = "none";
}
//delete corresponding account from the database
async function deleteAdminAccountAt(val)
{
    document.getElementById("deleteAccountModal").style.display = "block";
    document.getElementById("deleteAdminAccount").addEventListener('click', delete0);
    async function delete0() {
        let deleteEmail = `${adminAccounts[pageIndex * 5 - 5 + val].email}`;
        await axios.post("/admin/deleteAdminAccount", {
                deleteEmail: deleteEmail
            }
        ).then((response) => {
            console.log(response.data);
            if (response.data === "Success") {
                document.getElementById("deleteAccountModal").style.display = "none";
                window.location.reload();
            }
        })
    }
}
//close delete account modal
async function closeDeleteAccountModal()
{
    document.getElementById("deleteAccountModal").style.display = "none";
}
async function updateTable()
{
    let x = 0;
    for (let i = 0; i < adminAccounts.length; i++)
    {
        if (x < 5 && adminAccounts[i + pageIndex * 5 - 5].email !== undefined)
        {
            document.getElementById(`email${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 5].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 5].first_name} <br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${adminAccounts[i + pageIndex * 5 - 5].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button><button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editAdminAccountAt(0);
                });
                document.getElementById(`delete0`).addEventListener("click", function(){
                    deleteAdminAccountAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editAdminAccountAt(1);
                });
                document.getElementById(`delete1`).addEventListener("click", function(){
                    deleteAdminAccountAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editAdminAccountAt(2);
                });
                document.getElementById(`delete2`).addEventListener("click", function(){
                    deleteAdminAccountAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editAdminAccountAt(3);
                });
                document.getElementById(`delete3`).addEventListener("click", function(){
                    deleteAdminAccountAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editAdminAccountAt(4);
                });
                document.getElementById(`delete4`).addEventListener("click", function(){
                    deleteAdminAccountAt(4);
                });
            }
        }
        else
        {
            document.getElementById(`email${i}`).innerHTML = "";
            document.getElementById(`firstname${i}`).innerHTML = "";
            document.getElementById(`lastname${i}`).innerHTML = "";
        }
        x++;
    }
    document.getElementById("adminTable").style.display = "table";
    document.getElementById("nextPage").style.display = "inline";
    document.getElementById("previousPage").style.display = "inline";
    return adminAccounts;
}
getAllAdminAccounts();
