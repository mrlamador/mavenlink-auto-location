
chrome.storage.sync.get(['locationVal'], function (result) {
  console.log('Got location', result.locationVal)
  document.getElementById('locationInput').value = result.locationVal || ''
})
document.getElementById('saveButton').addEventListener('click', function () {
  chrome.storage.sync.set({locationVal: document.getElementById('locationInput').value}, () => {
    console.log('New val', document.getElementById('locationInput').value)
  })
})
