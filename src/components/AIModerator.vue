<template>
  <h1>ChinWag</h1>
  <span class="text-body-2">Powered by A.I. Moderator a Hypnopaedia product</span>
  <p class="my-4 text-subtitle-1">I'd love to know what you think about anything. Feel free to express yourself, but don't be toxic. Nobody enjoys toxicity :(</p>
  <p class="my-4">But if you do, I'm sure there is some other corner of the internet that will welcome you. </p>
  <v-textarea v-model="inputText" label="Enter text here"></v-textarea>
  <v-btn rounded="lg" size="x-large" block @click=onSubmit>Submit</v-btn>
  <div>{{ prediction }}</div>
  <h2 class="mt-4">Previous Post</h2>
  <v-card>
    <v-virtual-scroll
      :height="300"
      :items="acceptedPosts"
    >
      <template v-slot:default="{ item }">
        {{ item }}
      </template>
    </v-virtual-scroll>
  </v-card>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ toxicText }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  
  const AI_ANALYZER = 'https://g0xxitfr9a.execute-api.us-east-1.amazonaws.com/analyze'
  const inputText = ref('')
  const prediction = ref('')
  const acceptedPosts = ref([''])
  const snackbar = ref(false)
  const toxicText = ref('')

  async function onSubmit() {
    if (inputText.value === '') return
    const payload = { "text": inputText.value }
    axios.post(AI_ANALYZER, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      console.log(response);
      processResponse(response.data.data, inputText.value) })
    .catch(function (error) {
      console.log(error);
    });
  }

  function processResponse(res, post) {
    if(res.categories.includes("sober")){
      //post response
      acceptedPosts.value.unshift(post)
    } else {
      // alert toxicity
      toxicText.value = 'Your post was found to contain a(n) ' + res.categories.join(', ').replace('_', ' ') + ' comment(s) :(, and will not be posted...shame'
      snackbar.value = true
    }
    inputText.value = ''
  }

</script>

