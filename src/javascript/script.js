document.querySelector('#search').addEventListener ('submit', async (event) => { // usado para não recarregar a tela (buscar dados via API)
   event.preventDefault();                              // asyncChamada para a API (fetch) - linha 15

   const nomeCidade = document.querySelector('#nome_cidade').value;

   if(!nomeCidade){
    document.querySelector("#temperatura").classList.remove('show');
    mostraAlerta("Digite uma cidade antes!");
    return;
   }

   //console.log(nomeCidade);
const apiKey = '88269f6d7ffcc88ca9f6b2007a1d8cdc'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt_br`
//O encodeURI é para palavras com acentos, se não tiver é pego o código do acento e pode falhar

const resultados = await fetch(apiUrl);
 const json = await resultados.json();
 console.log(json);

if(json.cod === 200){
    mostrarInfo({
        cidade: json.name,
        pais: json.sys.country,
        temp:json.main.temp,
        tempMax:json.main.temp_max,
        tempMin:json.main.temp_min,
        desc: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        veloVento: json.wind.speed,
        humidade: json.main.humidity, //Recebe as informações aqui, e passa para a função mostrarInfo

    })
}else{  
    document.querySelector("#temperatura").classList.remove('show');
    mostraAlerta(`

        Cidade não localizada
        
        <img src="images/404.svg"/>
        
        `);
}
});

function mostrarInfo (json){

document.querySelector("#temperatura").classList.add('show'); //para mostrar as infos quando pesquisar

document.querySelector('#title').innerHTML = `${json.cidade}, ${json.pais}`;
 document.querySelector('#valor_temp').innerHTML = `${json.temp.toFixed(1).toString().replace(".",",")} <sup>C°</sup>`;//toFixed(1), apenas uma casa depois da virgula  
  document.querySelector('#descricao').innerHTML = `${json.desc}`;
   document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace(".",",")} <sup>C°</sup>`;
 document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace(".",",")} <sup>C°</sup>`;
  document.querySelector('#vento').innerHTML = `${json.veloVento.toFixed(1).toString().replace(".",",")} Km/h`;
   document.querySelector('#humid').innerHTML = `${json.humidade}%`;

}

function mostraAlerta(msg){ //Quando quiser mmostrar alerta, chama a função
    document.querySelector('#alert').innerHTML = msg;
}