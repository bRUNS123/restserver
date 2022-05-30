
new Vue({
    el: '#app',
    data: {
        title: 'NodeBone',
        full_name: '',
        validation_error: '',
        codeUser: '',
        text_error: false,
        text_success: false,
        main: true,
        registro: false,
        respuesta: false,

    },
    methods: {
        updateMain:function () {
       this.main = !this.main
        },

        updateRespuesta:function () {
            this.respuesta = !this.respuesta
             },
    
        
        updateRegistro:function () {
            this.registro = !this.registro
            console.log(this.registro)
             },
    
        verificar: function(){
            if (Object.keys(this.full_name).length < 6 && this.validation_error != 'CODIGO123') {                  
                setTimeout(() => {
                 this.updateMain()
                 this.updateRespuesta()
                }, 2000);       
                this.validation_error = 'El codigo no es valido';  
                this.text_error= true
                this.text_success = false
               this.updateMain()
               this.updateRespuesta()
                
            

            } else {
                setTimeout(() => {
                    this.updateRespuesta()  
                    this.updateRegistro()                 
                                                              
                   }, 3000);       
                   

                this.validation_error = 'Gracias.'
                this.text_success = true
                this.text_error= false
                this.updateMain()
                this.updateRespuesta()
               
             
           
                
                

            }

        },
           
    },
//     template: `
    

// `,
    
})

       