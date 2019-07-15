const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

swal('Hola!')

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.elegircolor = this.elegircolor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtnEmpesar()

    this.nivel = 1
    this.colores ={
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpesar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(num){
    switch (num) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color){
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(){
    for(let i = 0; i < this.nivel; i++){
      let color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color){
    //  para poder cambiar su clase en CSS se le agrega ".classList" y ".add('clase a agrgar')"
    this.colores[color].classList.add('light')
    //  la funcion "setTimeout(funcion a agecutar, el tiempo a llamarla en milisegundos)"
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick(){
    //  lo ace asincronamente
      this.colores.celeste.addEventListener('click',this.elegircolor)
      this.colores.verde.addEventListener('click',this.elegircolor)
      this.colores.violeta.addEventListener('click',this.elegircolor)
      this.colores.naranja.addEventListener('click',this.elegircolor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click',this.elegircolor)
    this.colores.verde.removeEventListener('click',this.elegircolor)
    this.colores.violeta.removeEventListener('click',this.elegircolor)
    this.colores.naranja.removeEventListener('click',this.elegircolor)
  }

  elegircolor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    }else{
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('Simon Dice', 'Genial Ganaste el juego!', 'success')
      .then(this.inicializar())
  }

  perdioElJuego(){
    swal('Simon Dice', 'Lo lamentomas perdiste', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

}

function empezarJuego() {
   window.juego = new Juego()
}
