<?php
    session_start();
    

    $dbc = @mysqli_connect("127.0.0.1", "root", "vertrigo", "mainbook");
    @mysqli_set_charset($dbc, "utf8");

    $isToAdd = false;

    $newNew = trim($_POST["text"]);
    $userId = $_SESSION['id'];


    $isToAdd = $_POST['isToAdd'];

        if($isToAdd) {
            $queryAddNew = "INSERT INTO news (id_user, post)
                VALUES ($userId, \"$newNew\")";
            mysqli_query($dbc, $queryAddNew);
            $isToAdd = false;
        }

        $queryNews = "SELECT u.login, n.post FROM users u, news n 
            WHERE u.id = n.id_user ORDER BY n.id desc";

        $resultsNews = mysqli_query($dbc, $queryNews);
        while ($row = mysqli_fetch_assoc($resultsNews)) {
            echo "<li><article><h3>".$row['login']." shared:</h3><div>".$row['post']."</div></article></li>";
        };