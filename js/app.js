window.onload = function(){

    // valores posibles de las cartas
    /* 
    1 => A
    11 => J
    12 => Q
    13 => K
    */
    let valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    let pintas = ['spades', 'clubs', 'diams', 'hearts']

    // input para obtener el numero de cartas
    let nro = document.querySelector('#nro')
    // boton que generara las cartas que indique el usuario
    let btnDraw = document.querySelector('#btnDraw')
    // boton que ordenara las cartas segun su valor
    let btnSort = document.querySelector('#btnSort')

    // contenedor para agregar las cartas generadas aleatoriamente
    let contenedor = document.querySelector("#contenedor")

    // contenedor para agregar las cartas a medida que se estan ordenando
    let ordenadas = document.querySelector('#ordenadas')

    // array de cartas generadas aleatoriamente
    let cartas = []

    // Agregamos el evento al boton que generara las cartas
    btnDraw.addEventListener('click', generarCartas)
    // Agregamos el evento al boton que ordenera las cartas
    btnSort.addEventListener('click', () => ordenarCartas(cartas))

    /* 
    Genera la cantidad de cartas indicadas y las agregar en el html
    */
    function generarCartas(){

        if(nro.value < 1 || nro.value > 13) {
            alert('El numero de cartas no esta permitido')
            return;
        }

        console.log("Dibujando las Cartas")
        cartas = []
        contenedor.innerHTML = ""

        // Generar las cartas segun la cantidad indicada
        for(let i = 1; i <= nro.value; i++){
            //console.log(`Generando carta nro ${i}`)
            let rnv = generarRandomNumber(valores) // 0 - 13
            let rnp = generarRandomNumber(pintas) // 0 - 4

            let valor = valores[rnv]
            let pinta = pintas[rnp]
            
            // guardamos los valores de la carta en el array de cartas
            cartas.push({ valor, pinta })

            // generado la carta con el valor y la pinta aleatoria
            let carta = dibujarCarta(valor, pinta)
            
            // agregando la carta en el html en su respectivo contenedor
            contenedor.appendChild(carta)
        }
        console.log(cartas)
    }

    /* 
    Genera la carta recibiendo el valor y la pinta y devuelve el siguiente html
    <div class="card spades">        
        A
    </div>
    */
    function dibujarCarta(valor, pinta){
        let div = document.createElement('div')
        div.classList.add('card', pinta)
        div.innerHTML = invertirValor(valor)
        return div
    }

    /* 
    Ordenara la cantidad de cartas indicadas y las agregara paso a paso en el html
    */
    function ordenarCartas(arr = []){
        ordenadas.innerHTML = ""
        console.log("Ordenando las Cartas")
        let size = arr.length

        for(let i = 0; i < size - 1; i++){
            // minIndex 
            let minIndex = i
            for(let j = i + 1; j < size; j++){
                if(arr[j].valor < arr[minIndex].valor){
                    minIndex = j
                }
            }

            if (minIndex !== i){
                const temp = arr[i]
                arr[i] = arr[minIndex]
                arr[minIndex] = temp
            }
            // creando el contenedor para las cartas paso a paso
            let div = document.createElement('div')
            div.classList.add('contenedor')

            // recorremos el arreglo de cartas para volver a dibujar todas las cartas paso a paso
            arr.forEach(({ valor, pinta }) => {
                // generado la carta con el valor y la pinta aleatoria
                let carta = dibujarCarta(valor, pinta)
                div.appendChild(carta)
            })

            ordenadas.appendChild(div)
        }
    }

    /* 
    Genera un numero aleatorio entre 0 y el tamaño del arreglo segun el arreglo recibido
    */
    function generarRandomNumber(arr = []){
        return Math.floor(Math.random() * arr.length)
    }

    /* 
    Function para convertir el valor de la carta en una letra segun el valor
    */
   function invertirValor(valor){
        switch (valor) {
            case 1: return "A"
            case 11: return "J"
            case 12: return "Q"
            case 13: return "K"
            default: return valor
        }
   }


}