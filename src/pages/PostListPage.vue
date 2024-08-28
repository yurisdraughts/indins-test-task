<script setup>
import { computed, ref } from 'vue'
import UserNavList from '../components/UserNavList.vue'
import PostList from '../components/PostList.vue'

const props = defineProps({ userId: String })

const users = ref([])
const posts = ref([])
const filtered = computed(() =>
  props.userId
    ? posts.value.filter((post) => post.userId === Number(props.userId))
    : posts.value
)

async function getUsers() {
  users.value = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (response) => response.json()
  )
}

async function getPosts() {
  posts.value = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    (response) => response.json()
  )
}

getUsers()
getPosts()
</script>

<template>
  <h1>Home Page</h1>
  <div class="post-list">
    <aside>
      <h2>Users</h2>
      <UserNavList :users="users" />
    </aside>
    <main>
      <h2>Posts</h2>
      <PostList :posts="filtered" :users="users" :currentUser="userId" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 210px 1fr;
  }
}
</style>
