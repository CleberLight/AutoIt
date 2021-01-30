// Variáveis globais utilizadas no jogo
            var canvas, context, barraWidth, barraHeight, jogadorPosX, jogadorPosY, teclaCimaPressionada, teclaBaixoPressionada, oponentePosX, 
                   oponentePosY, oponenteParaCima, bolaRaio, bolaPosX, bolaPosY, bolaParaDireita, bolaAngulo, bolaTempo,
                   velocidadeJogador, velocidadeOponente, velocidadeBola, pontosJogador, pontosOponente,movimento;
            var img=new Image();
			var img2=new Image();
			var imgc1=new Image();
			var imgc2=new Image();
			var direcao= 2;
			
            // Método para iniciar o jogo, executado no onload da tag body
            function init() {
            	canvas = document.getElementById("canvas"); // Procura o canvas
				context = canvas.getContext("2d"); // Recupera o contexto 2d

				// Sobre as 2 barrinhas...
				barraWidth = 50; // Largura
				barraHeight = 90; // Altura
				
				// Sobre a barrinha jogadora
				jogadorPosX = 0; // Posição inicial x, encostada na parede esquerda
				jogadorPosY = (canvas.height - barraHeight) / 2; // Posição inicial y, no meio
				
				Caixa1X = 90; // Posição inicial x, encostada na parede esquerda
				Caixa1Y = 190; // Posição inicial y, no meio
				movimento = 0;
				teclaCimaPressionada = false; // Para o jogador não subir automaticamente
				teclaBaixoPressionada = false; // Para o jogador não descer automaticamente
				teclaDireitaPressionada = false; 
				teclaEsquerdaPressionada = false; 
				velocidadeJogador = 10; // Velocidade do movimento
				pontosJogador = 0; // Pontuação
				
				// Sobre a barrinha oponente
				oponentePosX = canvas.width - barraWidth; // Posição inicial x, encostada na parede direita
				oponentePosY = 0; // Posição inicial y, em cima
				oponenteParaCima = false; // Para o oponente não subir automaticamente
				velocidadeOponente = 10; // Velocidade do movimento
				pontosOponente = 0; // Pontuação
				
				// Sobre a bolinha
				bolaRaio = 10; // Raio
				bolaPosX = canvas.width / 2; // Para a bolinha sair do meio horizontal
				bolaPosY = canvas.height / 2; // Para a bolinha sair do meio vertical
				bolaParaDireita = false; // Para a bolinha não ir pra direita automaticamente
		        bolaAngulo = Math.floor(Math.random() * 21) - 10; // Ângulo inicial, aleatório de -10 a 11
		        bolaTempo = 0; // Zera o tempo de deixar a bolinha invisível e a coloca em jogo novamente
				velocidadeBola = 5; // Velocidade do movimento
                    
				document.addEventListener('keydown', keyDown, false); // Adiciona evento para keydown
				document.addEventListener('keyup', keyUp, false); // Adiciona evento para keyup
				document.addEventListener('keyR', keyR, false); // Adiciona evento para keyRight
				document.addEventListener('keyL', keyL, false); // Adiciona evento para keyLeft
				setInterval(gameLoop, 200); // Chama a function gameLoop a cada 30 frames
            }
            
			function keyDown(e) { // Quando pressionada a tecla...
				if (e.keyCode == 38) { // UP
					teclaCimaPressionada = true; // Sobe
				}
				else if (e.keyCode == 40) { // DOWN
                	teclaBaixoPressionada = true; // Desce
				}
				else if (e.keyCode == 39) { // Left
                	teclaEsquerdaPressionada = true; // Desce
				}
				else if (e.keyCode == 37) { // Right
                	teclaDireitaPressionada = true; // Desce
				}
				
			}
                        
            function keyUp(e) { // Quando liberada a tecla...
				if (e.keyCode == 38) { // UP
					teclaCimaPressionada = false; // Para
				}
				else if (e.keyCode == 40) { // DOWN
					teclaBaixoPressionada = false; // Para
				}
				else if (e.keyCode == 39) { // Left
                	teclaEsquerdaPressionada = false; // Para
				}
				else if (e.keyCode == 37) { // Right
                	teclaDireitaPressionada = false; // Para
				}
            }
			function keyR(e) {
			}
			function keyL(e) {
			}
                        
            function gameLoop() {
	            // Barrinha jogadora
	            if (teclaCimaPressionada != teclaBaixoPressionada) { // Se o jogador estiver pressionando a tecla UP ou a DOWN...
					if (teclaCimaPressionada) { // Se for a UP
						if (jogadorPosY > 0) { // E o jogador não estiver encostando na tela (por cima)
							jogadorPosY -= velocidadeJogador;// Ele se move um pouco mais pra cima
							movimento++;
							direcao = 1;
							if(movimento == 3) movimento = 1;
						}
					}
					else { // Se for a DOWN
						if (jogadorPosY < (canvas.height - barraHeight)) { // E o jogador não estiver encostando na tela (por baixo)
							jogadorPosY += velocidadeJogador; // Ele se move um pouco mais pra baixo
							movimento++;
							direcao = 2;
							if(movimento == 3) movimento = 1;
						}
					}
	            }
				if (teclaDireitaPressionada != teclaEsquerdaPressionada) { // Se o jogador estiver pressionando a tecla LEFT ou a RIGHT...
					if (teclaDireitaPressionada) { 
						if (jogadorPosX > 0) { 
							jogadorPosX -= velocidadeJogador;// Ele se move um pouco mais pra cima
							movimento++;
							direcao = 3;
							if(movimento == 3) movimento = 1;
						}
					}
					else { // Se for a DOWN
						if (jogadorPosX < (canvas.width - barraWidth)) { // E o jogador não estiver encostando na tela (por baixo)
							jogadorPosX += velocidadeJogador; // Ele se move um pouco mais pra baixo
							movimento++;
							direcao = 4;
							if(movimento == 3) movimento = 1;
						}
					}
	            }
	
	            // Barrinha oponente
	            /*if (oponenteParaCima) { // Se o oponente estiver se movendo para cima
					oponentePosY -= velocidadeOponente; // Ele continua se movendo pra cima
					if (oponentePosY <= 0) { // Quando ele encostar na tela (por cima)
						oponenteParaCima = false; // Ele muda a direção, pra baixo
					}
	            }
	            else { // Se o oponente estiver se movendo para baixo
					oponentePosY += velocidadeOponente; // Ele continua se movendo pra baixo
					if (oponentePosY >= canvas.height - barraHeight) { // Quando ele encostar na tela (por baixo)
						oponenteParaCima = true; // Ele muda a direção, pra cima
					}
	            }*/
	
	            // Bolinha
				/*if (bolaTempo <= 0) { // Se a bolinha estiver em jogo, o tempo é 0 (após marcar ponto, a bolinha fica invisível por um tempo)
					if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // Se a bolinha enconstar no jogador pelo eixo X
						if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeight)) { // E pelo eixo Y
							bolaParaDireita = true; // Ela muda de lado (pra direita) e é rebatida para o oponente
							if (teclaCimaPressionada) { // Se o jogador estiver indo pra cima quando a bolinha encostar nele
								bolaAngulo = Math.floor(Math.random() * 10) - 9; // Ela é mandada pra diagonal pra cima
							}
							else { // Se o jogador estiver indo pra baixo quando a bolinha encostar nele
								bolaAngulo = Math.floor((Math.random() * 10)); // Ela é mandada pra diagonal pra baixo
	                        }           
							
							document.getElementById('toque').play();
	                    }                    
					}
					else if ((bolaPosX + bolaRaio) >= oponentePosX) {  // Se a bolinha enconstar no oponente pelo eixo X
						if ((bolaPosY + bolaRaio > oponentePosY) && (bolaPosY - bolaRaio < oponentePosY + barraHeight)) { // E pelo eixo Y
							bolaParaDireita = false; // Ela muda de lado (pra esquerda) e é rebatida para o jogador
							if (oponenteParaCima) { // Se o oponente estiver indo pra cima quando a bolinha encostar nele
								bolaAngulo = Math.floor(Math.random() * 10) - 9; // Ela é mandada pra diagonal pra cima
							}
							else { // Se o oponente estiver indo pra baixo quando a bolinha encostar nele
								bolaAngulo = Math.floor((Math.random() * 10)); // Ela é mandada pra diagonal pra baixo
							}  
						}
					
						document.getElementById('toque').play();
					} 
	                    
					if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // Se a bolinha bater em cima ou em baixo da tela
					    bolaAngulo = bolaAngulo * -1; // Multiplicamos por -1 para inverter o sinal e a direção da bolinha no eixo Y
					}
					bolaPosY += bolaAngulo; // Movemos a bolinha pra cima ou pra baixo, de acordo com o cálculo acima
					
					if (bolaParaDireita) { // Se a bolinha estiver indo pra direita
					    bolaPosX += velocidadeBola; // Ela continua se movendo pra direita
					}
					else { // Se estiver indo pra esquerda
					    bolaPosX -= velocidadeBola; // Ela continua se movendo pra esquerda
					}                    
				}              
	                
				if ((bolaPosX <= 0) || (bolaPosX >= canvas.width)) { // Se a bolinha sair da tela
				    if (bolaTempo >= 50) { // Se o tempo de deixar a bolinha invisível passou
				        if (bolaPosX <= 0)  { // Se a bola saiu pela esquerda
				            pontosOponente++; // Ponto do oponente!
				        }
				        else { // Se a bolinha saiu pela direita
				            pontosJogador++; // Ponto do jogador!
				        }
				    
				        document.getElementById('morte').play();
				    
						//Reiniciando o jogo...
						bolaPosX = canvas.width / 2; // Para a bolinha sair do meio horizontal
				        bolaPosY = canvas.height / 2; // Para a bolinha sair do meio vertical
				        bolaParaDireita = false; // Para a bolinha não ir pra direita automaticamente
				        bolaAngulo = Math.floor(Math.random() * 21) - 10; // Ângulo inicial, aleatório de -10 a 11
				        bolaTempo = 0; // Zera o tempo de deixar a bolinha invisível e a coloca em jogo novamente
				    }
				    else { // Se o tempo de deixar a bola invisível ainda não passou
				        bolaTempo++; // A contagem até 50 continua
				    }
				}*/
	
	            // Desenha tudo na tela
				if(movimento == 1 && direcao == 2) img2.src="FrentePD.png";
				if(movimento == 1 && direcao == 1) img2.src="trasPD.png";
				if(movimento == 2 && direcao == 2) img2.src="FrentePE.png";
				if(movimento == 2 && direcao == 1) img2.src="trasPE.png";
				if(movimento > 0 && direcao == 3) img2.src="DireitaP.png";
				if(movimento > 0 && direcao == 4) img2.src="EsquerdaP.png";
	            context.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela antes de desenhar
	            context.drawImage(img2,jogadorPosX,jogadorPosY);
				imgc1.src="caixa.png";
				context.drawImage(imgc1,Caixa1X,Caixa1Y);
				imgc2.src="caixa.png";
				context.drawImage(imgc2,Caixa1X,Caixa1Y);
	            // Jogador e Oponente
				img.onload = function(){
					context.drawImage(img,jogadorPosX,jogadorPosY);
				};
				if(movimento == 0 && direcao == 2) img.src="FrenteP.png";
				if(movimento == 0 && direcao == 1) img.src="trasP.png";
				if(movimento == 1 && direcao == 2) img.src="FrentePD.png";
				if(movimento == 1 && direcao == 1) img.src="trasPD.png";
				if(movimento == 2 && direcao == 2) img.src="FrentePE.png";
				if(movimento == 2 && direcao == 1) img.src="trasPE.png";
				if(movimento > 0 && direcao == 3) img.src="DireitaP.png";
				if(movimento > 0 && direcao == 4) img.src="EsquerdaP.png";
				img2.src=img.src;
	            /*context.fillStyle = "green";
	            context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight); // Desenha jogador
	            
	            context.fillStyle = "blue";
	            context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight); // Desenha oponente*/
	            
	            // Bolinha
	            /*context.beginPath(); // Inicia o modo de desenho
	            context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // Desenha o círculo desejado com as coordenadas no centro
	            context.closePath(); // Finaliza o caminho (opcional)
	            context.fillStyle = "red";
	            context.fill();*/
	            
	            // Placar
	            var pontosA = pontosJogador; // Variável temporária para não alterar pontosJogador
	            var pontosB = pontosOponente; // Variável temporária para não alterar pontosOponente
	            
	            if (pontosA < 10) { // Se o número de pontos for menor que 10, colocamos o zero á esquerda
	                pontosA = "0" + pontosA;
	            }
	            
	            if (pontosB < 10) { // Se o número de pontos for menor que 10, colocamos o zero á esquerda
	                pontosB = "0" + pontosB;
	            }
	            
	            context.font = "42pt Helvetica"; // Tamanho e fonte para desenhar o texto
	            context.fillStyle = "#F00000"; // Cor preta (opcional)
	            context.fillText(pontosA + " " + pontosB, (canvas.width / 2) - 70, 50); // Escreve texto na tela na posição desejada
	            
	            // Linha divisória
	            context.beginPath(); // Inicia o modo de desenho
	            context.moveTo(canvas.width / 2, 0); // Posiciona o "lápis" para desenhar
	            context.lineTo(canvas.width / 2, canvas.height); // Faz o "risco" na tela
	            context.strokeStyle = "#000000"; // Cor preta (opcional)
	            context.stroke(); // Aplica o risco na tela
	            context.closePath(); // Finaliza o caminho (opcional)
			}
