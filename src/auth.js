// auth.js

let inactivityTimeout

export function isAuthenticated() {
  // Replace this with your actual authentication check logic
  return !!localStorage.getItem('authToken')
}

function resetTimer(logoutCallback, timeout) {
  clearTimeout(inactivityTimeout)
  inactivityTimeout = setTimeout(logoutCallback, timeout)
}

export function startInactivityTimer(logoutCallback, timeout = 300000) {
  // 5 minutes default
  function reset() {
    resetTimer(logoutCallback, timeout)
  }

  window.addEventListener('mousemove', reset)
  window.addEventListener('keydown', reset)
  window.addEventListener('scroll', reset)
  window.addEventListener('click', reset)

  resetTimer() // Initialize the timer
}

export function stopInactivityTimer() {
  clearTimeout(inactivityTimeout)
  window.removeEventListener('mousemove', resetTimer)
  window.removeEventListener('keydown', resetTimer)
  window.removeEventListener('scroll', resetTimer)
  window.removeEventListener('click', resetTimer)
}
