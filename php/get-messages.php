<?php
    session_start();

    $dbc = @mysqli_connect("127.0.0.1", "root", "vertrigo", "mainbook");
    @mysqli_set_charset($dbc, "utf8");

    $isToAdd = false;

    $userIdFrom = $_SESSION['id'];
    $userIdTo = $_POST['idTo'];

    $message = trim(($_POST['text']));
    $isToAdd = $_POST['isToAdd'];
    $idUserToSend = $_POST["idUserToSend"];

    if($isToAdd && $message != "") {
        $queryAddMessage = "INSERT INTO messages (id_user_from, id_user_to, message)
            VALUES ($userIdFrom, $idUserToSend, \"$message\")";
        mysqli_query($dbc, $queryAddMessage);
        $isToAdd = false;
    }

    $queryNews = "SELECT id_user_from, message FROM messages 
        WHERE (id_user_from = $userIdFrom OR id_user_from = $userIdTo) AND (id_user_to = $userIdFrom OR id_user_to = $userIdTo)";
    
    $resultsNews = mysqli_query($dbc, $queryNews);

    while ($row = @mysqli_fetch_assoc($resultsNews)) {
        if($userIdFrom == $row['id_user_from']) {
            echo "<li class='messageFrom'>".$row['message']."</li>";
        } else {
            echo "<li class='messageTo'>".$row['message']."</li>";
        }
    };