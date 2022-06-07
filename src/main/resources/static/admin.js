getAllUsers()

function getAllUsers() {
    $.ajax({
        type: "GET",
        url: "/api",
        dataType: "json",
        success: function (users) {
            console.log(users)
            let row = '';
            users.forEach((user) => {
                row += createRows(user);
            });
            $('#usersTable').append(row);
        }
    });
}


function createRows(user) {
    let listRoles = '';
    for (let element of user.roles) {
        listRoles += " " + element.name.replaceAll("ROLE_", "");
    }
    return  `<tr align="center" id=${user.id}>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${listRoles}</td>
                <td><input id="btnEdit" value="Edit" type="button" class="btn-info btn edit-btn" data-toggle="modal" data-target="#editModal" data-id="${user.id}"></td>
                <td><input id="btnDelete" value="Delete" type="button" class="btn btn-danger del-btn" data-toggle="modal" data-target="#deleteModal" data-id="${user.id}"></td>
                </tr>`
}


    $(document).on('click', '.edit-btn', function () {
    const user_id = $(this).attr('data-id');
    $.ajax({
        url: '/api/' + user_id,
        method: 'GET',
        dataType: 'json',
        success: function (user) {
            $(".editForm #id1").val(user.id);
            $(".editForm #name1").val(user.name);
            $(".editForm #age1").val(user.age);
            $(".editForm #email1").val(user.email);
            $(".editForm #password1").val(user.password);
        }
    });
});


$('#editButton').on('click', (e) => {
    e.preventDefault();

    let rolesIdForUpdate = Array.from(document.getElementById("role1").options).filter(option => option.selected).map(option => option.value)
    let user = {
        id: $("#id1").val(),
        name: $("#name1").val(),
        age: $("#age1").val(),
        email: $("#email1").val(),
        password: $("#password1").val(),
        rolesId: rolesIdForUpdate
    }

    $.ajax({
        url: '/api/edit',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(user),
        success: (updatedUser) => {
            let newRow = createRows(updatedUser);
            $('#usersTable').find('#' + updatedUser.id).replaceWith(newRow);
            $('#editModal').modal('hide')
            $('#usersTableActive').tab('show')
        }
    });
});



$("#newUserButton").on('click', () => {
    let rolesIdForNewUser = Array.from(document.getElementById("role0").options).filter(option => option.selected).map(option => option.value)

    let user = {
        name: $("#name0").val(),
        age: $("#age0").val(),
        email: $("#email0").val(),
        password: $("#password0").val(),
        rolesId: rolesIdForNewUser
    }

    $.ajax({
        url: '/api/new',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            $('#addNewUser')[0].reset();
            $('#usersTable').empty();
            getAllUsers();
            $('#usersTableActive').tab('show');
        }
    });
});


$(document).on('click', '.del-btn', function () {

    let user_id = $(this).attr('data-id');

    $.ajax({
        url: '/api/' + user_id,
        method: 'GET',
        dataType: 'json',
        success: function (user) {
            $(".deleteForm #id2").val(user.id);
            $(".deleteForm #name2").val(user.name);
            $(".deleteForm #age2").val(user.age);
            $(".deleteForm #email2").val(user.email);
            $(".deleteForm #password2").val(user.password);
        }
    })
});


$('#deleteButton').on('click', (e) => {
    e.preventDefault();
    let userId = $('#id2').val();
    $.ajax({
        url: '/api/' + userId,
        method: 'DELETE',
        success: function () {
            $('#' + userId).remove();
            $('#deleteModal').modal('hide');
            $('#usersTableActive').tab('show');
        }
    });
});