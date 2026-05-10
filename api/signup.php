<?php
include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
    try {
        // Check if email already exists
        $check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
        $check_stmt = $conn->prepare($check_query);
        $check_stmt->bindParam(':email', $data->email);
        $check_stmt->execute();

        if ($check_stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["message" => "Email already registered."]);
            exit();
        }

        // Insert new user
        $query = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, 'user')";
        $stmt = $conn->prepare($query);

        $password_hash = password_hash($data->password, PASSWORD_BCRYPT);

        $stmt->bindParam(':username', $data->username);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "User was created."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to create user."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>

