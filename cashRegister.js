function checkCashRegister(price, cash, cid) {
  let cashDue = (cash - price) * 100;
  const cashOwed = cashDue;
  let response = {status: "OPEN", change: []};
  const currency = [1,5,10,25,100,500,1000,2000,10000]

  for(let i = cid.length - 1; i >= 0; i--){
    cid[i][1] *= 100;
  }

  function totalCashInDrawer(){
    let sum = 0;
    for(let i = 0; i < cid.length; i++){
      sum += cid[i][1];
    }
    return sum;
  }

  function totalChangeGiven(){
    let sum = 0;
      for(let i = 0; i < response.change.length; i++){
        sum += response.change[i][1];
      }
   return sum;   
  }

  function divideBy100(){
    for(let i = 0; i < cid.length; i++){
      cid[i][1] /= 100;
    }
  }

  if(totalCashInDrawer() < cashDue){
    response.status = "INSUFFICIENT_FUNDS";
    return response;
  }
  else if(totalCashInDrawer() === cashDue){
    response.status = "CLOSED";
    response.change = cid;
    divideBy100()
    return response;
  }

  for(let i = currency.length - 1; i >= 0; i--){
    let currencyMultiple = 0;
    if(cashDue >= currency[i]){
      while(cashDue >= currency[i] && cid[i][1] > 0){
        cashDue -= currency[i];
        currencyMultiple += currency[i];
        cid[i][1] -= currency[i];
        }
      response.change.push([cid[i][0], currencyMultiple]);
    }
  }
  
  if(cashOwed != totalChangeGiven()){
    response.status = "INSUFFICIENT_FUNDS";
    response.change = [];
    return response;
  }

  for(let i = response.change.length - 1; i >= 0; i--){
  response.change[i][1] /= 100;
  }
  
  return response;
}




checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])