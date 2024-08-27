<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({ userId: String })

const route = useRoute()
const users = ref()
const posts = ref()

async function getUsers() {
  users.value = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (response) => response.json()
  )
}

async function getPosts(userId) {
  if (typeof userId !== 'undefined') {
    posts.value = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    ).then((response) => response.json())
  } else {
    posts.value = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    ).then((response) => response.json())
  }
}

getUsers()

watchEffect(() => {
  getPosts(route.params.userId)
})
</script>

<template>
  <aside>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Все посты</RouterLink>
        </li>
        <li v-for="user in users" :key="user.id">
          <RouterLink :to="'/user/' + user.id">{{ user.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
  <main>
    <article v-for="post in posts" :key="post.id">
      <h2>
        <RouterLink :to="'/post/' + post.id">{{ post.title }}</RouterLink>
      </h2>
      <p>{{ post.body }}</p>
    </article>
  </main>
</template>

<style></style>
