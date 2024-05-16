chrome.storage.sync.get('locationVal', function (items) {
  if (items.locationVal && items.locationVal !== '') {
    console.log('Location value to set:', items.locationVal);

    var timeWatcher = setInterval(() => {
      try {
        // Only run if the modal is open
        let modal = document.querySelector('[data-testid="lightbox"]');
        if (modal) {
          console.log('Modal found');

          // Find the location input field in the modal
          let locationInput = modal.querySelector('#location');
          if (locationInput) {
            console.log('Location input found');

            // Set the value of the location input field
            locationInput.value = items.locationVal;

            // Manually trigger input and change events
            locationInput.dispatchEvent(new Event('input', { bubbles: true }));
            locationInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('Location input value set and events dispatched');

            // Find the dropdown container (parent of the caret icon)
            let dropdownContainer = locationInput.closest('.control_select__inputStyles--f4xjW');
            if (dropdownContainer) {
              console.log('Dropdown container found');

              // Attempt to find the caret icon using various selectors
              let caretIcon = dropdownContainer.querySelector('svg[title="Open choices listbox"], svg[aria-label="Open choices listbox"], svg.icon-button_icon-button__button--sNBlw, svg');
              if (!caretIcon) {
                caretIcon = dropdownContainer.querySelector('.control_icons__container--jCWn3 svg'); // Broader search within the container
              }

              // Fallback if caret icon is not found
              if (!caretIcon) {
                caretIcon = locationInput.nextElementSibling.querySelector('svg'); // Look for a sibling element
              }

              if (caretIcon) {
                console.log('Caret icon found:', caretIcon);

                // Click the parent element of the caret icon
                caretIcon.parentElement.click();
                console.log('Dropdown opened');

                // Allow some time for the dropdown to open
                setTimeout(() => {
                  // Find the listbox and click the first available option
                  let listbox = modal.querySelector('[id^="location-single-choice-listbox"]');
                  if (listbox) {
                    console.log('Listbox found');

                    let options = listbox.querySelectorAll('[role="option"]');
                    if (options.length > 0) {
                      let desiredOption = Array.from(options).find(option => option.textContent.trim() === items.locationVal.trim());
                      if (desiredOption) {
                        desiredOption.setAttribute('aria-selected', 'true');
                        desiredOption.classList.add('selected'); // Ensure it's visually marked as selected
                        console.log('Desired option selected:', desiredOption.textContent);

                        // Simulate a click event on the desired option to ensure it is properly selected
                        desiredOption.click();

                        // Manually trigger input and change events again to reflect the selected value
                        locationInput.dispatchEvent(new Event('input', { bubbles: true }));
                        locationInput.dispatchEvent(new Event('change', { bubbles: true }));
                        console.log('Final location input value set and events dispatched');

                        // Clear the interval since the location has been set
                        clearInterval(timeWatcher);
                      } else {
                        console.log('Desired option not found');
                      }
                    } else {
                      console.log('No options found in the listbox');
                    }
                  } else {
                    console.log('Listbox not found');
                  }
                }, 500); // Adjust the delay as necessary to ensure the dropdown has time to open
              } else {
                console.log('Caret icon not found');
              }
            } else {
              console.log('Dropdown container not found');
            }
          } else {
            console.log('Location input not found');
          }
        } else {
          console.log('Modal not found');
        }
      } catch (err) {
        console.log('Error:', err);
        clearInterval(timeWatcher);
      }
    }, 1000);
  } else {
    console.log('Location value is empty or not set');
  }
});
