// Vue.component('index', {
//     template: `
//     <div>
//     <h2>{{title}}</h2>
//     </div>
//     `
// })

new Vue({
    el: '#app',
    data: {
        title: 'BONENODE',
        activo: true,
        full_name: '',
        validation_error: ''
    },
    methods: {
        update:function () {
            this.activo = false;
                     console.log('probando funcion');
                     console.log(this.activo);
                     
        },
        verificar: function(){
            if (Object.keys(this.full_name).length < 4 ) {
                this.validation_error = 'El codigo no es valido'
                setInterval(this.desactivate, 3000)

            } else {
                this.validation_error = 'Gracias.'

            }

        },
        desactivate: function(){
            this.activo = true;
        }

           
    },
//     template: `
    

// `,
    
})

       