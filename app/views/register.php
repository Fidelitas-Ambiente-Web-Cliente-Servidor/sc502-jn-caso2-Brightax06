<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Talleres</title>
    <link rel="stylesheet" href="public/css/style.css">
    <script src="public/js/jquery-4.0.0.min.js"></script>
    <script src="public/js/register.js"></script>
</head>
<body class="auth-body">

    <div class="auth-container">
        <div class="auth-card">
            <h2>Crear cuenta</h2>
            <p class="auth-subtitle">Regístrate para solicitar talleres</p>

            <div id="mensaje" class="mensaje-box" style="display:none;"></div>

            <form id="formRegister">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Crea tu usuario"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Crea tu contraseña"
                    >
                </div>

                <button type="submit" class="btn-primary">Registrarse</button>
                <a href="index.php?page=login" class="btn-secondary">Volver al login</a>
            </form>
        </div>
    </div>

</body>
</html>