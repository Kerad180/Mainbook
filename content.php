<?php
    session_start();
?>

<!DOCTYPE html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
    <link rel='stylesheet' type='text/css' href='css/style-content.css'>
    <link rel="stylesheet" media="screen and (min-width: 0px) and (max-width: 598px)" type="text/css" href="css/css-mobile/content/style-mobile-content1.css">
    <link rel="stylesheet" media="screen and (min-width: 599px) and (max-width: 800px)" type="text/css" href="css/css-mobile/content/style-mobile-content2.css">
    <link rel="stylesheet" media="screen and (min-width: 801px) and (max-width: 1024px)" type="text/css" href="css/css-mobile/content/style-mobile-content3.css">
    <link rel="stylesheet" media="screen and (min-width: 1025px) and (max-width: 1200px)" type="text/css" href="css/css-mobile/content/style-mobile-content4.css">
    <link rel="stylesheet" media="screen and (min-width: 1200px) and (max-width: 1300px)" type="text/css" href="css/css-mobile/content/style-mobile-content5.css">
</head>
<body> 

    <section id='container'>
        <header id='top'>
           <div><h2>Mainbook</h2></div>
           <div><a href="php/logout.php"><input id="returnButton" type="button" value="Log Out"></a></div>       
        </header>
  
        <section id='main'>
            <aside id='contacts'>
                <div>
                    <h2>Contacts</h2>
                    <div id='line'></div>
                    <ul>
                    <?php
                            echo($_SESSION['login'])." ".$_SESSION['id'];
                            $queryContacts = "SELECT id, login FROM users WHERE login !='".$_SESSION['login']."' ORDER BY login";
                            $resultsContacts = mysqli_query($dbc, $queryContacts);
                            while ($row = @mysqli_fetch_assoc($resultsContacts)) {
                                echo"<li id=".$row["id"]."><p>".$row["login"]."</p></li>";
                            };
                        ?>
                    </ul>
                </div>
            </aside> 

            <section id='news'>
            <form id="newsShare" method="post" >
                <div>
                    <textarea id="newsText" placeholder="What do you think?" name="reg-pw"></textarea>
                </div>
                <div>
                    <input id='shareButton' type='submit' value="Share">
                </div>
            </form>
            <ul>

            </ul>
            </section>

            <aside id="something">   
                <div class="cubeLine"></div>
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
                <div class="cubeLine"></div>
            </aside>

            <section id='chatWindows'>

            </section>
 
        </section>

        <section>
            <button id="contactButton">Contacts</button>
        </section>

        <footer id='footer'>
            <span>Created by Dariusz Lipiński</span>
        </footer>

    </section>


</body>

</html>
