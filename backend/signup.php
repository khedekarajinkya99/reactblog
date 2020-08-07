<?php
require "connection.php";

$data = file_get_contents("php://input");
$data = json_decode($data);

try {
	$connect = new PDO("mysql:host=$host;dbname=$database", $username, $password);

	$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "INSERT INTO users(name, email, username, password) VALUES(:name,:email,:username,:password)";
	$stmt = $connect->prepare($sql);
	$stmt->bindParam("name", $data->name, PDO::PARAM_STR);
	$stmt->bindParam("email", $data->email, PDO::PARAM_STR);
	$stmt->bindParam("username", $data->username, PDO::PARAM_STR);
	$pass = hash('sha256', $data->password);
	$stmt->bindParam("password", $pass, PDO::PARAM_STR);
	if ($stmt->execute()) {
		$userData = ['text' => 'User Register Successfully', 'stats' => 200];
		$userData = json_encode($userData);
		echo '{"userData": '.$userData.'}';
	}

} catch (PDOException $error) {
	echo '{"error": {"text": '.$error->getMessage().'}}';
}

?>