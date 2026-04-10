<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Talleres</title>
    <link rel="stylesheet" href="public/css/style.css">
    <script src="public/js/jquery-4.0.0.min.js"></script>
    <script src="public/js/auth.js"></script>
</head>
<body class="auth-body">

    <div class="auth-container">
        <div class="auth-card">
            <h2>Iniciar sesión</h2>
            <p class="auth-subtitle">Sistema de inscripción a talleres</p>

            <div id="mensaje" class="mensaje-box" style="display:none;"></div>

            <form id="formLogin">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Ingrese su usuario"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                    >
                </div>

                <button type="submit" class="btn-primary">Ingresar</button>
                <a href="index.php?page=registro" class="btn-secondary">Registrarse</a>
            </form>
        </div>
    </div>

</body>
</html>