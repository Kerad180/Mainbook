<?php
    session_start();
?>  
<head>
<title>Mainbook</title>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <script src="js/jquery.js"></script>
</head>
<body> 
        <?php   
            $dbc = @mysqli_connect("127.0.0.1", "root", "vertrigo", "mainbook");
            @mysqli_set_charset($dbc, "utf8");

            $query = "SELECT * FROM users";
            $results = mysqli_query($dbc, $query);

            $users = array();

            $isUser;

            while ($users[] = @mysqli_fetch_assoc($results)) {};

            if (isset($_POST['login']) && isset($_POST['password'])) {
                if (!empty($_POST['login'] && !empty($_POST['password']))) {

                    if ($_SESSION['logged'] == 0) {
                        $isUser = false;
                    }

                    foreach($users as $user){
                        
                        if ($_POST['login'] == $user['login']) {
                            if (password_verify($_POST['password'], $user['password'])){ 
                                $isUser = true;
                                $_SESSION['logged'] = 1;
                                $_SESSION['login'] = $user['login'];
                                $_SESSION['id'] = $user['id'];
                                include("content.php");
                                break;
                            }
                        } 
                    };

                    if ($isUser == false) {
                        include("wronglog.html");
                    }
                
                } else {
                    include("wronglog.html");
                }

            } elseif($_SESSION['logged'] == 1) {
                include("wronglog.html");

            } else {
                include("wronglog.html");
            }


            @mysqli_close($dbc);
        ?>
    <script type="module" src="js/script.js"></script>
</body>