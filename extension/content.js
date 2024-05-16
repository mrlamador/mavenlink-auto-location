chrome.storage.sync.get('locationVal', function (items) {
  if (items.locationVal && items.locationVal !== '') {
    // Set Interval is used to allow the other modals to select the correct state
    const timeWatcher = setInterval(() => {
      try {
        // Only run if the modal is open
        let modal = document.querySelector('[data-testid="lightbox"]');

        if (modal) {
          // Find the location input field in the modal
          let locationInput = modal.querySelector('#location');

          if (locationInput) {
            // Set the value of the location input field
            locationInput.value = items.locationVal;

            // Manually trigger input and change events
            locationInput.dispatchEvent(new Event('input', { bubbles: true }));
            locationInput.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Find the dropdown container (parent of the caret icon)
            let dropdownContainer = locationInput.closest('.control_select__inputStyles--f4xjW');

            if (dropdownContainer) {
              // Attempt to find the caret icon using various selectors
              let caretIcon = dropdownContainer.querySelector('svg[title="Open choices listbox"], svg[aria-label="Open choices listbox"], svg.icon-button_icon-button__button--sNBlw, svg');

              if (!caretIcon) {
                // Broader search within the container
                caretIcon = dropdownContainer.querySelector('.control_icons__container--jCWn3 svg'); 
              }

              // Fallback if caret icon is not found
              if (!caretIcon) {
                caretIcon = locationInput.nextElementSibling.querySelector('svg'); // Look for a sibling element
              }

              if (caretIcon) {
                // Click the parent element of the caret icon
                caretIcon.parentElement.click();

                // Allow some time for the dropdown to open
                setTimeout(() => {
                  // Find the listbox and click the first available option
                  let listbox = modal.querySelector('[id^="location-single-choice-listbox"]');

                  if (listbox) {
                    let options = listbox.querySelectorAll('[role="option"]');

                    if (options.length > 0) {
                      let desiredOption = Array.from(options).find(option => option.textContent.trim() === items.locationVal.trim());

                      if (desiredOption) {
                        desiredOption.setAttribute('aria-selected', 'true');
                        desiredOption.classList.add('selected'); // Ensure it's visually marked as selected

                        // Simulate a click event on the desired option to ensure it is properly selected
                        desiredOption.click();

                        // Manually trigger input and change events again to reflect the selected value
                        locationInput.dispatchEvent(new Event('input', { bubbles: true }));
                        locationInput.dispatchEvent(new Event('change', { bubbles: true }));                  
                      } 
                    } 
                  } 
                }, 500);
              } 
            } 
          } 
        } 
      } catch (err) {
        console.log('Error:', err);
        clearInterval(timeWatcher);
      }
    }, 1000);
  }
});