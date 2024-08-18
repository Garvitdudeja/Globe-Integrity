var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var One = new Set();
var Two = new Set();

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  document.getElementById('incomeWarning').style.display='none'
  document.getElementById('savingWarning').style.display='none'
  document.getElementById('IULWarning').style.display='none'
  document.getElementById('investmentWarning').style.display='none'
  document.getElementById('ageWarning').style.display='none'

  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.visibility = "hidden";
  } else {
    document.getElementById("prevBtn").style.visibility = "";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next <i class=\"fa-solid fa-arrow-right\"></i>";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

async function nextPrev(n) {
    
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Check if any field in the current tab is invalid:
  var isFormValid = await validateForm();
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !isFormValid) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  console.log(currentTab)
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("webform").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

async function validateForm() {
    console.log("validateFormCalled", currentTab)
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  if ( currentTab == 0 ){
    const firstName = document.getElementById("First_Name").value
    const lastName = document.getElementById("Last_Name").value
    const Email = document.getElementById("Email").value
    const Phone = document.getElementById("Phone").value
    console.log(firstName)
    document.getElementById("returnURL").value = "https://wealthmanagement.zohobookings.com/#/4491295000001065010?Name="+firstName+" "+lastName+'&Email='+Email+"&phone="+Phone 
  
    var isphoneNoValid = await validatePhoneNo(Phone);
    console.log("isPhonevalid = " + isphoneNoValid );
    if(isphoneNoValid == false) {
      valid = false;
      // document.getElementById("Phone").className += " invalid";
    }
  }

  // condition Checking
  if (currentTab == 1) {
    const Tax_Income = document.getElementById("Tax-Income");
    const No_Tax = document.getElementById("No-Tax");
    const Zero_Risk = document.getElementById("Zero-Risk");
    const Preservation = document.getElementById("Preservation");
    console.log(Tax_Income.checked)
    if (Tax_Income.checked) {
      One.add(Tax_Income.value);
    }
    if (No_Tax.checked) {
      One.add(No_Tax.value);
    }
    if (Zero_Risk.checked) {
      One.add(Zero_Risk.value);
    }
    if (Preservation.checked) {
      One.add(Preservation.value);
    }
    if (!Tax_Income.checked) {
        One.delete(Tax_Income.value);
      }
      if (!No_Tax.checked) {
        One.delete(No_Tax.value);
      }
      if (!Zero_Risk.checked) {
        One.delete(Zero_Risk.value);
      }
      if (!Preservation.checked) {
        One.delete(Preservation.value);
      }
    console.log(Array.from(One).toString())
    document.getElementById("LEADCF36").value = Array.from(One).toString(" ")
    if (Array.from(One).length === 0 ){
      document.getElementById("IULWarning").style.display= 'block';
      document.getElementById("IULWarning").style.color= 'red';
        return false
    }else{
      document.getElementById("IULWarning").style.display= 'none';
    }
  }
  if (currentTab === 2 ){
    const k = document.getElementById("401k");
    const IRA = document.getElementById("IRA");
    const HoldingCash = document.getElementById("HoldingCash");
    const ActiveTrading = document.getElementById("ActiveTrading");
    const Self = document.getElementById("Self");
    if (k.checked) {
      Two.add(k.value);
    }
    if (IRA.checked) {
      Two.add(IRA.value);
    }
    if (HoldingCash.checked) {
      Two.add(HoldingCash.value);
    }
    if (ActiveTrading.checked) {
      Two.add(ActiveTrading.value);
    }if (Self.checked) {
        Two.add(Self.value);
      }
    if (!k.checked) {
        Two.delete(k.value);
      }
      if (!IRA.checked) {
        Two.delete(IRA.value);
      }
      if (!HoldingCash.checked) {
        Two.delete(HoldingCash.value);
      }
      if (!ActiveTrading.checked) {
        Two.delete(ActiveTrading.value);
      }
      if (!Self.checked) {
        Two.delete(Self.value);
      }
    console.log(Array.from(Two).toString())
    document.getElementById("LEADCF37").value = Array.from(Two).toString(" ")
    if (Array.from(Two).length === 0 ){
      document.getElementById("investmentWarning").style.display= 'block';
      document.getElementById("investmentWarning").style.color= 'red';
        return false
    }
    else{
      document.getElementById("investmentWarning").style.display= 'none';
    }
  }


  if(currentTab ===4){
    var saving = document.querySelector('input[name="Saving"]:checked')?.value;
    if (saving===undefined){
      document.getElementById("savingWarning").style.display= 'block';
      document.getElementById("savingWarning").style.color= 'red';
        return false
    }else{
      document.getElementById("savingWarning").style.display= 'none';
    }
    document.getElementById('LEADCF35').value = saving
  }
  if(currentTab ===5){
    var age = document.getElementById('LEADCF16')?.value;
    if (age < 18 || age > 90){
      document.getElementById("ageWarning").style.display= 'block';
      document.getElementById("ageWarning").style.color= 'red';
        return false
    }else{
      document.getElementById("ageWarning").style.display= 'none';
    }
  }
  if(currentTab ===3){
    var Emp = document.querySelector('input[name="Emp"]:checked')?.value;
    if (Emp===undefined){
        document.getElementById("incomeWarning").style.display = "block"; 
        document.getElementById("incomeWarning").style.color = "red"; 
        return false
    }
    else{
      document.getElementById("incomeWarning").style.display = "none"; 
    }
    document.getElementById('LEADCF34').value = Emp
  }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    // document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  // x[n].className += " active";
}




$('input[name="Emp"]').on("click", function(e) {
    nextPrev(1)
})
$('input[name="Saving"]').on("click", function(e) {
    nextPrev(1)
})


const scrollTOForm = (id = "crmWebToEntityForm") =>{
    const element = document.getElementById(id);
    element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
}



async function validatePhoneNo(phone){
  var apiKey = "num_live_dzZIzVWY7zUYtDQ03KUKPsbbBVZAADCAd9Jof820";
  var URL;
  if(phone && phone.includes("+1")){
    URL = `https://api.numlookupapi.com/v1/validate/${phone}?apikey=${apiKey}`
  }
  else{
    URL = `https://api.numlookupapi.com/v1/validate/+1${phone}?apikey=${apiKey}`

  }
  var isphoneNoValid = false;
  if(!phone || phone == "") {
    return false;
  }
  document.getElementById("phoneWarning").className = "d-none"
  await axios.get(URL,)
    .then(response => {
        //console.log(response);
        const data = response.data;
        if(data.valid==false){
          // document.getElementById("Phone").style = "background-color:  background-color: #ffdddd;"
          console.log(document.getElementById("Phone"),"element")
          document.getElementById("Phone").style.background = "#ffdddd";
          document.getElementById("phoneWarning").className = "text-danger"
        }
        if(data && data.valid != null){
          isphoneNoValid = data.valid;
          document.getElementById("Phone") = "customControl mb-4"
        }

    })
    .catch(error => {
        console.log(error)
    }); 
  return isphoneNoValid;
}





// function getResponses(valis_auth_tokens, requests){
//   for(let i in requests){
//     var l = []
//     var x =""
//       const tokenMatch = i[1].match(/token=([^&]+)/);
//       valis_auth_tokens.forEach((token) => {
//           if(tokenMatch.localeCompare(token)==0){
//             const matches = i[1].match(/[?&]([^&=]+)=([^&]+)/g);
//             const queryParams = {};
//             if (matches) {
//               matches.forEach(match => {
//                 const [key, value] = match.substring(1).split('=');
//                 if(key=="token"){
//                   x+=""
//                 }
//                 else{
//                   x += key+","+value
//                 }
//               });
//             }
//             console.log("VALID,",x)
//             l.push("VALID,",x)
//           }
//           else{
//             l.push("INVALID")
//           }
//   })
// }
// return l

// }


