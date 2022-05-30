
new Vue({
    el: '#app',
    data: {
        main: true,
        registro: false,
        respuesta: false,
        textcode: '',
        res: '',
        form: true,


        validation_error: '',
        codeUser: '',
        text_error: false,
        text_success: false,
        
        
       
    },
    methods: {
        verify: function() {
            if (Object.keys(this.textcode).length < 6 && (Object.keys(this.textcode).length != 0)  ) {
                this.res = 'La contraseña es muy corta.',
                this.respuesta = true
                this.form = false
                setTimeout(() => {
                    this.form = true
                    this.respuesta = false                   
                   }, 2000);       
            } else if (Object.keys(this.textcode).length == 0) {
                this.res = 'La contraseña no puede ser vacia.',
                this.respuesta = true
                this.form = false
                setTimeout(() => {
                    this.form = true
                    this.respuesta = false                   
                   }, 2000);       
            
            } else if (this.textcode == 'CODIGO123'){
                    this.res = 'Contraseña correcta.',
                    this.respuesta = true,
                    this.form = false
                    setTimeout(() => {
                       this.respuesta = false     
                       this.registro = true              
                       }, 2000);       
                   

            }
        },

    //     updateMain:function () {
    //    this.main = !this.main
    //     },

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

       