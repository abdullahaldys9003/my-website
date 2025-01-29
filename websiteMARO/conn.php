<?php

function conndb () {
  
  $servername = "localhost:3306";
  $username_conn = "root";
  $password_conn = "root";
  $database = "databasepro";
  $conn = mysqli_connect($servername,$username,$password,$database);
       return $conn;
 }
 
?>
