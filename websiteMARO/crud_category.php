<?php

//include('conn.php');
//include('addCategory.php');

/*function checkImage($image) {
  
  if (!isset($_FILES["image"])) {
      $image = $_FILES["image"];
      $imageData = file_get_contents($image['tmp_name']);
      $imageDataBase64 = base64_encode($imageData);
      }
      
      return $imageDataBase64;
  
}*/

/*function request ($conn,$data) {
  
  $data["type"];
  
 switch ($type) {
  case "add":
    try {
      
      $imageData = checkImage($image);
 
      $response = addCategory($data["name"],$data["description"],$imageData,$conn);
      
      if (!$response["success"]) {
        throw new Exception($response["Error"]);
      }
      
      echo json_encode($response);
      
    } catch (Exception $e ) {
      echo json_encode(["Error" => $e->getMessage()]);
    }
    
    break;
  case "delete":
    try { 
       $response= deleteCategory($data["id"]);
       if (!$response["success"]) {
         throw new Exception($response["Error"]);
       }
       
       echo json_encode($response);
       
    } catch (Exception $e) {
      echo(json_encode(["Error" => $e->getMessage()]));
    }
    
    break;
  case "update":
    try {
     $image = $_FILES["image"];
     $imageData = file_get_contents($image['tmp_name']);
   
     $imageDataBase64 = base64_encode($imageData);
     
      updateProduct($data["name"], ["description"],$imageDataBase64,$data["id"]);
      
    } catch (Exception $e) {
      echo json_encode(["error" => $e->getMessage()]);
    }
    
    break;
   case "delete":
    try {
      deleteProduct($data["id"]);
    } catch (Exception $e) {
      echo json_encode(["error" => $e->getMessage()]);
    }
    break;
    
  default:
    echo json_encode(["Error" => "Invalid operation type"]);
}
}*/


//$conn = $conndb();

try {
  
  if (!isset($_POST['data'])) {
  throw new Exception("بيانات الطلب مفقودة");
  }
  
  
  if (!$conn->connect_error) {
    throw new Exception($conn->connect_error);
  }


 $data = json_decode($_POST['data'], true);

 
 if (json_last_error() !== JSON_ERROR_NONE) {
  throw new Exception("بيانات الطلب غير صالحة: " . json_last_error_msg());
 }
 
request($conn,$data,$_FILES["image"]);



} catch (Exception $e) {
  echo json_encode(["Error" => $e->getMessage()]);
}

?>


