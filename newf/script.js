let wrongCount = 0;
const maxWrongAnswers = 8;
const neonColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
const backgroundColors = ['#000428', '#004e92', '#00ffff', '#ff00ff', '#00ff00', '#ff0000'];

document.getElementById('option1').addEventListener('click', function() {
    checkAnswer('wrong');
});
document.getElementById('option2').addEventListener('click', function() {
    checkAnswer('correct');
});

function checkAnswer(answer) {
    const result = document.getElementById('result');
    const optionsDiv = document.getElementById('options');
    const overlay = document.getElementById('overlay');
    const effect = document.getElementById('effect');
    const message = document.getElementById('message');
    const buttons = Array.from(optionsDiv.getElementsByTagName('button'));

    if (answer === 'correct') {
        result.textContent = 'Correct!';
        result.style.color = 'green';

        // Ekranı tamamen kaplayan renkli efekt
        const neonColor = '#00ffff'; // Kırmızı neon
        const backgroundColor = '#004e92'; // Galaksi mavisi

        overlay.style.display = 'block'; // Overlay'i görünür yap
        overlay.style.opacity = '1'; // Opaklık

        effect.style.backgroundColor = neonColor; // Efekt rengi
        effect.style.transform = 'scale(0)';
        effect.style.display = 'block';
        effect.style.opacity = '1';
        effect.style.transition = 'transform 1s ease-out, opacity 1s ease-out';

        // Efekt büyüme animasyonu
        setTimeout(function() {
            effect.style.transform = 'scale(2.5)'; // Efektin büyüme boyutu
            effect.style.opacity = '0'; // Efektin kaybolması

            // Mesajı belirginleştir ve renk değiştirme animasyonunu başlat
            message.style.opacity = '1';
            message.style.transform = 'scale(1)';
            message.style.transition = 'transform 1s ease-out, opacity 1s ease-out, color 2s ease-out';

            const colorChange = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Mesaj için renkler
            let index = 0;

            function changeColor() {
                message.style.color = colorChange[index % colorChange.length];
                index++;
                setTimeout(changeColor, 500); // Renk değişimi her 0.5 saniyede bir
            }

            changeColor();
        }, 500); // Efekt animasyonu süresi
    } else {
        wrongCount++;
        result.textContent = 'bir cavab daha ver!';
        result.style.color = 'red';

        // Arka plan ve neon renkleri değiştir
        const neonColor = neonColors[wrongCount % neonColors.length];
        const backgroundColor = backgroundColors[wrongCount % backgroundColors.length];
        document.body.style.backgroundColor = backgroundColor;

        // Yanlış butonlara neon efekti ekle ve üst üste yerleştir
        buttons.forEach(button => {
            button.style.backgroundColor = neonColor;
            button.style.color = 'black'; // Buton üzerindeki yazı rengi siyah
            button.style.textShadow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor}`;
            button.style.position = 'absolute'; // Üst üste yerleştirmek için
            button.style.top = `${Math.random() * 100}%`; // Rastgele yerleştirme
            button.style.left = `${Math.random() * 100}%`; // Rastgele yerleştirme
        });

        // Doğru butonun görünme olasılığını artır
        const correctButton = buttons.find(btn => btn.textContent === 'FUAD');
        if (correctButton) {
            correctButton.style.opacity = (0.25 + (wrongCount * 0.05)).toString();
            if (parseFloat(correctButton.style.opacity) > 1) {
                correctButton.style.opacity = '1';
            }
        }

        // Yanlış cevap sayısına göre yeni doğru cevap ekle
        if (wrongCount >= 2) {
            const newButton = document.createElement('button');
            newButton.textContent = 'FUAD';
            newButton.onclick = function() { checkAnswer('correct'); };
            newButton.style.backgroundColor = neonColor; // Neon arka plan rengi
            newButton.style.color = 'black'; // Buton üzerindeki yazı rengi siyah
            newButton.style.textShadow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor}`;
            newButton.style.position = 'absolute';
            newButton.style.top = `${Math.random() * 100}%`;
            newButton.style.left = `${Math.random() * 100}%`;
            optionsDiv.appendChild(newButton);
        }

        // 8 kez yanlış cevap verildiğinde mevcut yanlış buton doğru butona dönüşür
        if (wrongCount === maxWrongAnswers) {
            const wrongButton = buttons.find(btn => btn.textContent === 'o');
            if (wrongButton) {
                wrongButton.textContent = 'FUAD';
                wrongButton.onclick = function() { checkAnswer('correct'); };
                wrongButton.style.backgroundColor = neonColor; // Neon arka plan rengi
                wrongButton.style.color = 'black'; // Buton üzerindeki yazı rengi siyah
                wrongButton.style.textShadow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor}`;
                wrongButton.style.position = 'absolute';
                wrongButton.style.top = `${Math.random() * 100}%`;
                wrongButton.style.left = `${Math.random() * 100}%`;
            }
        }
    }
}
