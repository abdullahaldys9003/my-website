
 <?php
 
include('../conn/conn.php');
 $data = array();
 
  $query ="SELECT * FROM categories";

   $result = mysqli_query($conn, $query);
  if ($result) {
     while ($row = $result->fetch_assoc()) {
           $data[]=$row;
     }
     
  } else {
      echo json_encode(["Error" => mysqli_error($conn)]); 
  }

echo(json_encode($data,true));

?>
