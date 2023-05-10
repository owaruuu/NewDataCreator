let button = document.getElementById('button');
button.addEventListener('click', ProcessFile);

let buttonKanji = document.getElementById('button-kanji');
buttonKanji.addEventListener('click', ProcessFileKanji);

function ProcessFile(){
    let idValue = document.getElementById('id').value;
    let nameValue = document.getElementById('name').value;
    let file = document.getElementById('file').files[0];

    file.text()
    .then(text => {ParseFile(idValue, nameValue, text);})
}

function ParseFile(idValue, nameValue, text){
    console.log("Parsing file");
    let obj = {};

    obj["id"] = idValue;
    obj["name"] = nameValue;
    obj["termList"] = [];

    let tempTerm = "";
    let tempExtra = "";
    let tempAnswer = "";
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
                tempTerm = text.substr(start, i - start)
                start = i;
                secondTab = true;
            }else{
            //encontre el segundo tab 
                tempExtra = text.substr(start+1, i - start - 1)
                start = i;
            }          
        }

        //aqui encuentro una nueva linea y guardo lo que llevo
        //dentro del objeto nuevo de termino y luego lo agrego
        //al 'lecture' array
        if (char === '\n') {
            tempAnswer = text.substr(start+1, i - start - 2);//el 2 es necesario para remover '/r/n' del texto
            let tempObj = {
                "id" : id,
                "term" : tempTerm,
                "extra" : tempExtra,
                "answer" : tempAnswer,
            };
            obj["termList"].push(tempObj);
            start = i+1;
            id++;
            secondTab = false;
            tempExtra = "";
        }
        
    }
    
    console.log(obj);
    console.log(JSON.stringify(obj));

    //retornar este objeto
}

function ProcessFileKanji(){
    let idValue = document.getElementById('id-kanji').value;
    let nameValue = document.getElementById('name-kanji').value;
    let file = document.getElementById('file-kanji').files[0];

    file.text()
    .then(text => {ParseFileKanji(idValue, nameValue, text);})
}

function ParseFileKanji(idValue, nameValue, text){
    console.log("Parsing file");
    let obj = {};

    obj["id"] = idValue;
    obj["name"] = nameValue;
    obj["termList"] = [];

    let tempTerm = "";
    let tempAnswer = "";
    let secondTab = false;
    let id = 0;
    let start = 0;

    let checkbox = document.getElementById('checkbox-kanji');

    //por cada letra del texto
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        //busco tabs
        if (char === '\t') {
            //encontre el primer tab, guarde la respuesta
            if(secondTab == false){
                tempAnswer = text.substr(start, i - start)
                start = i;
                secondTab = true;
            }else{
            //encontre el segundo tab, guardo kanji 
                tempTerm = text.substr(start+1, i - start - 1)
                start = i;
            }          
        }

        //aqui encuentro una nueva linea, si tengo algo en tempTerm
        //lo guardo en el 'lecture' array
        if (char === '\n') {
            if(checkbox.checked){
                tempAnswer += " / " + text.substr(start+1, i - start - 2);
            }

            if(tempTerm !== ""){
                let tempObj = {
                    "id" : id,
                    "term" : tempTerm,
                    "extra" : "",
                    "answer" : tempAnswer,
                };

                obj["termList"].push(tempObj);
                id++;
                tempTerm = "";
            }
            // tempAnswer = text.substr(start+1, i - start - 2);//el 2 es necesario para remover '/r/n' del texto

            start = i+1;          
            secondTab = false;
        }   
    }
    
    console.log(obj);
    console.log(JSON.stringify(obj));
}