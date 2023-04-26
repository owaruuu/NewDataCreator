function ProcessFile(event){
    console.log(event);

    let file = document.getElementById('file').files[0];
    console.log(file);

    file.text()
    .then(result => {console.log(result);})

    // fetch(file)
    // .then(result => result.text())
    // .then(text => { console.log(text);})

}

let file = document.getElementById('file').files[0];
console.log(file);

let button = document.getElementById('button');

button.addEventListener('click', (event) => ProcessFile(event));