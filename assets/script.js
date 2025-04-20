const display = document.getElementById("display");
const themeBtn = document.querySelector('.theme-btn');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function toggleSign() {
    if (display.value !== "") {
        if (display.value.charAt(0) === "-") {
            display.value = display.value.slice(1);
        } else {
            display.value = "-" + display.value;
        }
    }
}

function percentage() {
    try {
        const value = eval(display.value);
        display.value = (value / 100).toString();
    } catch(error) {
        display.value = "Error";
    }
}

function calculate(){
    try{
        // Replace the display operators with JavaScript operators
        let expression = display.value
            .replace('×', '*')
            .replace('÷', '/')
            .replace('−', '-');
        
        const result = eval(expression);
        
        // Format the result to handle floating point precision
        if (Number.isInteger(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(8)).toString();
        }
    }
    catch(error){
        display.value = "Error";
    }
}