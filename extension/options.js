// Populate the text input with the current value
chrome.storage.sync.get(['locationVal'], function (result) {
  console.log('Got location', result.locationVal)
  document.getElementById('locationInput').value = result.locationVal || ''
})

// Update the setting on save clicks
document.getElementById('saveButton').addEventListener('click', function () {
  chrome.storage.sync.set({locationVal: document.getElementById('locationInput').value}, () => {
    console.log('New val', document.getElementById('locationInput').value)
  })
})
