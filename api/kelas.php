<?php
include_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $query = "SELECT * FROM kelas";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO kelas (nama_kelas, deskripsi, harga, gambar) VALUES (:nama, :deskripsi, :harga, :gambar)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nama', $data->nama_kelas);
        $stmt->bindParam(':deskripsi', $data->deskripsi);
        $stmt->bindParam(':harga', $data->harga);
        $stmt->bindParam(':gambar', $data->gambar);
        if($stmt->execute()) {
            echo json_encode(["message" => "Kelas created."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to create kelas."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE kelas SET nama_kelas=:nama, deskripsi=:deskripsi, harga=:harga, gambar=:gambar WHERE id=:id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $data->id);
        $stmt->bindParam(':nama', $data->nama_kelas);
        $stmt->bindParam(':deskripsi', $data->deskripsi);
        $stmt->bindParam(':harga', $data->harga);
        $stmt->bindParam(':gambar', $data->gambar);
        if($stmt->execute()) {
            echo json_encode(["message" => "Kelas updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update kelas."]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $query = "DELETE FROM kelas WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        if($stmt->execute()) {
            echo json_encode(["message" => "Kelas deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete kelas."]);
        }
        break;
}
?>
