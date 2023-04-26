let button = document.getElementById('button');
button.addEventListener('click', (event) => ProcessFile(event));

function ProcessFile(event){
    let idValue = document.getElementById('id').value;
    let nameValue = document.getElementById('name').value;
    let file = document.getElementById('file').files[0];

    file.text()
    .then(text => {ParseFile(idValue, nameValue, text);})

    //al recibir el objeto, convertirlo en json y descargarlo.
}

function ParseFile(idValue, nameValue, text){
    console.log("Parsing file");
    let obj = {};

    obj["id"] = idValue;
    obj["name"] = nameValue;
    obj["lecture"] = [];

    let tempJap = "";
    let tempKanji = "";
    let tempEsp = "";
    let secondTab = false;
    let id = 0;
    let start = 0;

    //por cada letra del texto
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        //busco por un tab, necesito buscar 2 tab por linea
        if (char === '\t') {
            //encontre el primer tab
            if(secondTab == false){
                tempJap = text.substr(start, i - start)
                start = i;
                secondTab = true;
            }else{
            //encontre el segundo tab 
                tempKanji = text.substr(start+1, i - start - 1)
                start = i;
            }          
        }

        //aqui encuentro una nueva linea y guardo lo que llevo
        //dentro del objeto nuevo de termino y luego lo agrego
        //al 'lecture' array
        if (char === '\n') {
            tempEsp = text.substr(start+1, i - start - 2);//el 2 es necesario para remover '/r/n' del texto
            let tempObj = {
                "id" : id,
                "jap" : tempJap,
                "kanji" : secondTab ? tempKanji : "",
                "esp" : tempEsp
            };
            obj["lecture"].push(tempObj);
            start = i+1;
            id++;
            secondTab = false;
        }
        
    }
    
    console.log(obj);
    console.log(JSON.stringify(obj));

    //retornar este objeto
}