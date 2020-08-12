chrome.storage.sync.get('locationVal', function (items) {
  // Don't do anything if value is empty
  if (items.locationVal && items.locationVal !== '') {
    var timeWatcher = setInterval(() => {
      try {
        // Only run if modal is open
        if(document.querySelector('#edit-box-location-select')) {
          document.querySelectorAll('.time-entry-rows td.location').forEach(el => {
            // This div is added on top of the input
            var timeDiv = document.createElement('div')
            timeDiv.setAttribute('data-value', items.locationVal)
            timeDiv.className = 'item'
            timeDiv.textContent = items.locationVal
            // Update page values
            el.querySelector('#edit-box-location-select option').setAttribute('value', items.locationVal)
            if (!el.querySelector('.location-select-region .selectize-input .item')) {
              el.querySelector('.location-select-region .selectize-input').prepend(timeDiv)
            }
            el.querySelector('.location-select-region .selectize-input .item').textContent = items.locationVal
            el.querySelector('.location-select-region .selectize-input').classList.remove('not-full')
            el.querySelector('.location-select-region .selectize-input').classList.add('full')
            el.querySelector('.location-select-region .selectize-input').classList.add('has-items')
            el.querySelector('#edit-box-location-select-selectized').setAttribute('style', 'width: 4px; opacity: 0; position: absolute; left: -10000px;')
          })
        }
      } catch (err) {
        console.log('SAM LOOK:', err)
        clearInterval(timeWatcher)
      }
    }, 1000)
  }
})
