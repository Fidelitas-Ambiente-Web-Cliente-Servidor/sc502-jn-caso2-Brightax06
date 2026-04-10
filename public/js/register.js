$(function () {
    let formRegister = $("#formRegister");
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

    formRegister.on("submit", function (event) {
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
                option: "register"
            },
            success: function (response) {
                if (response.response === "00") {
                    mostrarMensaje("Registro exitoso. Ahora inicia sesión.", "ok");
                    setTimeout(function () {
                        window.location.href = "index.php?page=login";
                    }, 1200);
                } else {
                    mostrarMensaje(response.message);
                }
            },
            error: function () {
                mostrarMensaje("Error de conexión");
            }
        });
    });
});