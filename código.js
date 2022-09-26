//Função que digita a mensagem e envia
async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)	
	if(!textarea) throw new Error("Não há uma conversa aberta")	
	for(const line of lines){
        console.log(line)	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));	
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}	
	return lines.length;
}

//Função que chama a função enviarScript dentro de um loop
function spam(message, loop) {
	var delay = 100; // 1 milisegundo	
	for (var i = 0; i < loop; i++){
		window.setTimeout(function(){
			enviarScript(message);
		}, delay*i);
	}
}

//Executa o ataque
spam("mensagem_aqui", 10); //Vai enviar 10 vezes essa msg
