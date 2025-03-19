var saldo = 0;
var rodada = 0;

function fazerAposta() {
    var valorAposta = parseInt(document.getElementById('valor').value);
    var taxaVitoria = parseInt(document.getElementById('taxa').value) / 100;
    var multiplicadorAposta = parseInt(document.getElementById('boost').value);
    var resultado = Math.random() < taxaVitoria ? 'ganhou' : 'perdeu';

    if (resultado === 'ganhou') {
        saldo += valorAposta * multiplicadorAposta;
    } else {
        saldo -= valorAposta;
    }

    // Atualizar o gráfico
    rodada += 1;
    chartAposta.data.labels.push(rodada);
    chartAposta.data.datasets[0].data.push(saldo);

    // Atualizar a cor do gráfico com base no saldo
    if (saldo >= 0) {
        chartAposta.data.datasets[0].backgroundColor = 'rgba(75, 192, 192, 0.2)';
        chartAposta.data.datasets[0].borderColor = 'rgba(75, 192, 192, 1)';
    } else {
        chartAposta.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
        chartAposta.data.datasets[0].borderColor = 'rgba(255, 99, 132, 1)';
    }

    chartAposta.update();

    // Atualizar o saldo total
    document.getElementById('saldo').innerText = saldo.toFixed(2);
    // Atualizar a rodada atual
    document.getElementById('rodada').innerText = rodada;
}

function fazerApostas(quantidade) {
    for (var i = 0; i < quantidade; i++) {
        fazerAposta();
    }
}

function resetAposta() {
    chartAposta.data.labels = [0];
    chartAposta.data.datasets[0].data = [0];
    chartAposta.update();

    // Salva dados no histograma
    if (saldo<=-1000){
        dados[0] += 1;
    } else if (saldo<=-750){
        dados[1] += 1;
    } else if (saldo<=-500){
        dados[2] += 1;
    } else if (saldo<=-250){
        dados[3] += 1;
    } else if (saldo<=0){
        dados[4] += 1;
    } else if (saldo<=250){
        dados[5] += 1;
    } else if (saldo<=500){
        dados[6] += 1;
    } else if (saldo<=750){
        dados[7] += 1;
    } else if (saldo<=1000){
        dados[8] += 1;
    } else if (saldo>1000){
        dados[9] += 1;
    }
    chartHistograma.update();
    
    // Atualizar o saldo total
    saldo = 0;
    rodada = 0;
    document.getElementById('saldo').innerText = saldo.toFixed(2);
    document.getElementById('rodada').innerText = rodada;
}

var intervalo;

function autoplay() {
    var velocidade = parseInt(document.querySelector('input[name="velocidade"]:checked').value);
    document.getElementById('autoplay').disabled = true;
    document.getElementById('pararAutoplay').disabled = false;
    console.log(velocidade);
    intervalo = setInterval(fazerAposta, velocidade);
}

function pararAutoplay() {
    document.getElementById('autoplay').disabled = false;
    document.getElementById('pararAutoplay').disabled = true;

    clearInterval(intervalo);
}
