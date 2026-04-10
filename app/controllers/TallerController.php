<?php

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../models/Taller.php';
require_once __DIR__ . '/../models/Solicitud.php';

class TallerController
{
    private $tallerModel;
    private $solicitudModel;

    public function __construct()
    {
        $database = new Database();
        $db = $database->connect();
        $this->tallerModel = new Taller($db);
        $this->solicitudModel = new Solicitud($db);
    }

    public function index()
    {
        if (!isset($_SESSION['id'])) {
            header('Location: index.php?page=login');
            exit;
        }

        require __DIR__ . '/../views/taller/listado.php';
    }

    public function getTalleresJson()
    {
        header('Content-Type: application/json');

        if (!isset($_SESSION['id'])) {
            echo json_encode([]);
            exit;
        }

        $talleres = $this->tallerModel->getAllDisponibles();
        echo json_encode($talleres);
        exit;
    }

    public function solicitar()
    {
        header('Content-Type: application/json');

        if (!isset($_SESSION['id'])) {
            echo json_encode([
                'success' => false,
                'error' => 'Debes iniciar sesión'
            ]);
            exit;
        }

        if (($_SESSION['rol'] ?? '') !== 'usuario' && ($_SESSION['rol'] ?? '') !== 'admin') {
            echo json_encode([
                'success' => false,
                'error' => 'No autorizado'
            ]);
            exit;
        }

        $tallerId = isset($_POST['taller_id']) ? (int) $_POST['taller_id'] : 0;
        $usuarioId = (int) $_SESSION['id'];

        if ($tallerId <= 0) {
            echo json_encode([
                'success' => false,
                'error' => 'Taller inválido'
            ]);
            exit;
        }

        $taller = $this->tallerModel->getById($tallerId);

        if (!$taller) {
            echo json_encode([
                'success' => false,
                'error' => 'El taller no existe'
            ]);
            exit;
        }

        if ((int)$taller['cupo_disponible'] <= 0) {
            echo json_encode([
                'success' => false,
                'error' => 'Este taller ya no tiene cupos disponibles'
            ]);
            exit;
        }

        if ($this->solicitudModel->existeSolicitudActiva($tallerId, $usuarioId)) {
            echo json_encode([
                'success' => false,
                'error' => 'Ya tienes una solicitud pendiente o aprobada para este taller'
            ]);
            exit;
        }

        $creada = $this->solicitudModel->crear($tallerId, $usuarioId);

        if ($creada) {
            echo json_encode([
                'success' => true,
                'message' => 'Solicitud enviada correctamente'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'No se pudo registrar la solicitud'
            ]);
        }
        exit;
    }
}