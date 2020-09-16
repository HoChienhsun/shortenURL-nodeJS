const form = document.querySelector('.url-form');
const result = document.querySelector('.result-section');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.url-input');
  fetch('/input_url', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: input.value,
    })
  })
    .then(response => {
      if (!response.ok) {
        while (result.hasChildNodes()) {
          result.removeChild(result.lastChild);
        }
        result.insertAdjacentHTML('afterbegin', `
        <div class="error">
            error message: ${response.statusText}
        </div>
        `)
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(res => {
      while (result.hasChildNodes()) {
        result.removeChild(result.lastChild);
      }
      result.insertAdjacentHTML('afterbegin', `
        <div class="result">
          <a target="_blank" class="short-url" rel="noopener" href="/${res.uuidv4}">
            ${location.origin}/${res.uuidv4}
          </a>
        </div>
      `)
    })
    .catch(console.error)
});
