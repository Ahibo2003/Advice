const btn = document.querySelector('#btn');
const icon = document.querySelector('#icon');
const adviceIdSpan = document.querySelector('h3');
const adviceTextParagraph = document.querySelector('p');

async function getAdvice() {
    icon.classList.add('spinning');
    btn.disabled = true;

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error(`Advice API returned ${response.status}`);
        }

        const data = await response.json();
        adviceIdSpan.textContent = `ADVICE # ${data.slip.id}`;
        adviceTextParagraph.textContent = data.slip.advice;
    } catch (error) {
        console.error('Could not load advice:', error);
        adviceTextParagraph.textContent = 'Could not load advice. Please try again.';
    } finally {
        icon.classList.remove('spinning');
        btn.disabled = false;
    }
}

btn.addEventListener('click', () => {
    getAdvice();
});