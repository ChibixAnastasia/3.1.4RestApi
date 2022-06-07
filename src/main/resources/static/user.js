createTable()

async function createTable() {
    let response = await fetch('/api/user')
    let user = await response.json()
    console.log(user)

    let listRoles = '';
    for(let element of user.authorities) {
        listRoles +=" " + element.name.replaceAll("ROLE_", "");
    }
    console.log(listRoles);

    let userid = user.id;
    let name = user.name;
    let age = user.age;
    let email = user.email;

    let tr = $("<tr align=\"center\">");
    tr.append("" +
        "<td>" +userid + "</td>" +
        "<td>" +name + "</td>" +
        "<td>" +age + "</td>" +
        "<td>" +email + "</td>" +
        "<td>" +listRoles + "</td>");
    $("#userInfo").append(tr);
}