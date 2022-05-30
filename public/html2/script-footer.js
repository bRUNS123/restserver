quoteElement = document.getElementById('quoteElement')
quoteElement.innerHTML = 'Obteniendo datos'
fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => {
        if(quote.quote.length > 0) {
            quoteElement.innerHTML = quote.quote
        } else {
            quoteElement.innerHTML = 'No hay datos'
        }
    })

// const button = document.getElementById('addButton')
// button.addEventListener('click', () => {
//     newDiv = document.createElement('div')
//     newDiv.setAttribute('id', 'parrafo3')
    
//     console.log(newDiv)

//     newSpan = document.createElement('span')
//     newSpan.innerHTML = 'Palabra5'
    
//     newDiv.appendChild(newSpan)
//     document.body.appendChild(newDiv)
// })
