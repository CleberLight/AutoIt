//Variaveis Classes
class PCi {
	constructor(altura, largura,Nome,Sexo,Raca,Classe,Idade,Nivel,Familiar,Arma,Protecao,Magia,Mochila,Pele,Cabelo,Capacete,Camisa,Calca,Calsado,Forca,Velocidade,Inteligencia,Carisma,Sentimento,Vida) {
		this.altura = altura;
		this.largura = largura;
		this.Nome = Nome;
		this.Sexo = Sexo;
		this.Raca = Raca;
		this.Classe = Classe;
		this.Idade = Idade;
		this.Nivel = Nivel;
		this.Familiar = Familiar;
		this.Arma = Arma;
		this.Protecao = Protecao;
		this.Magia = Magia;
		this.Mochila = Mochila;
		this.Pele = Pele;
		this.Cabelo = Cabelo;
		this.Capacete = Capacete;
		this.Camisa = Camisa;
		this.Calca = Calca;
		this.Calsado = Calsado;
		this.Forca = Forca;
		this.Velocidade = Velocidade;
		this.Inteligencia = Inteligencia;
		this.Carisma = Carisma;
		this.Sentimento = Sentimento;
		this.Vida = Vida;
	}
}
class Mapa{}
class NPC{}

//Variaveis globais
n = 0;
const play = [];
posicaoX = 1;
posicaoY = 1;

//Funcoes
function NovoPers(){
	n++;
	play[n] = new PCi(1, 1, "teste", "man", "Humano",1,"Adolecente",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
	controi_PC(play[n]);
	document.getElementById("rad-man").checked = true;
	document.getElementById("rad-humano").checked = true;
	document.getElementById("rad-idade").checked = true;
	
	document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "blue";
	document.getElementById("c2"+(posicaoY+1)).style.backgroundColor = "blue";
	document.getElementById("c2"+(posicaoY+2)).style.backgroundColor = "blue";
	document.getElementById("c2"+(posicaoY+3)).style.backgroundColor = "blue";
}
function controi_PC(PC){
	if(PC.Sexo == "man") corpersonagem(1);
	if(PC.Sexo == "woman") corpersonagem(2);
	setTimeout(function(){
		if(PC.Raca == "Humano") corpersonagem(3);
		if(PC.Raca == "Anao") corpersonagem(4);
		if(PC.Raca == "Elfo") corpersonagem(5);
	}, 5);
	setTimeout(function(){
		if(PC.Idade == "Adolecente") corpersonagem(6);
		if(PC.Idade == "Adulto") corpersonagem(7);
		if(PC.Idade == "Velho") corpersonagem(8);
	}, 10);		
}

function controi_Mapa(Mapa){
	
}
function limpar(){
	//limpa em casa
	document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "white";
	document.getElementById("c2"+(posicaoY+1)).style.backgroundColor = "white";
	document.getElementById("c2"+(posicaoY+2)).style.backgroundColor = "white";
	document.getElementById("c2"+(posicaoY+3)).style.backgroundColor = "white";
	document.getElementById("c2"+(posicaoY+0)).style.border = "2px  solid white";
	document.getElementById("c2"+(posicaoY+1)).style.border = "2px  solid white";
	document.getElementById("c2"+(posicaoY+2)).style.border = "2px  solid white";	
	document.getElementById("c2"+(posicaoY+3)).style.border = "2px  solid white";
}
function controi_NPC(NPC){
	
}
function muda(m){
	if(m==1) play[n].Sexo = "man";
	if(m==2) play[n].Sexo = "woman";
	if(m==3) play[n].Raca = "Humano";
	if(m==4) play[n].Raca = "Anao";
	if(m==5) play[n].Raca = "Elfo";
	if(m==6) play[n].Idade = "Adolecente";
	if(m==7) play[n].Idade = "Adulto";
	if(m==8) play[n].Idade = "Velho";
	controi_PC(play[n]);
}
function corpersonagem(nx){
	if(nx==1){
		//cor blocos
		if(play[n].Raca == "Humano")document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "blue";
		document.getElementById("c2"+(posicaoY+1)).style.backgroundColor = "blue";
		document.getElementById("c2"+(posicaoY+2)).style.backgroundColor = "blue";
		document.getElementById("c2"+(posicaoY+3)).style.backgroundColor = "blue";
		play[n].Sexo = "man";
	}
	if(nx==2){
		//cor blocos
		if(play[n].Raca == "Humano")document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "pink";
		document.getElementById("c2"+(posicaoY+1)).style.backgroundColor = "pink";
		document.getElementById("c2"+(posicaoY+2)).style.backgroundColor = "pink";
		document.getElementById("c2"+(posicaoY+3)).style.backgroundColor = "pink";
		play[n].Sexo = "woman";
	}
	if(nx==3){
		//cor blocos
		if(play[n].Sexo == "man")document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "blue";
		if(play[n].Sexo == "woman")document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "pink";
		play[n].Raca = "Humano";
	}
	if(nx==4){
		//cor blocos
		document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "white";
		play[n].Raca = "Anao";
		document.getElementById("c2"+(posicaoY+0)).style.border = "2px  solid white";
	}
	if(nx==5){
		//cor blocos
		document.getElementById("c2"+(posicaoY+0)).style.backgroundColor = "green";
		play[n].Raca = "Elfo";
	}
	if(nx==6){
		play[n].Idade = "Adolecente";
		play[n].Velocidade = "20";
		play[n].Forca = "15";
		play[n].Inteligencia = "10";	
		if(play[n].Raca != "Anao")document.getElementById("c2"+(posicaoY+0)).style.border = "2px  solid green";
		document.getElementById("c2"+(posicaoY+1)).style.border = "2px  solid green";
		document.getElementById("c2"+(posicaoY+2)).style.border = "2px  solid green";
		document.getElementById("c2"+(posicaoY+3)).style.border = "2px  solid green";	
	}
	if(nx==7){
		play[n].Idade = "Adulto";
		play[n].Velocidade = "15";
		play[n].Forca = "20";
		play[n].Inteligencia = "10";
		if(play[n].Raca != "Anao")document.getElementById("c2"+(posicaoY+0)).style.border = "2px  solid yellow";
		document.getElementById("c2"+(posicaoY+1)).style.border = "2px  solid yellow";
		document.getElementById("c2"+(posicaoY+2)).style.border = "2px  solid yellow";
		document.getElementById("c2"+(posicaoY+3)).style.border = "2px  solid yellow";
	}
	if(nx==8){
		play[n].Idade = "Velho";
		play[n].Velocidade = "10";
		play[n].Forca = "5";
		play[n].Inteligencia = "20";	
		if(play[n].Raca != "Anao")document.getElementById("c2"+(posicaoY+0)).style.border = "2px  solid red";
		document.getElementById("c2"+(posicaoY+1)).style.border = "2px  solid red";
		document.getElementById("c2"+(posicaoY+2)).style.border = "2px  solid red";	
		document.getElementById("c2"+(posicaoY+3)).style.border = "2px  solid red";				
	}
}
function pula(){
	setTimeout(function(){
		limpar();
		posicaoY = 0;
		controi_PC(play[n]);
	}, 100);
	setTimeout(function(){
		limpar();
		posicaoY = 1;
		controi_PC(play[n]);
	}, 1000);
	
		//chamar o contrutor do personagem no locar onde vai ficar
		//ex: controi(1);
}