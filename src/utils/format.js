const formatPrice = (target) => {
  if(target){
    let result = target.toLocaleString('ko-KR');
    return result;
  }
}

const formatDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  return `${year}/${month}/${day}`
}

export {formatPrice, formatDate}