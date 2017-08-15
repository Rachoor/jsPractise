var operation = "A";
var selected_index = -1;
var Employees = localStorage.getItem("Employees");

$(document).ready(function() {
    Employees = JSON.parse(Employees);
    if (Employees == null)
        Employees = [];

    List();
    $("#saveEmployees").click(function() {
        if (operation == "A")
            return Add();
        else
            return Edit(i);
    });
    $(".search-bar-filter").on("keyup", function() {
        var value = $(this).val();
        $("#tableID").find("tr").each(function(index) {
            if (index != 0) {

                $row = $(this);

                var id = $row.children('td').text();

                if (id.indexOf(value) != 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        });
    });
});

function Add() {
    var e = $('#empid').val();
    if (e != '') {
        var emp = JSON.stringify({
            empid: $("#empid").val(),
            empcode: $("#empcode").val(),
            empname: $("#empname").val(),
            department: $("#department option:selected").val()
        });
        var r = $('#empid').attr('readonly');
        if (r) {
            var emp = JSON.stringify({
                empid: $("#empid").val(),
                empcode: $("#empcode").val(),
                empname: $("#empname").val(),
                department: $("#department option:selected").val()
            });

            Employees[selected_index] = emp;
            localStorage.setItem("Employees", JSON.stringify(Employees));
            List();

        } else {
            Employees.push(emp);
            localStorage.setItem("Employees",
                JSON.stringify(Employees));
            List();
        }
        var emp = {
            empid: $('#empid').removeAttr('readonly').val(''),
            empcode: $('#empcode').val(''),
            empname: $('#empname').val(''),
            department: $('#department').val('')
        }
    } else {
        alert("Empid cannot be null");
    }
    return true;
}


function Edit(i) {
    operation = "E";
    selected_index = parseInt(i);
    var cli = JSON.parse(Employees[selected_index]);
    $("#empid").val(cli.empid);
    $("#empcode").val(cli.empcode);
    $("#empname").val(cli.empname);
    $("#department").val(cli.department);
    $("#empid").attr("readonly", "readonly");
    $("#empid").focus();
    Employees[i] = JSON.stringify({
        empid: $("#empid").val(),
        empcode: $("#empcode").val(),
        empname: $("#empname").val(),
        department: $("#department").val()
    });
    operation = "A";
    return true;
}

function Delete(i) {
    if (confirm("Are you sure?")) {
        selected_index = parseInt(i);
        Employees.splice(selected_index, 1);
        localStorage.setItem("Employees", JSON.stringify(Employees));
        List();
    }

}

function List() {
    var $data = $('<table id="tableID"></table>').addClass('table table-responsive table-bordered');
    var header = "<thead><tr><th>EmpID</th><th>EmpCode</th><th>EmpName</th><th>Department</th><th>Action</th></tr></thead>";
    $data.append(header);
    for (var i in Employees) {
        var cli = JSON.parse(Employees[i]);
        var $cli = $('<tr id="r' + i + '"></tr>');
        $cli.append($('<td></td>').html(cli.empid));
        $cli.append($('<td></td>').html(cli.empcode));
        $cli.append($('<td></td>').html(cli.empname));
        $cli.append($('<td></td>').html(cli.department));
        $cli.append($('<td></td>').html("<button type='button' id='btnEdit' class='btn btn-warning' onclick='Edit(\"" + i + "\")'>Edit</button>&nbsp;&nbsp;<button type='button' id='btnDelete' class='btn btn-danger' onclick='Delete(\"" + i + "\")'>Delete</button>"));

        $data.append($cli);
    }
    $("#listofemp").html($data);
}
