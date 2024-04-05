<script setup>
import { ref, onMounted } from 'vue'
import { client } from "@gradio/client";

defineProps({
  msg: String,
})

const count = ref(0)

onMounted(async () => {
  const response = await fetch('/.netlify/functions/hello-world').then(response => response.text())
  const pokedex = await fetch('/.netlify/functions/pokedex').then(response => response.json())
  //console.log(response)
  //console.log(pokedex)

  const censorMe = await client("https://duchaba-friendly-text-moderation.hf.space/--replicas/dg2zs/");
  const resultA = await censorMe.predict("/censor_me", [
    "Hello!!", // string  in 'Enter Text:' Textbox component		
		0.005, // number (numeric value between 0.005 and 0.1) in 'Personalize Safer Value: (larger value is less safe)' Slider component
  ]);
  console.log(resultA.data);

  const toxic = await client("https://duchaba-friendly-text-moderation.hf.space/--replicas/dg2zs/");
  const resultB = await toxic.predict("/fetch_toxic_tweets", [  ]);

  console.log(resultB.data);
})

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
