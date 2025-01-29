<?php
include('conn.php');
if (isset($_COOKIE['login_in']) && isset($_SESSION["type"]))  {
  $leder='Location:crud.php';
  header($leder);
  exit;
}


$sellersTable="elle";
if (isset($_POST["register"])) {
    $name = $_POST["name"];
    $password = $_POST["psw"];
    $email = $_POST["email"];
    $confirm_password = $_POST["psw-repeat"]; 
    $phone = $_POST["phone"];
 
     if ($password !== $confirm_password) {
      header('Location:register_sellers.php? error=يُرجي تاكيد.كلمه السر بشكل صصحيح');
     }
    else if (strlen($password) < 6) {
    header('Location:register_sellers.php? error=يجب ان تكون كلمه السر اكبر من سته احرف');
     } else {
$stmtl = $conn->prepare("SELECT COUNT(*) FROM $sellersTable WHERE email = ?");
$stmtl->bind_param('s', $email);
$stmtl->execute();
$stmtl->bind_result($num_rows);
$stmtl->store_result();
$stmtl->fetch();
           if($num_rows!=0){
           header('Location:register_sellers.php? error=الحساب موجود بالفعل في قاعده البيانات');  
           } else {
                  $ok="null";
                  $type="seller";
                   $stmt= $conn->prepare("INSERT INTO $sellersTable(name,email,password,phone,ok,type)
                    VALUES (?,?,?,?,?,?)");
                    $stmt->bind_param('ssssss',$name,$email,$password,$phone,$ok,$type);
                if($stmt->execute()){                    $user_id=$stmt->insert_id;
                
  setcookie("user_id", $user_id, time() + 3600 * 24 * 7); // 7 أيام
    setcookie("user_name", $name, time() + 3600 * 24 * 7); // 7 أيام
    setcookie("type", $type, time() + 3600 * 24 * 7); // 7 أيام
    setcookie("user_email", $email, time() + 3600 * 24 * 7); // 7 أيام
    setcookie("login_in", true, time() + 3600 * 24 * 7); // 7 أيام
     
 
        header('Location:crud.php?rgister=you registerd successfull');
                         } else {
                        header('Location:account.php?error=you could not create');
                         }
            
           }
       
     }    
}
?>

<!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="css/register.css">
  </head>
<body>
  <div class="row">
      <form class="modal-content" action="register_sellers.php" method="post">
    <div class="container">
      <p>
            <?php 
            if(isset($_GET['error'])){
            echo($_GET['error']);
            }
             else {
               echo "<p>        Please fill in this form to create an account </p>";
             } 
             ?>  
      </p>
      <hr>
     
  <label for="name"><b>name</b></label>
 
    <input type="text" name="name" placeholder="Username" required>


      <label for="email"><b>Email</b></label>
      <input type="email" placeholder="Enter Email" name="email" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>


      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" required>
     

        <label for="number"><b>phone</b></label>
        <input type="number" placeholder="Enter phone" name="phone" required>
        

      <p>By creating an account you agree to our <a href="register_sellers.php" style="color:dodgerblue">Terms & Privacy</a>.</p>

      <div class="clearfix">
        <button class="cancelbtn">Cancel</button>
        
        <button type="submit" class="signupbtn" name="register">Sign Up</button>
      </div>
    </div>
  </form>
    </div>
</body>
</html>