<?php
include('../conn/conn.php');

$data = json_decode($_POST['jsonData'],true);

$type = $data["typedb"];
switch ($type) {
  case "add":
    $image = $_FILES["image"];
$imageData = file_get_contents($image['tmp_name']);
$imageDataBase64 = base64_encode($imageData);

      addProduct($data["title"],$data["price"],$data["ads"],$data["discount"],$data["total"],$data["taxes"],$data["category"],$imageDataBase64,$data["category_id"]);
    break;
  case "delete":
    try {
      deleteProduct($data["id"]);
    } catch (Exception $e) {
      echo json_encode(["error" => $e->getMessage()]);
    }
  
    break;
    
  case "update":
  $image = $_FILES["image"];
$imageData = file_get_contents($image['tmp_name']);
$imageDataBase64 = base64_encode($imageData);

  updateProduct($data["title"],$data["price"],$data["ads"],$data["discount"],$data["total"],$data["taxes"],$data["category"],$imageDataBase64,$data["category_id"],$data["id"]);
    break;
   
   case "deleteAll":
     try {
       deleteAll($data->category_id);
     } catch (Exception $e) {
       echo "Error: " . $e->getMessage();
     }  
}


function addProduct($title, $price, $ads, $discount, $total, $taxes, $category, $img,$category_id) {
    global $conn;
    try {
    $price = floatval($price);
    $ads = intval($ads);
    $total = floatval($total);
    $category_id = intval($category_id);
    $taxes = floatval($taxes);
    $discount = floatval($discount);
    $sql = "INSERT INTO products (title, price, ads, discount, total, taxes, category, img, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("siiiiissi", $title, $price, $ads, $discount, $total, $taxes, $category, $img, $category_id);
    
    if ($stmt->execute()) {
        $productId = $stmt->insert_id;
        echo json_encode(['success' => true, 'id' => $productId, 'type' => 'add']);
    }
    
   } catch (Exception $e) {
       echo(json_encode(["Error" => $e->getMessage()]));
     }  
}





function  updateProduct($title, $price, $ads, $discount, $total, $taxes, $category, $img, $category_id,$id) {
    global $conn; // Ensure $conn is properly defined
    try {
    $price = floatval($price);
    $ads = intval($ads);
    $total = floatval($total);
    $category_id = intval($category_id);
    $taxes = floatval($taxes);
    $discount = floatval($discount);
   $id = intval($id);
$sql = "UPDATE products SET title = ?, price = ?, ads = ?, discount = ?, total = ?, taxes = ?, category = ?, img = ?,  category_id = ? WHERE id = ?";
 $stmt = $conn->prepare($sql);
$stmt->bind_param("siiiiissii", $title, $price, $ads, $discount, $total, $taxes, $category,$img, $category_id,$id);
    if ($stmt->execute()) {
        echo json_encode(['success' => "yes",'type' => 'update']);
    } else {
        echo json_encode(['success' => 'no']);
    }
  } catch (Exception $e) {
       echo(json_encode(["Error" => $e->getMessage()]));
 }  
}




function deleteProduct($productId) {
  global $conn; // إعلان متغير `$conn` كمتغير عالمي
  // تحضير استعلام SQL
  try{
  $id = intval($productId);
  $sql = "DELETE FROM products WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i",$id);
  if ($stmt->execute()){
  echo json_encode(['success' => true, 'id' => $id ,'type' => 'delete'] );
  }
 } catch (Exception $e) {
       echo(json_encode(["Error" => $e->getMessage()]));
     }  
  
}
  



function deleteAll($categoryId) {
    global $conn; // Ensure $conn is properly defined

    $sql = "DELETE FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $categoryId);

    if ($stmt->execute()) {
        echo json_encode(['success' => "yes", 'type' => 'deleteAll']);
    } else {
        echo json_encode(['success' => 'no']);
    }

    $stmt->close();
}


?>