$(function () {
    function mostrarMensaje(texto, tipo = "ok") {
        $("#mensaje")
            .stop(true, true)
            .hide()
            .text(texto)
            .removeClass("mensaje-error mensaje-ok")
            .addClass(tipo === "ok" ? "mensaje-ok" : "mensaje-error")
            .fadeIn();

        setTimeout(() => {
            $("#mensaje").fadeOut();
        }, 3000);
    }

    function cargarSolicitudes() {
        $.ajax({
            url: "index.php?option=solicitudes_json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                let html = "";

                if (!data || data.length === 0) {
                    html = `
                        <tr>
                            <td colspan="6" class="loader">No hay solicitudes pendientes</td>
                        </tr>
                    `;
                } else {
                    data.forEach(function (solicitud) {
                        html += `
                            <tr>
                                <td>${solicitud.id}</td>
                                <td>${solicitud.taller_nombre}</td>
                                <td>${solicitud.username}</td>
                                <td>${solicitud.usuario_id}</td>
                                <td>${solicitud.fecha_solicitud}</td>
                                <td>
                                    <button class="btn-aprobar" data-id="${solicitud.id}">Aprobar</button>
                                    <button class="btn-rechazar" data-id="${solicitud.id}">Rechazar</button>
                                </td>
                            </tr>
                        `;
                    });
                }

                $("#solicitudes-body").html(html);
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                $("#solicitudes-body").html(`
                    <tr>
                        <td colspan="6" class="loader">Error al cargar solicitudes</td>
                    </tr>
                `);
            }
        });
    }

    $(document).on("click", ".btn-aprobar", function () {
        if (!confirm("¿Seguro que deseas aprobar esta solicitud?")) return;

        const idSolicitud = $(this).data("id");

        $.ajax({
            url: "index.php",
            type: "POST",
            dataType: "json",
            data: {
                option: "aprobar",
                id_solicitud: idSolicitud
            },
            success: function (response) {
                if (response.success) {
                    mostrarMensaje(response.message, "ok");
                } else {
                    mostrarMensaje(response.error, "error");
                }
                cargarSolicitudes();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                mostrarMensaje("Error al aprobar la solicitud", "error");
            }
        });
    });

    $(document).on("click", ".btn-rechazar", function () {
        if (!confirm("¿Seguro que deseas rechazar esta solicitud?")) return;

        const idSolicitud = $(this).data("id");

        $.ajax({
            url: "index.php",
            type: "POST",
            dataType: "json",
            data: {
                option: "rechazar",
                id_solicitud: idSolicitud
            },
            success: function (response) {
                if (response.success) {
                    mostrarMensaje(response.message, "ok");
                } else {
                    mostrarMensaje(response.error, "error");
                }
                cargarSolicitudes();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                mostrarMensaje("Error al rechazar la solicitud", "error");
            }
        });
    });

    $("#btnLogout").on("click", function () {
        $.ajax({
            url: "index.php",
            type: "POST",
            dataType: "json",
            data: { option: "logout" },
            success: function () {
                window.location.href = "index.php?page=login";
            }
        });
    });

    cargarSolicitudes();
});