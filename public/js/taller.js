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

    function cargarTalleres() {
        $.ajax({
            url: "index.php?option=talleres_json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                let html = "";

                if (!data || data.length === 0) {
                    html = `
                        <tr>
                            <td colspan="6" class="loader">No hay talleres con cupo disponible</td>
                        </tr>
                    `;
                } else {
                    data.forEach(function (taller) {
                        html += `
                            <tr>
                                <td>${taller.id}</td>
                                <td>${taller.nombre}</td>
                                <td>${taller.descripcion ?? ""}</td>
                                <td>${taller.cupo_maximo}</td>
                                <td>${taller.cupo_disponible}</td>
                                <td>
                                    <button class="btn-aprobar btnSolicitar" data-id="${taller.id}">
                                        Solicitar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                }

                $("#talleres-body").html(html);
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                $("#talleres-body").html(`
                    <tr>
                        <td colspan="6" class="loader">Error al cargar talleres</td>
                    </tr>
                `);
            }
        });
    }

    $(document).on("click", ".btnSolicitar", function () {
        const tallerId = $(this).data("id");

        $.ajax({
            url: "index.php",
            type: "POST",
            dataType: "json",
            data: {
                option: "solicitar",
                taller_id: tallerId
            },
            success: function (response) {
                if (response.success) {
                    mostrarMensaje(response.message, "ok");
                } else {
                    mostrarMensaje(response.error, "error");
                }

                cargarTalleres();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                mostrarMensaje("Error al enviar la solicitud", "error");
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

    cargarTalleres();
});