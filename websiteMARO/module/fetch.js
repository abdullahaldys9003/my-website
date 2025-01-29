export function findindex(array, id) {
  const index = array.findIndex((item) => item.id == id);
  if (index !== -1) {
    return index;
  }
}



export function findCategory(array, id) {
  return array.filter((item,index) => item.category_id == id);
}



export async function fetchDatePhp(files) {
  const response = await fetch(files);
  
  const data = await response.json();
  return data;
}