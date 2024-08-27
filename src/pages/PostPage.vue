<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['postId'])

const post = ref()
const user = ref()
const comments = ref()

async function getPost(postId) {
  post.value = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then((response) => response.json())
}

async function getUser(userId) {
  user.value = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((response) => response.json())
}

async function getComments(postId) {
  comments.value = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((response) => response.json())
}

getPost(props.postId)

watch(
  () => post.value,
  (post) => {
    getUser(post.userId)
    getComments(post.id)
  }
)
</script>

<template>
  <div class="box" v-if="post">
    <h2>post</h2>
    <p>id: {{ post.id }}</p>
    <p>userId: {{ post.userId }}</p>
    <p>title: {{ post.title }}</p>
    <p>body: {{ post.body }}</p>
  </div>
  <div class="box" v-if="user">
    <h2>user</h2>
    <p>id: {{ user.id }}</p>
    <p>name: {{ user.name }}</p>
    <p>username: {{ user.username }}</p>
    <p>phone: {{ user.phone }}</p>
    <p>website: {{ user.website }}</p>
    <p>email: {{ user.email }}</p>
    <p>company: {{ user.company }}</p>
    <p>address: {{ user.address }}</p>
  </div>
  <div class="box" v-if="comments">
    <h2>comments</h2>
    <div class="box" v-for="comment in comments">
      <h3>comment</h3>
      <p>id: {{ comment.id }}</p>
      <p>postId: {{ comment.postId }}</p>
      <p>email: {{ comment.email }}</p>
      <p>name: {{ comment.name }}</p>
      <p>body: {{ comment.body }}</p>
    </div>
  </div>
</template>

<style>
.box {
  margin-bottom: 5px;
  border: 2px solid black;
  padding: 5px;
}

p {
  border: 1px solid palevioletred;
}
</style>
