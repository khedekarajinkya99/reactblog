<?php
require "connection.php";

$data = file_get_contents("php://input");

$data = json_decode($data);

try {
	$connect = new PDO("mysql:host=$host;dbname=$database", $username, $password);

	$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "SELECT * FROM users WHERE (username=:username OR email=:username) AND password=:password";
	$stmt = $connect->prepare($sql);
	$stmt->bindParam("username", $data->username, PDO::PARAM_STR);
	$pass = hash('sha256', $data->password);
	$stmt->bindParam("password",$pass, PDO::PARAM_STR);
	$stmt->execute();
	$mainCount = $stmt->rowCount();
	$userData = $stmt->fetch(PDO::FETCH_OBJ);
	if (!empty($userData)) {
		$userid = $userData->id;
		$userData->token = hash('ripemd160', $userid);
	}

	if ($userData) {
		$userData = json_encode($userData);
		echo '{"userData": '.$userData.'}';
	} else {
		echo '{"error": {"text": "Bad request wrong username and password"}}';
	}
} catch (PDOException $error) {
	echo '{"error": {"text":'.$error->getMessage().'}}';
}
?>