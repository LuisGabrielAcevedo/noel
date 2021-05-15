<template>
  <div class="privacyPolicy">
    <div class="privacyPolicy__close-container">
      <img
        @click="close()"
        class="privacyPolicy__close-image"
        src="@/assets/web/btn_cerrar.png"
      />
    </div>
    <img
      class="privacyPolicy__image"
      src="@/assets/web/Logo_promo_que_nos_une_modales.png"
    />
    <div class="privacyPolicy__content">
      <div class="privacyPolicy__box">
        <div class="privacyPolicy__scroll">
          <div class="privacyPolicy__text">
            <p>El usuario autoriza a Grupo Nutresa S.A., sus filiales, y a los terceros que elija Grupo Nutresa S.A. y/o sus filiales, para el cumplimiento de las actividades autorizadas (Responsables y Encargados) a tratar los datos personales que en desarrollo de la actividad promocional “LA PROMO QUE NOS UNE” (en adelante la “Actividad”) se obtengan, con la finalidad de contactar a los posibles ganadores, hacer entrega del premio y en general, todo lo necesario para el desarrollo de la actividad, además enviar información de las compañías filiales de Grupo Nutresa S.A.</p>
            <p>Los datos personales que los usuarios suministren en desarrollo de la Actividad no podrán ser utilizados para fines distintos de los autorizados por el propio usuario.</p>
            <p>Se le informa al usuario que, como titular de los datos personales, le asisten los siguientes derechos:</p>
            <ol type="a">
              <li>
                <p>Conocer, actualizar y rectificar sus datos personales frente a los Responsables o Encargados;</p>
              </li>
              <li>
                <p>Solicitar prueba de la autorización otorgada a los Responsables o Encargados;</p>
              </li>
               <li>
                <p>Ser informado por los Responsables o Encargados, previa solicitud, respecto del uso que se le ha dado a sus datos personales;</p>
              </li>
              <li>
                <p>Previa queja o consulta ante los Responsables o Encargados, presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a la normatividad legal aplicable;</p>
              </li>
              <li>
                <p>Revocar la autorización y/o solicitar la supresión del dato cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</p>
              </li>
              <li>
                <p>Acceder en forma gratuita a sus datos personales que hayan sido objeto de Tratamiento.</p>
              </li>
            </ol>
            <p>Para consultas, reclamos o ampliar información los consumidores deberán comunicarse con la línea de Compañía de Galletas Noel 018000516635.</p>
            <p style="padding: 0; margin:0;">
              Para mayor información remitirse a 
            </p>
            <a href="https://gruponutresa.com/wp-content/uploads/2021/03/Politica-de-Tratamiento-de-Datos-Personales-Grupo-Nutresa-Sep-2018.pdf">https://gruponutresa.com/wp-content/uploads/2021/03/Politica-de-Tratamiento-de-Datos-Personales-Grupo-Nutresa-Sep-2018.pdf</a>
            <br/>
            <br/>
            <ol type="1">
              <li>
                <p>La página aparece como una página no segura, es importante que se verifique con TI que la página esté dentro del entorno seguro de Grupo Nutresa.</p>
              </li>
              <li>
                <p>En caso de reclamos por falta de funcionamiento de los códigos, que sea comprobable se deben contar con códigos genéricos para atender estas solicitudes.</p>
              </li>
              <li>
                <p>No es muy claro cuando se publican los ganadores, no considero que esto sea realmente necesario, puesto que, si el ganador no puede recibir el premio por alguna razón, puede ser un problema.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {},
  props: {},
  computed: {},
  methods: {
    close() {
      this.$emit('close')
    }
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.privacyPolicy {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__content {
    width: 100%;
    height: 300px;
    position: relative;
  }
  &__box {
    position: absolute;
    top: 20px;
    left: 30px;
    right: 30px;
    bottom: 20px;
    @include mobile () {
      top: 10px;
      left: 15px;
      right: 15px;
      bottom: 10px;
    }
  }
  &__scroll {
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
    height: 100%;
    padding-right: 30px;
    text-align: center;
    @include mobile () {
      padding-right: 15px;
    }
  }
  &__text {
    font-family: BebasNeue;
    font-size: 16px;
    line-height: 16px;
    text-align: justify;
  }
  &__image {
    height: 220px;
    margin-top: -100px;
    margin-bottom: 10px;
    @include mobile() {
      height: 140px;
      margin-top: -80px;
      margin-bottom: -25px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }
  /* width */
  ::-webkit-scrollbar {
    width: 8px !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #FFFFFF !important;
    border-radius: 10px !important;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white !important;
    border: 1px solid black;
  }
}
</style>
