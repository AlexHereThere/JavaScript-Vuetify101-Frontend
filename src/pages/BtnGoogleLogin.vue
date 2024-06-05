<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-lock"
    subtitle="Por favor..."
    width="400"
  >
    <template v-slot:title>
      <span class="font-weight-black">Saludos Amigo, Registrate.</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
        <div ref="googleLoginBtn" class="btn_google"></div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue'
const googleLoginBtn = ref(null);
sessionStorage.removeItem('backend_token');
 onMounted(async () => {
    try{
        await initializeGoogleLogin();
    } catch(err)
    {
        console.error('Error Initializing Google Login',err)
    }
});

async function initializeGoogleLogin(){
    window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: onSuccess,
        context: 'signin',
        auto_select: false,
        referrerPolicy: {
            policy: 'strict-origin-when-cross-origin'
        }
    });
    window.google.accounts.id.renderButton(
        googleLoginBtn.value, {
        text: 'signin_with', // or 'signup_with' | 'continue_with' | 'signin'
        size: 'large', // or 'small' | 'medium'
        width: '366', // max width 400
        theme: 'outline', // or 'filled_black' |  'filled_blue'
        logo_alignment: 'center' // or 'center'
    });
}
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    /* Buffer.from(base64,'base64')
    decodeURIComponent(atob(base64).split('').map(function (c) */
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

 async function onSuccess(googleUser) {
  
    // Enviar el ID token al servidor
    try {
    const res = await fetch('https://localhost:4000/loginBE', { //mandar token de google a backend
     method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: googleUser.credential })
    });
    console.log(parseJwt(googleUser.credential));
    const data = await res.json(); //recibir un backend token de vuelta
    sessionStorage.setItem('backend_token',data.token) //guardarlo
    router.push('/index') //acceder al resto de la aplicacion web
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}

</script>

<style>
.btn_google {
    display: flex;
    justify-content: center;
}
</style>