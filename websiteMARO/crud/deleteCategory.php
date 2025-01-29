
<?php

function deleteCategory($conn,$id) {
  try {
    $id = intval($id);
    
    $deleteCategory = "DELETE FROM categories WHERE id = ?";
    
    $deleteProducts = "DELETE FROM products WHERE category_id = ?";

    $stmt = $conn->prepare($deleteProducts);
    $stmt->bind_param("i",$id);
    if (!$stmt->execute()) {
      $error =$stmt->error;
      $stmt->close();
      throw new Exception($error);
    }
    
    $stmt = $conn->prepare($deleteCategory);
    
    $stmt->bind_param("i",$id);

    if (!$stmt->execute()) {
      $error =$stmt->error;
      $stmt->close();
      throw new Exception($error);
    }
    
    return ['success' => true,'id' => $id , 'type' => 'delete'];
    
  } catch (Exception $e) {
    
    return ['success' => false,'Error' => $e->getMassage()];
  }

}

?>