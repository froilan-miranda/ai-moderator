<template>
  <h1>A.I. Moderator</h1>
  <v-textarea v-model="inputText" label="Enter text here"></v-textarea>
  <v-btn rounded="lg" size="x-large" block @click=onSubmit>Submit</v-btn>
</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  
  const AI_ANALYZER = '/.netlify/functions/post-analyzer'
  const inputText = ref('')
  const prediction = ref('')

  async function onSubmit() {
    if (inputText.value === '') return

    console.log('clicked!', inputText.value)

    const payload = {
      "text": inputText.value
    }

    axios.post(AI_ANALYZER, payload)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

</script>

