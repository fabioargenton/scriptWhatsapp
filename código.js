var mensagens = 0
async function enviarScript(texto, loop){
    mensagens = loop
    scriptText = texto.split(/[\n\t]+/).map(linha => linha.trim()).filter(linha => linha)
	main = document.querySelector("#main")
	textarea = main.querySelector(`div[contenteditable="true"]`)

	if(!textarea) throw new Error("Não há uma conversa aberta")

	for(var i = 0; i < loop; i++){
		console.log(i + ': ' + scriptText)

		textarea.textContent = scriptText
		textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));

		(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click()
		
		if(scriptText.indexOf(i) !== scriptText.length - 1) await new Promise(resolve => setTimeout(resolve, 250))
	}

	return scriptText.length
}

//Digite a mensagem desejada e a qtde de vezes que ela será enviada para a vitima 
enviarScript(`Seu texto aqui`,10).then(e => console.log(`Código finalizado, ${mensagens} mensagens enviadas`)).catch(console.error)
