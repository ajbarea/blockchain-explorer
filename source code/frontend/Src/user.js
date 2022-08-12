const axios = require("axios");
document.getElementById('previousPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
document.getElementById('previousGroups').addEventListener('click', prevGroups);
document.getElementById('nextGroups').addEventListener('click', nextGroups);
document.getElementById('previousWorkflows').addEventListener('click', prevWorkflows);
document.getElementById('nextWorkflows').addEventListener('click', nextWorkflows);
document.getElementById('addAccount').addEventListener('click', addAccount);
document.getElementById('closeAddAccountModal').addEventListener('click',closeAddAccountModal);
document.getElementById('closeAddAccount').addEventListener('click',closeAddAccountModal);
document.getElementById('createUserAccount').addEventListener('click',createUserAccount);
document.getElementById('closeEditAccount').addEventListener('click',closeEditAccountModal);
document.getElementById('closeEditAccountModal').addEventListener('click',closeEditAccountModal);
document.getElementById('editUserAccount').addEventListener('click',editUserAccount);
//document.getElementById('closeDeleteAccount').addEventListener('click',closeDeleteAccountModal);
//document.getElementById('closeDeleteAccountModal').addEventListener('click',closeDeleteAccountModal);
document.getElementById('closeEditGroupName').addEventListener('click',closeEditGroupNameModal);
document.getElementById('closeEditGroupNameModal').addEventListener('click',closeEditGroupNameModal);
document.getElementById('editGroupNameChange').addEventListener('click',editGroupName);
document.getElementById('closeEditWorkflowParams').addEventListener('click',closeEditWorkflowParamsModal);
document.getElementById('closeEditWorkflowParamsModal').addEventListener('click',closeEditWorkflowParamsModal);
document.getElementById('editWorkflowParamsChange').addEventListener('click',editWorkflowParams);
let groupIndex;
let groupLast;
let workflowIndex;
let workflowLast;
let lastPage = 0;
let pageIndex = 1;
let userAccounts;
let userGroups = new Array();
let userWorkflows = new Array();
let userId;
//get all user information and display as table
async function getAllUserAccounts()
{
    axios.get("/admin/getAllUserAccounts"
    ).then(res => {
        userAccounts = res.data;
        let x = 0;
        lastPage = Math.ceil(userAccounts.length / 5);
        for (let i = 0; i < userAccounts.length; i++)
        {
            if (x < 5 && userAccounts[i].email !== undefined)
            {
                document.getElementById(`email${i}`).innerHTML = `${userAccounts[i].email}<br></br>`;
                document.getElementById(`firstname${i}`).innerHTML = `${userAccounts[i].first_name} <br></br>`;
                document.getElementById(`lastname${i}`).innerHTML = `${userAccounts[i].last_name} <br></br>`;
                document.getElementById(`button${i}`).innerHTML = `<button id = "edit${i}" className = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><button id = "refresh${i}" className = "tableButton" title = "Refresh Access Token"><ion-icon name="refresh-outline"></ion-icon></button><button className = "tableButton" title = "Show Groups And Workflows" id = "show${i}"><ion-icon name="eye-outline"></ion-icon><br></br>`; //<button className = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button>
                if (x === 0)
                {
                    document.getElementById(`edit0`).addEventListener("click", function(){
                        editUserAccountAt(0);
                    });
                    //document.getElementById(`delete0`).addEventListener("click", function(){
                        //deleteUserAccountAt(0);
                    //});
                    document.getElementById(`refresh0`).addEventListener("click", function(){
                        refreshUserAccountAt(0);
                    });
                    document.getElementById(`show0`).addEventListener("click", function(){
                        showUserGroupsAndWorkflowsAt(0);
                    });
                }
                if (x === 1)
                {
                    document.getElementById(`edit1`).addEventListener("click", function(){
                        editUserAccountAt(1);
                    });
                    //document.getElementById(`delete1`).addEventListener("click", function(){
                        //deleteUserAccountAt(1);
                    //});
                    document.getElementById(`refresh1`).addEventListener("click", function(){
                        refreshUserAccountAt(1);
                    });
                    document.getElementById(`show1`).addEventListener("click", function(){
                        showUserGroupsAndWorkflowsAt(1);
                    });
                }
                if (x === 2)
                {
                    document.getElementById(`edit2`).addEventListener("click", function(){
                        editUserAccountAt(2);
                    });
                    //document.getElementById(`delete2`).addEventListener("click", function(){
                        //deleteUserAccountAt(2);
                    //});
                    document.getElementById(`refresh2`).addEventListener("click", function(){
                        refreshUserAccountAt(2);
                    });
                    document.getElementById(`show2`).addEventListener("click", function(){
                        showUserGroupsAndWorkflowsAt(2);
                    });
                }
                if (x === 3)
                {
                    document.getElementById(`edit3`).addEventListener("click", function(){
                        editUserAccountAt(3);
                    });
                    //document.getElementById(`delete3`).addEventListener("click", function(){
                        //deleteUserAccountAt(3);
                    //});
                    document.getElementById(`refresh3`).addEventListener("click", function(){
                        refreshUserAccountAt(3);
                    });
                    document.getElementById(`show3`).addEventListener("click", function(){
                        showUserGroupsAndWorkflowsAt(3);
                    });
                }
                if (x === 4)
                {
                    document.getElementById(`edit4`).addEventListener("click", function(){
                        editUserAccountAt(4);
                    });
                    //document.getElementById(`delete4`).addEventListener("click", function(){
                        //deleteUserAccountAt(4);
                    //});
                    document.getElementById(`refresh4`).addEventListener("click", function(){
                        refreshUserAccountAt(4);
                    });
                    document.getElementById(`show4`).addEventListener("click", function(){
                        showUserGroupsAndWorkflowsAt(4);
                    });
                }
            }
            else
            {
                break;
            }
            x++;
        }
        document.getElementById("userTable").style.display = "table";
        document.getElementById("nextPage").style.display = "inline";
        document.getElementById("previousPage").style.display = "inline";
        return userAccounts;
    }).catch(error => {
        console.log(error);
    })
}
//change user table pages
async function nextPage()
{
    let x = 0;
    if (pageIndex == lastPage)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + pageIndex * 5) < userAccounts.length))
        {
            document.getElementById(`email${i}`).innerHTML = `${userAccounts[i + pageIndex * 5].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5].first_name}<br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><button id = "refresh${i}" class = "tableButton" title = "Refresh Access Token"><ion-icon name="refresh-outline"></ion-icon></button><button class = "tableButton" title = "Show Groups And Workflows" id = "show${i}"><ion-icon name="eye-outline"></ion-icon><br></br>`; //<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button>
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editUserAccountAt(0);
                });
                //document.getElementById(`delete0`).addEventListener("click", function(){
                    //deleteUserAccountAt(0);
                //});
                document.getElementById(`refresh0`).addEventListener("click", function(){
                    refreshUserAccountAt(0);
                });
                document.getElementById(`show0`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editUserAccountAt(1);
                });
                //document.getElementById(`delete1`).addEventListener("click", function(){
                    //deleteUserAccountAt(1);
                //});
                document.getElementById(`refresh1`).addEventListener("click", function(){
                    refreshUserAccountAt(1);
                });
                document.getElementById(`show1`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editUserAccountAt(2);
                });
                //document.getElementById(`delete2`).addEventListener("click", function(){
                    //deleteUserAccountAt(2);
                //});
                document.getElementById(`refresh2`).addEventListener("click", function(){
                    refreshUserAccountAt(2);
                });
                document.getElementById(`show2`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editUserAccountAt(3);
                });
                //document.getElementById(`delete3`).addEventListener("click", function(){
                    //deleteUserAccountAt(3);
                //});
                document.getElementById(`refresh3`).addEventListener("click", function(){
                    refreshUserAccountAt(3);
                });
                document.getElementById(`show3`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editUserAccountAt(4);
                });
                //document.getElementById(`delete4`).addEventListener("click", function(){
                    //deleteUserAccountAt(4);
                //});
                document.getElementById(`refresh4`).addEventListener("click", function(){
                    refreshUserAccountAt(4);
                });
                document.getElementById(`show4`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(4);
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
//change user table pages
async function prevPage()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + pageIndex * 5 - 10 >= 0) {
            document.getElementById(`email${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 10].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 10].first_name}<br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 10].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><button id = "refresh${i}" class = "tableButton" title = "Refresh Access Token"><ion-icon name="refresh-outline"></ion-icon></button><button class = "tableButton" title = "Show Groups And Workflows" id = "show${i}"><ion-icon name="eye-outline"></ion-icon><br></br>`; //<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button>
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editUserAccountAt(0);
                });
                //document.getElementById(`delete0`).addEventListener("click", function(){
                    //deleteUserAccountAt(0);
                //});
                document.getElementById(`refresh0`).addEventListener("click", function(){
                    refreshUserAccountAt(0);
                });
                document.getElementById(`show0`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editUserAccountAt(1);
                });
                //document.getElementById(`delete1`).addEventListener("click", function(){
                    //deleteUserAccountAt(1);
                //});
                document.getElementById(`refresh1`).addEventListener("click", function(){
                    refreshUserAccountAt(1);
                });
                document.getElementById(`show1`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editUserAccountAt(2);
                });
                //document.getElementById(`delete2`).addEventListener("click", function(){
                    //deleteUserAccountAt(2);
                //});
                document.getElementById(`refresh2`).addEventListener("click", function(){
                    refreshUserAccountAt(2);
                });
                document.getElementById(`show2`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editUserAccountAt(3);
                });
                //document.getElementById(`delete3`).addEventListener("click", function(){
                    //deleteUserAccountAt(3);
                //});
                document.getElementById(`refresh3`).addEventListener("click", function(){
                    refreshUserAccountAt(3);
                });
                document.getElementById(`show3`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editUserAccountAt(4);
                });
                //document.getElementById(`delete4`).addEventListener("click", function(){
                    //deleteUserAccountAt(4);
                //});
                document.getElementById(`refresh4`).addEventListener("click", function(){
                    refreshUserAccountAt(4);
                });
                document.getElementById(`show4`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(4);
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
}
//display the add account modal when clicked on add account
async function addAccount()
{
    document.getElementById("addAccountModal").style.display = "block";
}
//close the add account modal when clicked on x or cancel
async function closeAddAccountModal()
{
    document.getElementById("addAccountModal").style.display = "none";
}
//create the user account once information is in
async function createUserAccount()
{
    await axios.post("/admin/addUserAccount", {
            email: document.getElementById("email").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value
        }
    ).then((response) => {
        if (response.data === "Success") {
            document.getElementById("addAccountModal").style.display = "none";
            window.location.reload();
        }
    })
}
//change the placeholder value of the edit account modal accordingly
async function editUserAccountAt(val)
{
    document.getElementById("editEmail").placeholder = `${userAccounts[pageIndex * 5 - 5 + val].email}`;
    document.getElementById("editFirstname").placeholder = `${userAccounts[pageIndex * 5 - 5 + val].first_name}`;
    document.getElementById("editLastname").placeholder = `${userAccounts[pageIndex * 5 - 5 + val].last_name}`;
    document.getElementById("editAccountModal").style.display = "block";
}
//edit the user account when information is in
async function editUserAccount()
{   let newEmail = "";
    let newFirstname = "";
    let newLastname = "";
    if (document.getElementById("editEmail").value !== "")
        newEmail = document.getElementById("editEmail").value;

    if (document.getElementById("editFirstname").value !== "")
        newFirstname = document.getElementById("editFirstname").value;

    if (document.getElementById("editLastname").value !== "")
        newLastname = document.getElementById("editLastname").value;

    await axios.post("/admin/editUserAccount", {
            email: document.getElementById("editEmail").placeholder,
            newEmail: newEmail,
            newFirstname: newFirstname,
            newLastname: newLastname
        }
    ).then((response) => {
        console.log(response.data);
        if (response.data === "Success") {
            document.getElementById("editAccountModal").style.display = "none";
            let i;
            for (i = 0; i < userAccounts.length; i++)
            {
                if(userAccounts[i].email === document.getElementById("editEmail").placeholder)
                {
                    break;
                }
            }
            if (document.getElementById("editEmail").value !== "") {
                userAccounts[i].email = document.getElementById("editEmail").value;
                document.getElementById("editEmail").value = "";
            }

            if (document.getElementById("editFirstname").value !== "") {
                userAccounts[i].first_name = document.getElementById("editFirstname").value;
                document.getElementById("editFirstname").value = "";
            }

            if (document.getElementById("editLastname").value !== "") {
                userAccounts[i].last_name = document.getElementById("editLastname").value;
                document.getElementById("editLastname").value = "";
            }
            updateTable();
        }
    })
}
//delete the user account when confirmed
/*
async function deleteUserAccountAt(val)
{
    document.getElementById("deleteAccountModal").style.display = "block";
    document.getElementById("deleteUserAccount").addEventListener('click', delete0);
    async function delete0() {
        let deleteEmail = `${userAccounts[pageIndex * 5 - 5 + val].email}`;
        await axios.post("/admin/deleteUserAccount", {
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
}*/
//hide the modals when closed
async function closeEditAccountModal()
{
    document.getElementById("editAccountModal").style.display = "none";
}
async function closeDeleteAccountModal()
{
    document.getElementById("deleteAccountModal").style.display = "none";
}
//refresh the token of the user account when clicked then reload the page if successful
async function refreshUserAccountAt(val)
{
    let tokenID;
    let userEmail = `${userAccounts[pageIndex * 5 - 5 + val].email}`;
    await axios.post("/admin/getUserToken", {
        email: userEmail
    }
    ).then((response) => {
        tokenID = response.data;
        axios.get("/v2/tokenCheck",
            {
                headers:
                    {
                        "Authorization": tokenID
                    }
            }
        ).then(res => {
            console.log(res);
            window.location.reload();
        }).catch(error => {
            if (error.response.status === 401)
            {
                console.log(error.response.data);
                window.location.reload();
            }
        })
    })
}
//show the user groups and workflow
async function showUserGroupsAndWorkflowsAt(val)
{
    groupIndex = 1;
    workflowIndex = 1;
    let userEmail = `${userAccounts[pageIndex * 5 - 5 + val].email}`;
    await axios.post("/admin/getUserIdWithEmail", {
        email: userEmail
    }
    ).then((response) =>{
        userId = response.data.id;
        document.getElementById(`userGroupsTitle`).innerHTML = `Groups for User ${userEmail}<br></br>`;
        axios.post("/admin/getGroupsWithId", {
            userId: userId
        }
        ).then((response) => {
            userGroups = response.data;
            let x = 0;
            groupLast = Math.ceil(userGroups.length / 5);
            for (let i = 0; i < 5; i++)
            {
                document.getElementById(`group${i}`).innerHTML = ``;
            }
            for (let i = 0; i < userGroups.length; i++)
            {
                if (x < 5 && userGroups[i].group_name !== undefined)
                {
                    document.getElementById(`group${i}`).innerHTML = `Group: ${userGroups[i].group_name} with API Key "${userGroups[i].API_key}"<button id = "editGroupName${i}" class = "tableButton" title = "Edit Group Name"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
                    if (x === 0)
                    {
                        document.getElementById(`editGroupName0`).addEventListener("click", function(){
                            editGroupNameAt(0);
                        });
                    }
                    if (x === 1)
                    {
                        document.getElementById(`editGroupName1`).addEventListener("click", function(){
                            editGroupNameAt(1);
                        });
                    }
                    if (x === 2)
                    {
                        document.getElementById(`editGroupName2`).addEventListener("click", function(){
                            editGroupNameAt(2);
                        });
                    }
                    if (x === 3)
                    {
                        document.getElementById(`editGroupName3`).addEventListener("click", function(){
                            editGroupNameAt(3);
                        });
                    }
                    if (x === 4)
                    {
                        document.getElementById(`editGroupName4`).addEventListener("click", function(){
                            editGroupNameAt(4);
                        });
                    }
                }
                x++;
            }
            document.getElementById("userGroups").style.display = "table";
            document.getElementById("nextGroups").style.display = "inline";
            document.getElementById("previousGroups").style.display = "inline";
            return userGroups;
        })
        document.getElementById(`userWorkflowsTitle`).innerHTML = `Workflows for User ${userEmail}<br></br>`;
        axios.post("/admin/getWorkflowInfoWithId", {
                userId: userId
            }
        ).then((response) => {
            userWorkflows = response.data;
            let x = 0;
            workflowLast = Math.ceil(userWorkflows.length / 5);
            for (let i = 0; i < 5; i++)
            {
                document.getElementById(`workflow${i}`).innerHTML = ``;
            }
            for (let i = 0; i < userWorkflows.length; i++)
            {
                if (x < 5 && userWorkflows[i].workflow_name !== undefined)
                {
                    document.getElementById(`workflow${i}`).innerHTML = `Workflow: ${userWorkflows[i].workflow_name} with Workflow ID "${userWorkflows[i].workflow_id}"<button id = "editWorkflowParams${i}" class = "tableButton" title = "Edit Workflow Params"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
                    if (x === 0)
                    {
                        document.getElementById(`editWorkflowParams0`).addEventListener("click", function(){
                            editWorkflowParamsAt(0);
                        });
                    }
                    if (x === 1)
                    {
                        document.getElementById(`editWorkflowParams1`).addEventListener("click", function(){
                            editWorkflowParamsAt(1);
                        });
                    }
                    if (x === 2)
                    {
                        document.getElementById(`editWorkflowParams2`).addEventListener("click", function(){
                            editWorkflowParamsAt(2);
                        });
                    }
                    if (x === 3)
                    {
                        document.getElementById(`editWorkflowParams3`).addEventListener("click", function(){
                            editWorkflowParamsAt(3);
                        });
                    }
                    if (x === 4)
                    {
                        document.getElementById(`editWorkflowParams4`).addEventListener("click", function(){
                            editWorkflowParamsAt(4);
                        });
                    }
                }
                x++;
            }
            document.getElementById("userWorkflows").style.display = "table";
            document.getElementById("nextWorkflows").style.display = "inline";
            document.getElementById("previousWorkflows").style.display = "inline";
            return userWorkflows;
        })
    })
}
//change the groups table page
async function nextGroups()
{
    let x = 0;
    if (groupIndex == groupLast)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + groupIndex * 5) < userGroups.length))
        {
            document.getElementById(`group${i}`).innerHTML = `Group: ${userGroups[i + groupIndex * 5].group_name} with API Key "${userGroups[i + groupIndex * 5].API_key}"<button id = "editGroupName${i}" class = "tableButton" title = "Edit Group Name"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`editGroupName0`).addEventListener("click", function(){
                    editGroupNameAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`editGroupName1`).addEventListener("click", function(){
                    editGroupNameAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`editGroupName2`).addEventListener("click", function(){
                    editGroupNameAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`editGroupName3`).addEventListener("click", function(){
                    editGroupNameAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`editGroupName4`).addEventListener("click", function(){
                    editGroupNameAt(4);
                });
            }
            else
            {
                document.getElementById(`group${i}`).innerHTML = ``;
            }
            x++;
        }
    }
    groupIndex++;
}
//change the groups table page
async function prevGroups()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + groupIndex * 5 - 10 >= 0) {
            document.getElementById(`group${i}`).innerHTML = `Group: ${userGroups[i + groupIndex * 5 - 10].group_name} with API Key "${userGroups[i + groupIndex * 5 - 10].API_key}"<button id = "editGroupName${i}" class = "tableButton" title = "Edit Group Name"><ion-icon name="create-outline"></ion-icon></button><br></br>`;

            if (x === 0)
            {
                document.getElementById(`editGroupName0`).addEventListener("click", function(){
                    editGroupNameAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`editGroupName1`).addEventListener("click", function(){
                    editGroupNameAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`editGroupName2`).addEventListener("click", function(){
                    editGroupNameAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`editGroupName3`).addEventListener("click", function(){
                    editGroupNameAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`editGroupName4`).addEventListener("click", function(){
                    editGroupNameAt(4);
                });
            }
        }
        x++;
    }
    if (groupIndex === 1)
    {
        return;
    }
    groupIndex--;
}
//change the workflow table page
async function nextWorkflows()
{
    let x = 0;
    if (workflowIndex == workflowLast)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + workflowIndex * 5) < userWorkflows.length))
        {
            document.getElementById(`workflow${i}`).innerHTML = `Workflow: ${userWorkflows[i + workflowIndex * 5].workflow_name} with Workflow ID "${userWorkflows[i + workflowIndex * 5].workflow_id}"<button id = "editWorkflowParams${i}" class = "tableButton" title = "Edit Workflow Params"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`editWorkflowParams0`).addEventListener("click", function(){
                    editWorkflowParamsAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`editWorkflowParams1`).addEventListener("click", function(){
                    editWorkflowParamsAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`editWorkflowParams2`).addEventListener("click", function(){
                    editWorkflowParamsAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`editWorkflowParams3`).addEventListener("click", function(){
                    editWorkflowParamsAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`editWorkflowParams4`).addEventListener("click", function(){
                    editWorkflowParamsAt(4);
                });
            }
        }
        else
        {
            document.getElementById(`workflow${i}`).innerHTML = ``;
        }
        x++;
    }
    workflowIndex++;
}
//change the workflow table page
async function prevWorkflows()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + workflowIndex * 5 - 10 >= 0) {
            document.getElementById(`workflow${i}`).innerHTML = `Workflow: ${userWorkflows[i + workflowIndex * 5 - 10].workflow_name} with Workflow ID "${userWorkflows[i + workflowIndex * 5 - 10].workflow_id}"<button id = "editWorkflowParams${i}" class = "tableButton" title = "Edit Workflow Params"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`editWorkflowParams0`).addEventListener("click", function(){
                    editWorkflowParamsAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`editWorkflowParams1`).addEventListener("click", function(){
                    editWorkflowParamsAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`editWorkflowParams2`).addEventListener("click", function(){
                    editWorkflowParamsAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`editWorkflowParams3`).addEventListener("click", function(){
                    editWorkflowParamsAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`editWorkflowParams4`).addEventListener("click", function(){
                    editWorkflowParamsAt(4);
                });
            }
        }
        x++;
    }
    if (workflowIndex === 1)
    {
        return;
    }
    workflowIndex--;
}
//change placeholder values for the edit account modal
async function editGroupNameAt(val)
{
    document.getElementById("editGroupName").placeholder = `${userGroups[groupIndex * 5 - 5 + val].group_name}`;
    document.getElementById("editGroupNameModal").style.display = "block";
}
//change the placeholder value of the edit group name modal and then when confirmed edit the data in the userbase
async function editGroupName()
{   let groupName = document.getElementById("editGroupName").placeholder;
    console.log(groupName);
    let newGroupName = "";
    if (document.getElementById("editGroupName").value !== "")
        newGroupName = document.getElementById("editGroupName").value;

    await axios.post("/admin/editGroupName", {
            groupName: groupName,
            newGroupName: newGroupName
        }
    ).then((response) => {
        console.log(response.data);
        if (response.data === "Success") {
            document.getElementById("editGroupNameModal").style.display = "none";
            let i;
            for (i = 0; i < userGroups.length; i++)
            {
                if(userGroups[i].group_name === document.getElementById("editGroupName").placeholder)
                {
                    break;
                }
            }
            if (document.getElementById("editGroupName").value !== "") {
                userGroups[i].group_name = document.getElementById("editGroupName").value;
                document.getElementById("editGroupName").value = "";
            }
            updateGroupTable();
        }
    })
}
//hide edit group name modal
async function closeEditGroupNameModal()
{
    document.getElementById("editGroupNameModal").style.display = "none";
}
//change placeholder value of edit workflow params modal
async function editWorkflowParamsAt(val)
{
    document.getElementById("modal-title").innerHTML = `${userWorkflows[workflowIndex * 5 - 5 + val].workflow_id}`;
    document.getElementById("editWorkflowParams").placeholder = `${userWorkflows[workflowIndex * 5 - 5 + val].params}`;
    document.getElementById("editWorkflowParamsModal").style.display = "block";
}
//change workflow params
async function editWorkflowParams()
{
    let workflow_id = document.getElementById("modal-title").innerHTML;
    let newParams = "";
    if (document.getElementById("editWorkflowParams").value !== "")
        newParams = document.getElementById("editWorkflowParams").value;

    await axios.post("/admin/editWorkflowParams", {
            workflow_id: workflow_id,
            newParams: newParams,
            userId: userId
        }
    ).then((response) => {
        console.log(response.data);
        if (response.data === "Success") {
            document.getElementById("editWorkflowParamsModal").style.display = "none";
            let i;
            for (i = 0; i < userWorkflows.length; i++)
            {
                if(userWorkflows[i].workflow_id === document.getElementById("modal-title").innerHTML)
                {
                    break;
                }
            }
            userWorkflows[i].params = document.getElementById("editWorkflowParams").value;
            document.getElementById("editWorkflowParams").value = "";
        }
    })
}
//hide edit workflow params modal
async function closeEditWorkflowParamsModal()
{
    document.getElementById("editWorkflowParamsModal").style.display = "none";
}
//update the table after an edit instead of reloading the page
async function updateTable()
{
    let x = 0;
    for (let i = 0; i < userAccounts.length; i++)
    {
        if (x < 5 && userAccounts[i + pageIndex * 5 - 5].email !== undefined)
        {
            document.getElementById(`email${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 5].email}<br></br>`;
            document.getElementById(`firstname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 5].first_name} <br></br>`;
            document.getElementById(`lastname${i}`).innerHTML = `${userAccounts[i + pageIndex * 5 - 5].last_name}<br></br>`;
            document.getElementById(`button${i}`).innerHTML = `<button id = "edit${i}" class = "tableButton" title = "Edit Account Information"><ion-icon name="create-outline"></ion-icon></button><button id = "refresh${i}" class = "tableButton" title = "Refresh Access Token"><ion-icon name="refresh-outline"></ion-icon></button><button class = "tableButton" title = "Show Groups And Workflows" id = "show${i}"><ion-icon name="eye-outline"></ion-icon><br></br>`; //<button class = "tableButton" title = "Delete Account" id = "delete${i}"><ion-icon name="trash-outline"></ion-icon></button>
            if (x === 0)
            {
                document.getElementById(`edit0`).addEventListener("click", function(){
                    editUserAccountAt(0);
                });
                //document.getElementById(`delete0`).addEventListener("click", function(){
                    //deleteUserAccountAt(0);
                //});
                document.getElementById(`refresh0`).addEventListener("click", function(){
                    refreshUserAccountAt(0);
                });
                document.getElementById(`show0`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`edit1`).addEventListener("click", function(){
                    editUserAccountAt(1);
                });
                //document.getElementById(`delete1`).addEventListener("click", function(){
                    //deleteUserAccountAt(1);
                //});
                document.getElementById(`refresh1`).addEventListener("click", function(){
                    refreshUserAccountAt(1);
                });
                document.getElementById(`show1`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`edit2`).addEventListener("click", function(){
                    editUserAccountAt(2);
                });
                //document.getElementById(`delete2`).addEventListener("click", function(){
                    //deleteUserAccountAt(2);
                //});
                document.getElementById(`refresh2`).addEventListener("click", function(){
                    refreshUserAccountAt(2);
                });
                document.getElementById(`show2`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`edit3`).addEventListener("click", function(){
                    editUserAccountAt(3);
                });
                //document.getElementById(`delete3`).addEventListener("click", function(){
                    //deleteUserAccountAt(3);
                //});
                document.getElementById(`refresh3`).addEventListener("click", function(){
                    refreshUserAccountAt(3);
                });
                document.getElementById(`show3`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`edit4`).addEventListener("click", function(){
                    editUserAccountAt(4);
                });
                //document.getElementById(`delete4`).addEventListener("click", function(){
                    //deleteUserAccountAt(4);
                //});
                document.getElementById(`refresh4`).addEventListener("click", function(){
                    refreshUserAccountAt(4);
                });
                document.getElementById(`show4`).addEventListener("click", function(){
                    showUserGroupsAndWorkflowsAt(4);
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
    document.getElementById("userTable").style.display = "table";
    document.getElementById("nextPage").style.display = "inline";
    document.getElementById("previousPage").style.display = "inline";
    return userAccounts;
}
//update the table after an edit instead of reloading the page
async function updateGroupTable()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        document.getElementById(`group${i}`).innerHTML = ``;
    }
    for (let i = 0; i < userGroups.length; i++)
    {
        if (x < 5 && userGroups[i + groupIndex * 5 - 5].group_name !== undefined)
        {
            document.getElementById(`group${i}`).innerHTML = `Group: ${userGroups[i + groupIndex * 5 - 5].group_name} with API Key "${userGroups[i].API_key}"<button id = "editGroupName${i}" class = "tableButton" title = "Edit Group Name"><ion-icon name="create-outline"></ion-icon></button><br></br>`;
            if (x === 0)
            {
                document.getElementById(`editGroupName0`).addEventListener("click", function(){
                    editGroupNameAt(0);
                });
            }
            if (x === 1)
            {
                document.getElementById(`editGroupName1`).addEventListener("click", function(){
                    editGroupNameAt(1);
                });
            }
            if (x === 2)
            {
                document.getElementById(`editGroupName2`).addEventListener("click", function(){
                    editGroupNameAt(2);
                });
            }
            if (x === 3)
            {
                document.getElementById(`editGroupName3`).addEventListener("click", function(){
                    editGroupNameAt(3);
                });
            }
            if (x === 4)
            {
                document.getElementById(`editGroupName4`).addEventListener("click", function(){
                    editGroupNameAt(4);
                });
            }
        }
        x++;
    }
    document.getElementById("userGroups").style.display = "table";
    document.getElementById("nextGroups").style.display = "inline";
    document.getElementById("previousGroups").style.display = "inline";
    return userGroups;
}
getAllUserAccounts()