<?php
    $dbc = @mysqli_connect("127.0.0.1", "root", "vertrigo", "mainbook");
    @mysqli_set_charset($dbc, "utf8");

    $query = "SELECT id, login FROM users";
    $results = mysqli_query($dbc, $query);

    while ($row = @mysqli_fetch_assoc($results)) {
        foreach ($row as $key => $value) {
            echo $value.",";
        }
    };
