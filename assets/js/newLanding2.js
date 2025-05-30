var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var One = new Set();
var Two = new Set();

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  document.getElementById('planWarning').style.display = 'none'
  document.getElementById('saveWarning').style.display = 'none'
  //   document.getElementById('IULWarning').style.display='none'
  //   document.getElementById('investmentWarning').style.display='none'
  document.getElementById('ageWarning').style.display = 'none'
  document.getElementById('CurrentPlanWarning').style.display = 'none'
  document.getElementById('HealthWarning').style.display = 'none'
  document.getElementById('DependentWarning').style.display = 'none'
  document.getElementById('startWarning').style.display = 'none'

  // document.getElementById('captchaWarning').style.display='none'

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
  z = x[currentTab].getElementsByTagName("select");
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
  for (let i = 0; i < z.length; i++) {
    console.log(z[i].value, "haha")
    if (z[i].value == "" || z[i].value == "-None-") {
      z[i].className += " invalid";
      valid = false;
    }
  }
  if (currentTab == 0) {
    const firstName = document.getElementById("First_Name").value
    const lastName = document.getElementById("Last_Name").value
    const Email = document.getElementById("Email").value
    const Phone = document.getElementById("Phone").value
    document.getElementById("LEADCF109").checked = true;

// Add:
let ip;
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    ip = data.ip;
  document.getElementById("LEADCF157").value = ip;

  });

    grecaptcha.ready(function () {
      grecaptcha.execute("6LcPf00rAAAAAHRRGkIiqqzj2QSdlUReEYz3EJ7W", { action: "submit" }).then(function (token) {
        fetch("https://recaptcha-verify-delta.vercel.app/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        })
          .then(res => res.json())
          .then(data => {
            console.log("reCAPTCHA response:", data);
            if (data.success ) {
              document.getElementById("LEADCF156").value = data.score;
              // e.target.submit(); // real form submission
            } else {
              alert("reCAPTCHA failed.");
            }
          });
      });
    });
    document.getElementById("returnURL").value = "https://wealthmanagement.zohobookings.com/#/4491295000001065010?Name=" + firstName + " " + lastName + '&Email=' + Email + "&phone=" + Phone + "&staffId=4491295000000030016";

    var isphoneNoValid = await validatePhoneNo(Phone);
    console.log("isPhonevalid = " + isphoneNoValid);
    if (isphoneNoValid == false) {
      valid = false;
      // document.getElementById("Phone").className += " invalid";
    }
  }

  if (currentTab === 1) {
    var age = document.getElementById('LEADCF16')?.value;
    if (age < 18 || age > 90) {
      document.getElementById("ageWarning").style.display = 'block';
      document.getElementById("ageWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("ageWarning").style.display = 'none';
    }
    const Plan = document.getElementById('LEADCF130')
    if (Plan.value == "" || Plan.value == "-None-") {
      document.getElementById("planWarning").style.display = 'block';
      document.getElementById("planWarning").style.color = 'red';
      valid = false

    } else {
      document.getElementById("planWarning").style.display = 'none';
    }
    const Money = document.getElementById('LEADCF129')
    if (Money.value == "" || Money.value == "-None-") {
      document.getElementById("saveWarning").style.display = 'block';
      document.getElementById("saveWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("saveWarning").style.display = 'none';
    }
    const CurrentPlan = document.getElementById('LEADCF153')
    if (CurrentPlan.value == "" || CurrentPlan.value == "-None-") {
      document.getElementById("CurrentPlanWarning").style.display = 'block';
      document.getElementById("CurrentPlanWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("saveWarning").style.display = 'none';
    }
    const Health = document.getElementById('LEADCF152')
    if (Health.value == "" || Health.value == "-None-") {
      document.getElementById("HealthWarning").style.display = 'block';
      document.getElementById("HealthWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("HealthWarning").style.display = 'none';
    }
    const DependentWarning = document.getElementById('LEADCF152')
    if (DependentWarning.value == "" || DependentWarning.value == "-None-") {
      document.getElementById("DependentWarning").style.display = 'block';
      document.getElementById("DependentWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("DependentWarning").style.display = 'none';
    }
    const Dependent = document.getElementById('LEADCF129')
    if (Dependent.value == "" || Dependent.value == "-None-") {
      document.getElementById("startWarning").style.display = 'block';
      document.getElementById("startWarning").style.color = 'red';
      valid = false
    } else {
      document.getElementById("startWarning").style.display = 'none';
    }
  }
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




$('input[name="Emp"]').on("click", function (e) {
  nextPrev(1)
})
$('input[name="Saving"]').on("click", function (e) {
  nextPrev(1)
})


const scrollTOForm = (id = "crmWebToEntityForm") => {
  const element = document.getElementById(id);
  element.scrollIntoView({ block: 'end', behavior: 'smooth' });
}



async function validatePhoneNo(phone) {
  var apiKey = "num_live_dzZIzVWY7zUYtDQ03KUKPsbbBVZAADCAd9Jof820";
  var URL;
  if (phone && phone.includes("+1")) {
    URL = `https://api.numlookupapi.com/v1/validate/${phone}?apikey=${apiKey}`
  }
  else {
    URL = `https://api.numlookupapi.com/v1/validate/+1${phone}?apikey=${apiKey}`

  }
  var isphoneNoValid = false;
  if (!phone || phone == "") {
    return false;
  }
  document.getElementById("phoneWarning").className = "d-none"
  await axios.get(URL,)
    .then(response => {
      //console.log(response);
      const data = response.data;
      if (data.valid == false) {
        // document.getElementById("Phone").style = "background-color:  background-color: #ffdddd;"
        document.getElementById("Phone").style.background = "#ffdddd";
        document.getElementById("phoneWarning").className = "text-danger"
      }
      if (data && data.valid != null) {
        isphoneNoValid = data.valid;
        document.getElementById("Phone") = "customControl mb-4"
      }

    })
    .catch(error => {
      // console.log(error)
      isphoneNoValid = true
    });
  return isphoneNoValid;
}





