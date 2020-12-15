document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo(e){
  var modeloVeiculo = document.getElementById('modeloVeiculo').value;
  var placaVeiculo = document.getElementById('placaVeiculo').value;
  var time = new Date();

  //valida form
if(!modeloVeiculo || !placaVeiculo){
    alert('Preencher os campos');
    return false;
}

//objeto carro
carro = {
    modelo: modeloVeiculo,
    placa: placaVeiculo,
    hora: time.getHours(),
    minutos: time.getMinutes()
}

if(localStorage.getItem('patio2') === null){ 
    var carros = [];
    carros.push(carro);
    localStorage.setItem('patio2',JSON.stringify(carros));
 }else{
     var carros = JSON.parse(localStorage.getItem('patio2'));
     carros.push(carro);
     localStorage.setItem('patio2',JSON.stringify(carros));
 }
 //resetar valore
 document.getElementById('formulario').reset();
//carrega a tabela apos ser inserido novo carro
 mostraPatio();
  //evita comportamento de reload de página
e.preventDefault();    
}

//apagar veiculo
function apagar(placa){
    var carros = JSON.parse(localStorage.getItem('patio2'));

    for(i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }
        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    mostraPatio();
}

//exibir tabela
function mostraPatio(){
    //vem como objeto e precisar converter para json
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = '';

    //preencher a tabela
    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultado.innerHTML += 
        '<tr><td>' + modelo +
        '</td><td>' + placa +
        '</td><td>' + hora + ':' + minutos +
        '</td><td><button class="btn btn-danger" onclick="apagar(\''+placa+'\')">Excluir</button></td></tr>';
    }
}