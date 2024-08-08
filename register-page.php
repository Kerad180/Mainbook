
<html lang="en">
<head>
    <title>Mainbook</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/style-register.css">
    <link rel="stylesheet" media="screen and (min-width: 0px) and (max-width: 768px)" type="text/css" href="css/css-mobile/register/style-mobile-register.css">
    <link rel="stylesheet" media="screen and (min-width: 769px) and (max-width: 900px)" type="text/css" href="css/css-mobile/register/style-cube1-register.css">
    <link rel="stylesheet" media="screen and (min-width: 901px) and (max-width: 1300px)" type="text/css" href="css/css-mobile/register/style-cube2-register.css">

    <script src="js/jquery.js"></script>
    <script src="js/dragable.js"></script>
    <script src="js/script.js" async></script>
</head>

<body>

<?php
        $dbc = @mysqli_connect("127.0.0.1", "root", "vertrigo", "mainbook");
        @mysqli_set_charset($dbc, "utf8");

        $query = "SELECT login FROM users";
        $results = mysqli_query($dbc, $query);

        $filsCorrect = 1;

        if (isset($_POST['reg-login']) && isset($_POST['reg-pw']) && isset($_POST['rep-reg-pw'])) {
            if (!empty($_POST['reg-login']) && (!empty($_POST['reg-pw'])) && (!empty($_POST['rep-reg-pw']))) {
                if(strlen($_POST['reg-login']) < 16) {
                    if ($_POST['reg-pw'] == $_POST['rep-reg-pw']) {
                        $login = trim(strip_tags($_POST['reg-login']));

                        while ($user = @mysqli_fetch_assoc($results)) {

                            if ($login == $user["login"]){
                                $filsCorrect = 4;
                            }                        
                        };


                        if ($filsCorrect != 4) {
                            $password = password_hash(trim(strip_tags($_POST['reg-pw'])), PASSWORD_DEFAULT);

                            $quarySave = "INSERT INTO users (login, password) VALUES ('$login', '$password')";

                            @mysqli_query($dbc, $quarySave) or die(mysqli_error($dbc));

                            $filsCorrect = 0;
                        }


                    } else {
                        $filsCorrect = 3;
                    }
                } else {
                    $filsCorrect = 5;
                }
            } else {
                $filsCorrect = 2;
            }
        } else {
            $filsCorrect = 1;
        }
            
        @mysqli_close($dbc);
?>

<div id="registerContent">
        <div id="placeForCube">
            <div id="stageForCube">
                <div id="cube">
                    <div class="wall front">MB</div>
                    <div class="wall back"></div>
                    <div class="wall left"></div>
                    <div class="wall right"></div>
                    <div class="wall top"></div>
                    <div class="wall bottom"></div>
                </div>
            </div>
        </div>

        <div id="register">
            <form id="registerForm" action="register-page.php" method="post">
                    <div class="loginAndPasswordContainer"><div class="loginAndPassword">Login</div> <input data-window type="text" name="reg-login"><br></div>
                    <div class="loginAndPasswordContainer"><div class="loginAndPassword">Password</div> <input data-window type="password" name="reg-pw"><br></div>
                    <div class="loginAndPasswordContainer"><div class="loginAndPassword">Repeat Password</div> <input data-window type="password" name="rep-reg-pw"><br></div>
                    <div><input id="registerButton" type="submit" value="Register"></div>
            </form>
            <div id="underForm">
                <div id="answer">

                <?php
                    switch($filsCorrect) {
                        case 0:
                            echo "Correct register. You can log in now. Return to login form.";
                            break;
                        case 1:
                            echo "Complete the filds.";
                            break;
                        case 2:
                            echo "Filds cannot be empty.";
                            break;
                        case 3:
                            echo "The Password field and the Repeat Password field must be identical.";
                            break; 
                        case 4:
                            echo "The Login already exist.";
                            break; 
                        case 5:
                            echo "Login can have a maximum of 15 characters";
                            break;
                }
                ?>

                </div>
                <div><a href="index.html"><input id="returnButton" type="button" value="Return"></a></div>
            </div>
                
        </div>
</div>

</body>
</html>

