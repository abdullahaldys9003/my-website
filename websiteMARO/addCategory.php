<?php
function addCategory ($name,$description,$img,$conn) {
  try {
    
    $sql = "INSERT INTO categories (
    name,description,img
  ) VALUES (?, ?, ?)";
  
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param("sss", $name,$description,$img);

    if (!$stmt->execute()) {
      throw new Exception($stmt->error);
    } 
    
    $id = $stmt->insert_id;
      return ['success' => true,'type' => 'add','id' => $id ];

   
   } catch (Exception $e) {
      return ['success' => false,'Error' => $e->getMessage()];
    }
}

?>