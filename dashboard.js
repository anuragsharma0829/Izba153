const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID=data.objectId;
console.log("heloooooooooo",objID);
// cheak brand
$(document).ready(function () {
  // Fetch user data from localStorage for session management
  const userData = localStorage.getItem("userData");
  if (userData) {
    const data = JSON.parse(userData);
    // Check the custom API for validation
    $.ajax({
      url: "https://cleanstation.backendless.app/api/services/Brand/CheakBrand",
      type: "POST",
      data: JSON.stringify({ objectId: data.objectId }), // Get the objectId from localStorage
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: function (response) {
        console.log("API response:", response);

        if (response === true) {
          // Show #BrandHeroSection and hide #CreateBrandSection
          $("#MainSection").show();
          $("#CreateBrandSection").hide();
        } else {
          // Show #CreateBrandSection and hide #BrandHeroSection
          $("#MainSection").hide();
          $("#CreateBrandSection").show();
        }
      },
      error: function (error) {
        console.log(error);
        // Handle API error for user validation if necessary
        // Optionally, show an error message to the user
        console.log("Error: User validation failed. Please try again later.");
        // You can add an error message on the page if needed
      },
    });
  }
});

$(document).ready(function () {
  $("#AddFulfillmentContractButton").click(function () {
    $("#Wrapper").hide();
    $("#CreateFulfillmentContractBlock").show();
  });
});

$(document).ready(function () {
  $("#CancelCreateFulfillmentContract").click(function () {
    $("#CreateFulfillmentContractBlock").hide();
    $("#Wrapper").show();
  });
});

$(document).ready(function () {
  $("#CreateContractRatesBtn").click(function () {
    $("#CreateFulfillmentContractBlock").hide();
    $("#Wrapper").hide();
    $("#fulfillmentContractSection").show();
  });
});

$(document).ready(function () {
  $("#FulfillmentContractEditButton").click(function () {
    $("#Wrapper").hide();
    $("#UpdateFulfillmentContractSection").show();
  });
});

$(document).ready(function () {
  $("#FCDetail").click(function () {
    $("#Wrapper").hide();
    $("#FulfillmentContractDetailSection").show();
  });
});

$(document).ready(function () {
  $("#CancelCreateContractButton").click(function () {
    $("#fulfillmentContractSection").hide();
    $("#Wrapper").show();
  });
});

$(document).ready(function () {
  $("#CreateContractRateButton").click(function () {
    $("#fulfillmentContractSection").hide();
    $("#successfullMessage").show();
  });
});

$(document).ready(function () {
  $("#SuccessMessageClose ").click(function () {
    $("#successfullMessage").hide();
    $("#FulfillmentContractDetailSection").show();
  });
});

$(document).ready(function () {
  $("#BrandTab").click(function () {
    $("#CreateFulfillmentContractBlock").hide();
    $("#fulfillmentContractSection").hide();
    $("#UpdateFulfillmentContractSection").hide();
    $("#FulfillmentContractDetailSection").hide();
    $("#Wrapper").show();
  });
});




// create Brand
function showError(elementId, message) {
  const errorElement = $(elementId);
  errorElement.text(message).css({ color: "red", display: "block" });
}

function hideError(elementId) {
  const errorElement = $(elementId);
  errorElement.text("").css({ display: "none" });
}

function showGenericError() {
  showError("#errorContainer", "Please fill out all the required fields.");
}

$(document).ready(function () {
  $("#Brand-Name").on("input", function () {
    let BrandName = $("#Brand-Name").val();
    if (!BrandName) {
      showError("#brandNameError", "Brand name should not be blank");
    } else {
      hideError("#brandNameError");
    }
  });

  $("#Brand-URl").on("input", function () {
    let BrandURl = $("#Brand-URl").val();
    if (!BrandURl) {
      showError("#Brand-URlerror", "Last Name should not be blank");
    } else {
      hideError("#Brand-URlerror");
    }
  });

  $("#Brand-URl").on("input", function () {
    let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
    if (!ShoppingCartDropDown) {
      showError("#ShoppingCartDropDown", "Last Name should not be blank");
    } else {
      hideError("#ShoppingCartDropDown");
    }
  });

  $("#CreateBrandButton").click(function () {
    let BrandName = $("#Brand-Name").val();
    let BrandURl = $("#Brand-URl").val();
    let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
    let userobjId = objID;
    console.log("<<<<<<", userobjId);
    // let fcConatainer = $("#centers").val();
    // const errorElement = document.getElementById("errBrand");

    if (BrandName !== "" && BrandURl !== "" && ShoppingCartDropDown !== "") {
      let brandDetail = {
        brand_name: BrandName,
        URL: BrandURl,
        Cart: ShoppingCartDropDown,
        User_ID: {
          objectId: userobjId,
        },
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/Brand/CreateBrand",
        {
          method: "POST",
          body: JSON.stringify(brandDetail),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          brandId = data.objectId;
          handleBrandID(brandId); // Call
        })
        .catch((error) => console.error("Error:", error));
    } else {
      showGenericError();
    }
    return false;
  });
});



//set brand and url


    console.log("Retrieved postId:", objID);
    fetch(`https://cleanstation.backendless.app/api/services/Brand/UserIDToBrand?UserID=${objID}`).then(
      (res) => {
        res.json().then((data) => {
            document.getElementById("Brand-URl-Text").innerHTML = data.URL;
            document.getElementById("BrandNameText").innerHTML = data.brand_name;
        });
      }
    );