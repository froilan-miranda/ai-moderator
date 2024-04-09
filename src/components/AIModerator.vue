<template>
  <h1>A.I. Moderator</h1>
  <v-textarea v-model="inputText" label="Enter text here"></v-textarea>
  <v-btn rounded="lg" size="x-large" block @click=onSubmit>Submit</v-btn>
  <div>{{ prediction }}</div>
</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  
  const AI_ANALYZER = 'https://g0xxitfr9a.execute-api.us-east-1.amazonaws.com/analyze'
  const inputText = ref('')
  const prediction = ref('')

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
      prediction.value = response.data.result
    })
    .catch(function (error) {
      console.log(error);
    });
  }

</script>

