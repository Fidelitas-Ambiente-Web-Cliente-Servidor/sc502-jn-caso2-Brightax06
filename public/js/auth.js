$(function () {
    let formLogin = $("#formLogin");
    const urlBase = "index.php";

    function mostrarMensaje(texto, tipo = "error") {
        $("#mensaje")
            .stop(true, true)
            .hide()
            .text(texto)
            .removeClass("mensaje-error mensaje-ok")
            .addClass(tipo === "ok" ? "mensaje-ok" : "mensaje-error")
            .fadeIn();
    }

    formLogin.on("submit", function (event) {
        event.preventDefault();

        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            mostrarMensaje("Debe completar todos los campos");
            return;
        }

        $.ajax({
            url: urlBase,
            type: "POST",
            dataType: "json",
            data: {
                username: username,
                password: password,
                option: "login"
            },
            success: function (data) {
                if (data.response === "00") {
                    mostrarMensaje(data.message, "ok");
                    window.location = data.rol === "admin"
                        ? "index.php?page=admin"
                        : "index.php?page=talleres";
                } else {
                    mostrarMensaje(data.message);
                }
            },
            error: function () {
                mostrarMensaje("Error de conexión con el servidor");
            }
        });
    });
});